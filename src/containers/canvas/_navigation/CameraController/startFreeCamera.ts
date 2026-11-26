import {
  easeInOut,
  interpolate,
  travelDuration,
} from '@/lib/canvas/cameraTravel';
import { frameAtPoint, type FrameRect } from '@/lib/canvas/cameraTrack';
import {
  boundsOf,
  centerPoint,
  fitBounds,
  frameCamera,
  panBy,
  revealBox,
  scaleAt,
  zoomAt,
  type FreeCamera,
} from '@/lib/canvas/freeCamera';
import { DURATION, MOTION } from '@/lib/motion/tokens';
import { getFrameByPath, type FrameId } from '../../_lib/frames';
import { isInsideOpenModal } from '../../_lib/modal';
import { prefersReducedMotion } from '../../_lib/motion';
import {
  markNavigating,
  registerFrameNavigator,
  type FrameNavigator,
} from '../../_lib/navigateToFrame';
import { getCurrentFrame, setCurrentFrame } from '../../_state/currentFrame';
import {
  registerFreeCameraControls,
  setFreeCameraScale,
} from '../../_state/freeCamera';
import { setFrameEndHint } from '../../_state/frameEndHint';
import { findCameraElements, type CameraHandoff } from './cameraElements';

/** 휠 deltaY 1당 배율 변화 세기 (Ctrl·Cmd+휠, 트랙패드 핀치) */
const WHEEL_ZOOM_SPEED = 0.01;
/** 한 번에 받는 deltaY 상한: 마우스 휠 한 칸(약 100)이 약 22%만 바뀌게 (핀치는 값이 작아 그대로) */
const WHEEL_ZOOM_MAX_DELTA = 25;
/** 점 무늬 간격이 이 배율보다 좁아지면 두 배씩 성기게 한다 */
const DOT_MIN_SCALE = 0.5;
/** deltaMode가 줄 단위일 때 한 줄의 px */
const LINE_HEIGHT = 16;
/** 확대 버튼 한 번의 배율 */
const BUTTON_ZOOM_STEP = 1.25;
/** 방향키 한 번 이동 (화면 px) */
const ARROW_STEP = 80;
/** 전체 보기 여백 (화면 px) */
const FIT_PADDING = 64;
/** 조작이 멈추고 이만큼 지나면 will-change를 풀어 글자를 다시 선명하게 그린다 */
const SETTLE_DELAY = DURATION.fast;

/** WebKit(Safari)의 트랙패드 핀치 이벤트 (표준이 아니라 TS 기본 타입에 없다) */
interface GestureEvent extends UIEvent {
  scale: number;
  clientX: number;
  clientY: number;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  );
}

/**
 * 자유 모드 카메라 (docs/product.md 「자유 모드」). 시작하고, 끝낼 때 보던 위치를 돌려주는 정리 함수를 준다.
 * 문서는 스크롤하지 않고(Canvas.module.css), 입력을 직접 받아 world의 transform으로 카메라를 옮긴다.
 * - 휠·트랙패드 = 이동, Shift+휠 = 좌우, Ctrl·Cmd+휠·핀치 = 마우스 위치 중심 확대·축소
 * - 빈 캔버스 끌기·Space+끌기·가운데 버튼 끌기 = 이동, 방향키 = 이동, Shift+1 = 전체 보기, Shift+0 = 100%
 * - 화면 가운데 프레임이 현재 프레임, 메뉴·뒤로 가기는 그 프레임을 100%로 맞춰 날아간다
 * - Tab 포커스·페이지 내 검색 결과가 보이게 옮긴다
 */
export function startFreeCamera(
  frameIds: readonly FrameId[],
  handoff?: CameraHandoff,
): () => CameraHandoff | undefined {
  const elements = findCameraElements(frameIds);
  if (!elements) return () => undefined;
  const { stage, world, frames, firstFrame } = elements;

  let viewport = { width: 0, height: 0 };
  let rects: FrameRect<FrameId>[] = [];
  let room = { x: 0, y: 0 };
  let insets = { top: 0, bottom: 0 };
  let camera: FreeCamera = { x: 0, y: 0, scale: 1 };
  let currentFrame: FrameId = handoff?.frameId ?? getCurrentFrame();
  let renderRequest = 0;
  let settleTimer = 0;
  let flightRequest = 0;
  let flightTarget: FrameId | undefined;
  let finishFlight: (() => void) | undefined;
  let drag: { pointerId: number; x: number; y: number } | undefined;
  let spaceHeld = false;
  let gestureStart:
    { camera: FreeCamera; point: { x: number; y: number } } | undefined;

  const resetStage = () => {
    stage.scrollLeft = room.x;
    stage.scrollTop = room.y;
  };

  const measure = () => {
    room = { x: world.offsetLeft, y: world.offsetTop };
    resetStage();
    viewport = { width: stage.clientWidth, height: stage.clientHeight };
    rects = frames.map((frame) => ({
      id: frame.id as FrameId,
      x: frame.offsetLeft,
      y: frame.offsetTop,
      width: frame.offsetWidth,
      height: frame.offsetHeight,
    }));
    const style = getComputedStyle(firstFrame);
    insets = {
      top: parseFloat(style.paddingTop) || 0,
      bottom: parseFloat(style.paddingBottom) || 0,
    };
  };

  const rectOf = (frameId: FrameId) =>
    rects.find((rect) => rect.id === frameId);

  /** 화면 좌표 → stage 기준 좌표 (마우스 위치 중심 확대) */
  const toStagePoint = (clientX: number, clientY: number) => {
    const box = stage.getBoundingClientRect();
    return { x: clientX - box.left, y: clientY - box.top };
  };

  // 조작 중에만 will-change를 켜고, 멈추면 풀어 확대된 글자를 다시 선명하게 그린다
  const markMoving = () => {
    world.setAttribute('data-moving', '');
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(
      () => world.removeAttribute('data-moving'),
      SETTLE_DELAY,
    );
  };

  const render = () => {
    renderRequest = 0;
    const { x, y, scale } = camera;
    world.style.transform = `translate3d(${-x * scale}px, ${-y * scale}px, 0) scale(${scale})`;
    // 점 무늬(stage 배경)를 world와 같이 움직인다. world의 원점은 stage 왼쪽 위다
    let dotScale = scale;
    while (dotScale < DOT_MIN_SCALE) dotScale *= 2;
    stage.style.setProperty('--free-dot-scale', String(dotScale));
    stage.style.setProperty('--free-dot-x', `${-x * scale}px`);
    stage.style.setProperty('--free-dot-y', `${-y * scale}px`);
    setFreeCameraScale(scale);
    const frameId =
      flightTarget ?? frameAtPoint(rects, centerPoint(camera, viewport));
    if (frameId && frameId !== currentFrame) {
      currentFrame = frameId;
      setCurrentFrame(frameId);
    }
  };

  const update = (next: FreeCamera) => {
    camera = next;
    markMoving();
    if (!renderRequest) renderRequest = requestAnimationFrame(render);
  };

  const endFlight = () => {
    cancelAnimationFrame(flightRequest);
    flightRequest = 0;
    flightTarget = undefined;
    const finish = finishFlight;
    finishFlight = undefined;
    finish?.();
  };

  /** 다른 카메라 위치로 부드럽게 옮긴다 (움직임 줄이기면 바로) */
  const flyTo = (target: FreeCamera, frameId?: FrameId) => {
    endFlight();
    if (prefersReducedMotion()) {
      update(target);
      return;
    }
    const start = camera;
    const startCenter = centerPoint(start, viewport);
    const endCenter = centerPoint(target, viewport);
    const duration = travelDuration(
      Math.hypot(endCenter.x - startCenter.x, endCenter.y - startCenter.y) *
        Math.min(start.scale, target.scale),
      viewport.height,
      { min: MOTION.camera.minDuration, max: MOTION.camera.maxDuration },
    );
    if (frameId) {
      flightTarget = frameId;
      finishFlight = markNavigating(frameId, 'manual');
    }
    const startedAt = performance.now();
    const step = (now: number) => {
      const progress = easeInOut(Math.min((now - startedAt) / duration, 1));
      update({
        x: interpolate(start.x, target.x, progress),
        y: interpolate(start.y, target.y, progress),
        scale: interpolate(start.scale, target.scale, progress),
      });
      if (progress < 1) {
        flightRequest = requestAnimationFrame(step);
        return;
      }
      flightRequest = 0;
      endFlight();
    };
    flightRequest = requestAnimationFrame(step);
  };

  const viewportCenter = () => ({
    x: viewport.width / 2,
    y: viewport.height / 2,
  });

  const fitAll = () => {
    const bounds = boundsOf(rects);
    if (bounds) flyTo(fitBounds(bounds, viewport, FIT_PADDING));
  };
  const resetZoom = () => flyTo(scaleAt(camera, 1, viewportCenter()));
  const zoomIn = () =>
    flyTo(zoomAt(camera, BUTTON_ZOOM_STEP, viewportCenter()));
  const zoomOut = () =>
    flyTo(zoomAt(camera, 1 / BUTTON_ZOOM_STEP, viewportCenter()));

  // 메뉴·뒤로 가기: 그 프레임을 100%로 맞춰 날아간다
  const jumpToFrame: FrameNavigator['jumpToFrame'] = (frameId) => {
    const rect = rectOf(frameId);
    if (!rect) return;
    setCurrentFrame(frameId);
    currentFrame = frameId;
    flyTo(frameCamera(rect, viewport), frameId);
  };

  // 열린 모달(케이스 스터디) 안 입력은 모달이 받는다 (휠은 모달 본문 스크롤)
  const handleWheel = (event: WheelEvent) => {
    if (isInsideOpenModal(event.target)) return;
    event.preventDefault();
    endFlight();
    const unit = event.deltaMode === 1 ? LINE_HEIGHT : 1;
    const deltaX = event.deltaX * unit;
    const deltaY = event.deltaY * unit;
    if (event.ctrlKey || event.metaKey) {
      // Ctrl·Cmd+휠, 그리고 Chrome·Firefox의 트랙패드 핀치(ctrlKey가 붙어 온다)
      update(
        zoomAt(
          camera,
          Math.exp(
            -Math.min(
              Math.max(deltaY, -WHEEL_ZOOM_MAX_DELTA),
              WHEEL_ZOOM_MAX_DELTA,
            ) * WHEEL_ZOOM_SPEED,
          ),
          toStagePoint(event.clientX, event.clientY),
        ),
      );
      return;
    }
    // Shift+휠: 세로 휠을 좌우로 (브라우저가 이미 deltaX로 바꿔 주면 그대로)
    if (event.shiftKey && deltaX === 0) {
      update(panBy(camera, deltaY, 0));
      return;
    }
    update(panBy(camera, deltaX, deltaY));
  };

  // Safari 트랙패드 핀치
  const handleGestureStart = (event: Event) => {
    if (isInsideOpenModal(event.target)) return;
    const gesture = event as GestureEvent;
    event.preventDefault();
    endFlight();
    gestureStart = {
      camera,
      point: toStagePoint(gesture.clientX, gesture.clientY),
    };
  };
  const handleGestureChange = (event: Event) => {
    const gesture = event as GestureEvent;
    event.preventDefault();
    if (!gestureStart) return;
    update(
      scaleAt(
        camera,
        gestureStart.camera.scale * gesture.scale,
        gestureStart.point,
      ),
    );
  };
  const handleGestureEnd = (event: Event) => {
    event.preventDefault();
    gestureStart = undefined;
  };

  // 끌기: 빈 캔버스(프레임 밖), Space를 누른 채, 또는 가운데 버튼. 프레임 안 일반 클릭·글자 선택은 그대로
  const handlePointerDown = (event: PointerEvent) => {
    const target = event.target;
    const onFrame =
      target instanceof Node && frames.some((frame) => frame.contains(target));
    const canDrag =
      event.button === 1 || (event.button === 0 && (spaceHeld || !onFrame));
    if (!canDrag) return;
    event.preventDefault();
    endFlight();
    drag = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
    stage.setAttribute('data-dragging', '');
  };
  const handlePointerMove = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    drag = { ...drag, x: event.clientX, y: event.clientY };
    update(panBy(camera, -dx, -dy));
  };
  const handlePointerUp = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    drag = undefined;
    stage.removeAttribute('data-dragging');
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      isInsideOpenModal(event.target) ||
      isTypingTarget(event.target) ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }
    if (event.key === ' ') {
      // Space+끌기 준비. 버튼·링크에 포커스가 있으면 원래 동작(누르기)을 둔다
      if (
        event.target instanceof HTMLButtonElement ||
        event.target instanceof HTMLAnchorElement
      ) {
        return;
      }
      event.preventDefault();
      spaceHeld = true;
      stage.setAttribute('data-space', '');
      return;
    }
    if (event.shiftKey && event.code === 'Digit1') {
      event.preventDefault();
      fitAll();
      return;
    }
    if (event.shiftKey && event.code === 'Digit0') {
      event.preventDefault();
      resetZoom();
      return;
    }
    const arrow: Record<string, [number, number]> = {
      ArrowUp: [0, -ARROW_STEP],
      ArrowDown: [0, ARROW_STEP],
      ArrowLeft: [-ARROW_STEP, 0],
      ArrowRight: [ARROW_STEP, 0],
    };
    const move = arrow[event.key];
    if (move) {
      event.preventDefault();
      endFlight();
      update(panBy(camera, move[0], move[1]));
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== ' ') return;
    spaceHeld = false;
    stage.removeAttribute('data-space');
  };

  // Tab 등으로 포커스가 가면 그 요소가 보이게 옮긴다
  const handleFocusIn = (event: FocusEvent) => {
    const target = event.target;
    if (flightRequest || !(target instanceof HTMLElement)) return;
    if (!frames.some((frame) => frame.contains(target))) return;
    requestAnimationFrame(() => {
      // world 안 좌표는 world 상자 기준으로 잰다 (브라우저가 stage를 스크롤했어도 둘이 같이 움직여 어긋나지 않는다)
      const worldBox = world.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      const scale = worldBox.width / world.offsetWidth || camera.scale;
      const next = revealBox(
        camera,
        {
          x: (box.left - worldBox.left) / scale,
          y: (box.top - worldBox.top) / scale,
          width: box.width / scale,
          height: box.height / scale,
        },
        viewport,
        insets,
      );
      if (next.x !== camera.x || next.y !== camera.y) update(next);
    });
  };

  // 페이지 내 검색 등으로 브라우저가 stage를 스크롤하면 그만큼 카메라를 옮기고 stage는 되돌린다
  const handleStageScroll = () => {
    const dx = stage.scrollLeft - room.x;
    const dy = stage.scrollTop - room.y;
    if (dx === 0 && dy === 0) return;
    resetStage();
    update(panBy(camera, dx, dy));
  };

  const handleResize = () => {
    const center = centerPoint(camera, viewport);
    measure();
    // 화면 크기가 바뀌어도 가운데 보던 곳을 그대로 둔다
    update({
      ...camera,
      x: center.x - viewport.width / 2 / camera.scale,
      y: center.y - viewport.height / 2 / camera.scale,
    });
  };

  measure();
  const startRect = rectOf(
    handoff?.frameId ??
      getFrameByPath(window.location.pathname)?.id ??
      currentFrame,
  );
  camera = handoff
    ? { x: handoff.x, y: handoff.y, scale: handoff.scale }
    : startRect
      ? frameCamera(startRect, viewport)
      : camera;
  setFrameEndHint(undefined);
  render();
  document.documentElement.style.removeProperty('--camera-initial-x');
  document.documentElement.style.removeProperty('--camera-initial-y');

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(stage);
  const unregisterNavigator = registerFrameNavigator({ jumpToFrame });
  const unregisterControls = registerFreeCameraControls({
    zoomIn,
    zoomOut,
    resetZoom,
    fitAll,
  });
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  window.addEventListener('gesturestart', handleGestureStart);
  window.addEventListener('gesturechange', handleGestureChange);
  window.addEventListener('gestureend', handleGestureEnd);
  stage.addEventListener('pointerdown', handlePointerDown);
  stage.addEventListener('pointermove', handlePointerMove);
  stage.addEventListener('pointerup', handlePointerUp);
  stage.addEventListener('pointercancel', handlePointerUp);
  world.addEventListener('focusin', handleFocusIn);
  stage.addEventListener('scroll', handleStageScroll);

  return () => {
    endFlight();
    cancelAnimationFrame(renderRequest);
    window.clearTimeout(settleTimer);
    resizeObserver.disconnect();
    unregisterNavigator();
    unregisterControls();
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('gesturestart', handleGestureStart);
    window.removeEventListener('gesturechange', handleGestureChange);
    window.removeEventListener('gestureend', handleGestureEnd);
    stage.removeEventListener('pointerdown', handlePointerDown);
    stage.removeEventListener('pointermove', handlePointerMove);
    stage.removeEventListener('pointerup', handlePointerUp);
    stage.removeEventListener('pointercancel', handlePointerUp);
    world.removeEventListener('focusin', handleFocusIn);
    stage.removeEventListener('scroll', handleStageScroll);
    world.removeAttribute('data-moving');
    stage.removeAttribute('data-dragging');
    stage.removeAttribute('data-space');
    world.style.removeProperty('transform');
    for (const name of ['--free-dot-scale', '--free-dot-x', '--free-dot-y']) {
      stage.style.removeProperty(name);
    }
    return {
      x: camera.x,
      y: camera.y,
      scale: camera.scale,
      frameId: currentFrame,
    };
  };
}
