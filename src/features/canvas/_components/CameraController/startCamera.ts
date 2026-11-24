import {
  buildCameraTrack,
  cameraAnchorAt,
  cameraAt,
  frameAtPoint,
  scrollForAnchor,
  scrollForFrame,
  scrollToReveal,
  type CameraState,
  type CameraTrack,
  type CameraViewport,
  type FrameRect,
} from '@/lib/canvas/cameraTrack';
import {
  easeInOut,
  interpolate,
  travelDuration,
} from '@/lib/canvas/cameraTravel';
import { DURATION, MOTION } from '@/lib/motion/tokens';
import { getFrameByPath, type FrameId } from '../../_lib/frames';
import { prefersReducedMotion } from '../../_lib/motion';
import { showModeHint } from '../../_state/modeHint';
import { findCameraElements, type CameraHandoff } from './cameraElements';
import {
  markNavigating,
  navigateToFrame,
  registerFrameNavigator,
  type FrameNavigator,
} from '../../_lib/navigateToFrame';
import { getCurrentFrame, setCurrentFrame } from '../../_state/currentFrame';
import { setFrameEndHint } from '../../_state/frameEndHint';

/** 먼 이동의 페이드 시간 (Canvas.module.css의 --duration-fast와 같다) */
const FADE_DURATION = DURATION.fast;

/** 미끄러지는 동안 <html>에 붙는 속성. 선택 표시를 숨겼다가 도착하면 다시 보인다 (FrameSelection.module.css) */
const TRAVELING_ATTRIBUTE = 'data-camera-traveling';

/** 프레임 끝에서 멈추는 스크롤 길이 = 화면 높이 × 이 비율 (시안 값 없음, 휠 두세 번) */
const HOLD_RATIO = 0.3;

/** 옆 프레임을 눌렀을 때 뒤따르는 click을 막는 시간 상한 */
const CLICK_SUPPRESS_TIMEOUT = 600;

function isPlainPrimaryPointer(event: PointerEvent | MouseEvent) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

/**
 * 카메라 모드를 시작하고, 끝낼 때 부를 정리 함수를 돌려준다.
 * - 측정: 프레임의 world 기준 위치(offset*)로 경로를 만들고 문서 높이를 정한다. 크기가 바뀌면 같은 자리를 유지하며 다시 만든다
 * - 스크롤: 스크롤 위치 → 카메라 좌표(transform) · 현재 프레임 · 프레임 끝 안내
 * - 포커스·페이지 내 검색: 브라우저가 stage를 스크롤해 보이려던 곳을 실제 스크롤 위치로 바꾼다
 * - 옆 프레임: 현재 프레임이 아닌 프레임을 누르면 그 프레임으로 이동한다
 */
export function startCamera(
  frameIds: readonly FrameId[],
  handoff?: CameraHandoff,
): () => CameraHandoff | undefined {
  const elements = findCameraElements(frameIds);
  if (!elements) return () => undefined;
  const { root, stage, world, frames, firstFrame } = elements;

  let viewport: CameraViewport = { width: 0, height: 0 };
  let rects: FrameRect<FrameId>[] = [];
  let track: CameraTrack<FrameId> = buildCameraTrack([], viewport, {
    holdLength: 0,
  });
  let insets = { insetTop: 0, insetBottom: 0 };
  /** stage의 기준 스크롤 위치 = world를 띄워 둔 여유 (Canvas.module.css --camera-room) */
  let room = { x: 0, y: 0 };
  let camera: CameraState<FrameId> | undefined;
  let frameRequest = 0;
  /** 옆 프레임·메뉴·뒤로 가기로 미끄러지는 이동 */
  let travelRequest = 0;
  let travelStartedAt = 0;
  /** 미끄러지는 동안 현재 프레임으로 보일 목적지 (지나가는 프레임마다 선택 표시·메뉴가 바뀌어 깜빡이지 않게) */
  let travelTarget: FrameId | undefined;
  /** 미끄러지는 이동의 도착 스크롤 위치 */
  let travelScroll = 0;
  let fadeTimer = 0;
  let finishTravel: (() => void) | undefined;
  let focusRequest = 0;
  let suppressClickUntil = 0;

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
    track = buildCameraTrack(rects, viewport, {
      holdLength: Math.round(viewport.height * HOLD_RATIO),
    });

    // 프레임 위아래 패딩 = 플로팅 영역 + 간격. 이 안쪽만 가려지지 않은 곳으로 본다
    const style = getComputedStyle(firstFrame);
    insets = {
      insetTop: parseFloat(style.paddingTop) || 0,
      insetBottom: parseFloat(style.paddingBottom) || 0,
    };
    root.style.setProperty('--camera-track', `${track.length}px`);
  };

  const apply = (scrollY: number) => {
    const next = cameraAt(track, scrollY);
    if (!next) return;
    camera = next;
    world.style.transform = `translate3d(${-next.x}px, ${-next.y}px, 0)`;
    setCurrentFrame(travelTarget ?? next.frameId);
    // 미끄러지는 동안은 지나가는 프레임의 끝 안내를 띄우지 않는다
    setFrameEndHint(
      !travelRequest &&
        next.phase === 'hold' &&
        next.progress > 0 &&
        next.nextFrameId &&
        next.nextDirection
        ? {
            nextFrameId: next.nextFrameId,
            direction: next.nextDirection,
            gesture: 'scroll',
          }
        : undefined,
    );
  };

  const jump = (scrollY: number) => {
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    apply(scrollY);
  };

  const handleScroll = () => {
    if (frameRequest) return;
    frameRequest = requestAnimationFrame(() => {
      frameRequest = 0;
      apply(window.scrollY);
    });
  };

  const rebuild = () => {
    const anchor = cameraAnchorAt(track, window.scrollY);
    measure();
    jump(anchor ? scrollForAnchor(track, anchor) : window.scrollY);
  };

  const endTravel = () => {
    cancelAnimationFrame(travelRequest);
    window.clearTimeout(fadeTimer);
    world.removeAttribute('data-fading');
    document.documentElement.removeAttribute(TRAVELING_ATTRIBUTE);
    travelRequest = 0;
    travelTarget = undefined;
    const finish = finishTravel;
    finishTravel = undefined;
    finish?.();
  };

  /**
   * 옆 프레임·메뉴·뒤로 가기.
   * - 순서상 바로 앞뒤 프레임이면 스크롤 경로를 따라 미끄러진다 (스크롤 위치를 조금씩 옮기면 카메라가 따라온다).
   *   메뉴·주소는 시작할 때 목적지로 옮기고, 선택 표시는 이동 중 숨겼다가 도착하면 나타난다 (가장자리에서 번쩍이지 않게)
   * - 그보다 멀면 짧게 페이드한 뒤 바로 옮긴다
   * - 움직임 줄이기면 연출 없이 바로 옮긴다
   */
  const jumpToFrame: FrameNavigator['jumpToFrame'] = (frameId) => {
    // 미끄러지는 중에 또 이동하면 앞 이동을 먼저 끝까지 보낸다 (스크롤은 아직 출발 위치라)
    if (travelRequest) jump(travelScroll);
    endTravel();
    const from = window.scrollY;
    const target = scrollForFrame(track, frameId);
    const fromIndex = frameIds.indexOf(camera?.frameId ?? frameId);
    const isNeighbor = Math.abs(frameIds.indexOf(frameId) - fromIndex) <= 1;
    if (prefersReducedMotion() || Math.abs(target - from) < 1) {
      jump(target);
      return;
    }
    if (!isNeighbor) {
      world.setAttribute('data-fading', '');
      fadeTimer = window.setTimeout(() => {
        world.removeAttribute('data-fading');
        jump(target);
      }, FADE_DURATION);
      return;
    }

    // 스크롤 경로(프레임 끝 멈춤·긴 프레임 따라 내려가기)를 거치지 않고 카메라를 목적지로 곧장 옮긴다.
    // 클릭하자마자 움직이기 시작하고, 도착하면 스크롤 위치를 목적지에 맞춘다 (카메라 좌표가 같아 튀지 않는다)
    const start = camera ?? cameraAt(track, from);
    const end = cameraAt(track, target);
    if (!start || !end) {
      jump(target);
      return;
    }
    document.documentElement.setAttribute(TRAVELING_ATTRIBUTE, '');
    travelTarget = frameId;
    setCurrentFrame(frameId);
    setFrameEndHint(undefined);
    const duration = travelDuration(
      Math.hypot(end.x - start.x, end.y - start.y),
      viewport.height,
      { min: MOTION.camera.minDuration, max: MOTION.camera.maxDuration },
    );
    finishTravel = markNavigating(frameId, 'manual');
    travelScroll = target;
    travelStartedAt = performance.now();
    const step = (now: number) => {
      const progress = easeInOut(
        Math.min((now - travelStartedAt) / duration, 1),
      );
      const x = interpolate(start.x, end.x, progress);
      const y = interpolate(start.y, end.y, progress);
      world.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
      if (progress < 1) {
        travelRequest = requestAnimationFrame(step);
        return;
      }
      travelRequest = 0;
      jump(target);
      endTravel();
    };
    travelRequest = requestAnimationFrame(step);
  };

  // 이동을 시작한 입력(메뉴 클릭 등)은 시작 시각보다 앞선 이벤트라 걸러진다
  // 읽기 모드에서 확대(Ctrl·Cmd+휠·핀치)·좌우 이동(Shift+휠)·전체 보기(Shift+1·0)를 하려 하면
  // 모드 버튼 옆 말풍선으로 자유 모드를 권한다. 화면 확대는 막는다 (자유 모드에서 캔버스로 확대)
  const suggestFreeMode = showModeHint;
  const handleModeHintWheel = (event: WheelEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      suggestFreeMode();
    } else if (event.shiftKey) {
      suggestFreeMode();
    }
  };
  const handleModeHintKey = (event: KeyboardEvent) => {
    if (!event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }
    if (event.code !== 'Digit1' && event.code !== 'Digit0') return;
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
    ) {
      return;
    }
    suggestFreeMode();
  };
  // Safari 트랙패드 핀치 (표준이 아닌 gesture 이벤트)
  const handleModeHintGesture = (event: Event) => {
    event.preventDefault();
    suggestFreeMode();
  };

  /** 미끄러지는 동안 막는 스크롤 키 */
  const SCROLL_KEYS = new Set([
    ' ',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'PageUp',
    'PageDown',
    'Home',
    'End',
  ]);

  // 미끄러지는 동안(0.4~0.6초)은 휠·스크롤 키를 무시한다. 도착한 뒤부터 다시 스크롤된다
  const blockWhileTraveling = (event: Event) => {
    if (!travelRequest) return;
    if (event instanceof KeyboardEvent && !SCROLL_KEYS.has(event.key)) return;
    event.preventDefault();
  };

  // 페이지 내 검색 등으로 브라우저가 stage를 스크롤하면, 보이려던 곳을 실제 스크롤 위치로 옮기고 stage는 되돌린다.
  // 검색 결과는 화면 가운데로 오므로(Chromium) 새로 보이려던 화면의 가운데가 속한 프레임으로 간다
  const handleStageScroll = () => {
    const dx = stage.scrollLeft - room.x;
    const dy = stage.scrollTop - room.y;
    if (dx === 0 && dy === 0) return;
    resetStage();
    if (focusRequest || !camera) return;

    const viewTop = camera.y + dy;
    const frameId = frameAtPoint(rects, {
      x: camera.x + dx + viewport.width / 2,
      y: viewTop + viewport.height / 2,
    });
    const rect = rects.find((item) => item.id === frameId);
    if (!frameId || !rect) return;

    const followLength = track.followLengths[frameId] ?? 0;
    const offset = Math.min(Math.max(viewTop - rect.y, 0), followLength);
    jump(scrollForFrame(track, frameId) + offset);
  };

  // Tab 등으로 다른 프레임의 요소에 포커스가 가면 그 요소가 보이게 카메라를 옮긴다
  const handleFocusIn = (event: FocusEvent) => {
    // 메뉴 이동은 도착 프레임 제목으로 포커스를 옮긴다. 미끄러지는 중이면 도착이 그 제목을 보여 주므로 끼어들지 않는다
    if (travelRequest) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const frame = frames.find((item) => item.contains(target));
    if (!frame) return;

    cancelAnimationFrame(focusRequest);
    focusRequest = requestAnimationFrame(() => {
      focusRequest = 0;
      resetStage();
      const frameBox = frame.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      const next = scrollToReveal(
        track,
        frame.id as FrameId,
        { top: box.top - frameBox.top, bottom: box.bottom - frameBox.top },
        viewport.height,
        window.scrollY,
        insets,
      );
      if (next !== window.scrollY || camera?.frameId !== frame.id) jump(next);
    });
  };

  // 옆 프레임 누르기: 포커스·글자 선택이 먼저 일어나지 않게 pointerdown에서 처리하고, 뒤따르는 click(링크 이동 등)은 막는다
  const handlePointerDown = (event: PointerEvent) => {
    if (!isPlainPrimaryPointer(event) || event.pointerType === 'touch') return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    const frame = frames.find((item) => item.contains(target));
    if (!frame || frame.id === getCurrentFrame()) return;

    event.preventDefault();
    suppressClickUntil = performance.now() + CLICK_SUPPRESS_TIMEOUT;
    // 마우스로 옮긴 것이라 포커스는 그대로 둔다
    navigateToFrame(frame.id as FrameId, { focus: false });
  };

  const handleClick = (event: MouseEvent) => {
    if (performance.now() > suppressClickUntil) return;
    suppressClickUntil = 0;
    event.preventDefault();
    event.stopPropagation();
  };

  measure();
  // 자유 모드에서 넘어오면 그때 보던 프레임의 처음부터, 아니면 주소의 프레임
  const initialFrame =
    handoff?.frameId ??
    getFrameByPath(window.location.pathname)?.id ??
    getCurrentFrame();
  jump(scrollForFrame(track, initialFrame));
  document.documentElement.style.removeProperty('--camera-initial-x');
  document.documentElement.style.removeProperty('--camera-initial-y');

  const resizeObserver = new ResizeObserver(() => rebuild());
  resizeObserver.observe(stage);
  frames.forEach((frame) => resizeObserver.observe(frame));

  const unregister = registerFrameNavigator({ jumpToFrame });
  window.addEventListener('scroll', handleScroll, { passive: true });
  for (const type of ['wheel', 'keydown', 'touchmove']) {
    window.addEventListener(type, blockWhileTraveling, { passive: false });
  }
  window.addEventListener('wheel', handleModeHintWheel, { passive: false });
  window.addEventListener('keydown', handleModeHintKey);
  window.addEventListener('gesturestart', handleModeHintGesture);
  stage.addEventListener('scroll', handleStageScroll);
  world.addEventListener('focusin', handleFocusIn);
  world.addEventListener('pointerdown', handlePointerDown, { capture: true });
  world.addEventListener('click', handleClick, { capture: true });

  return () => {
    cancelAnimationFrame(frameRequest);
    cancelAnimationFrame(focusRequest);
    endTravel();
    resizeObserver.disconnect();
    unregister();
    window.removeEventListener('scroll', handleScroll);
    for (const type of ['wheel', 'keydown', 'touchmove']) {
      window.removeEventListener(type, blockWhileTraveling);
    }
    window.removeEventListener('wheel', handleModeHintWheel);
    window.removeEventListener('keydown', handleModeHintKey);
    window.removeEventListener('gesturestart', handleModeHintGesture);
    stage.removeEventListener('scroll', handleStageScroll);
    world.removeEventListener('focusin', handleFocusIn);
    world.removeEventListener('pointerdown', handlePointerDown, {
      capture: true,
    });
    world.removeEventListener('click', handleClick, { capture: true });
    world.style.removeProperty('transform');
    stage.scrollLeft = 0;
    stage.scrollTop = 0;
    root.style.removeProperty('--camera-track');
    setFrameEndHint(undefined);
    return camera
      ? { x: camera.x, y: camera.y, scale: 1, frameId: camera.frameId }
      : undefined;
  };
}
