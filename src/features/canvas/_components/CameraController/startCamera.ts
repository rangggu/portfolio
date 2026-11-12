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
import { DURATION } from '@/lib/motion/tokens';
import { getFrameByPath, type FrameId } from '../../_lib/frames';
import {
  navigateToFrame,
  registerCameraNavigator,
} from '../../_lib/navigateToFrame';
import { getCurrentFrame, setCurrentFrame } from '../../_state/currentFrame';
import { setFrameEndHint } from '../../_state/frameEndHint';

/** 프레임 끝에서 멈추는 스크롤 길이 = 화면 높이 × 이 비율 (시안 값 없음, 휠 두세 번) */
const HOLD_RATIO = 0.3;

/** 옆 프레임을 눌렀을 때 뒤따르는 click을 막는 시간 상한 */
const CLICK_SUPPRESS_TIMEOUT = 600;

/** 프레임 이동 페이드 시간 (Canvas.module.css의 --duration-fast와 같다) */
const FADE_DURATION = DURATION.fast;

interface CameraElements {
  root: HTMLElement;
  stage: HTMLElement;
  world: HTMLElement;
  frames: HTMLElement[];
  firstFrame: HTMLElement;
}

function findElements(frameIds: readonly FrameId[]): CameraElements | null {
  const root = document.querySelector<HTMLElement>('[data-camera-root]');
  const stage = document.querySelector<HTMLElement>('[data-camera-stage]');
  const world = document.querySelector<HTMLElement>('[data-camera-world]');
  const frames = frameIds.flatMap((id) => {
    const element = document.getElementById(id);
    return element ? [element] : [];
  });
  const firstFrame = frames[0];
  if (!root || !stage || !world || !firstFrame) return null;
  return { root, stage, world, frames, firstFrame };
}

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
export function startCamera(frameIds: readonly FrameId[]): () => void {
  const elements = findElements(frameIds);
  if (!elements) return () => {};
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
  let fadeTimer = 0;
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
    setCurrentFrame(next.frameId);
    setFrameEndHint(
      next.phase === 'hold' &&
        next.progress > 0 &&
        next.nextFrameId &&
        next.nextDirection
        ? { nextFrameId: next.nextFrameId, direction: next.nextDirection }
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

  const jumpToFrame = (frameId: FrameId, { fade }: { fade: boolean }) => {
    window.clearTimeout(fadeTimer);
    const target = scrollForFrame(track, frameId);
    if (!fade) {
      world.removeAttribute('data-fading');
      jump(target);
      return;
    }
    world.setAttribute('data-fading', '');
    fadeTimer = window.setTimeout(() => {
      jump(target);
      world.removeAttribute('data-fading');
    }, FADE_DURATION);
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
  const initialFrame =
    getFrameByPath(window.location.pathname)?.id ?? getCurrentFrame();
  jump(scrollForFrame(track, initialFrame));
  document.documentElement.style.removeProperty('--camera-initial-x');
  document.documentElement.style.removeProperty('--camera-initial-y');

  const resizeObserver = new ResizeObserver(() => rebuild());
  resizeObserver.observe(stage);
  frames.forEach((frame) => resizeObserver.observe(frame));

  const unregister = registerCameraNavigator({ jumpToFrame });
  window.addEventListener('scroll', handleScroll, { passive: true });
  stage.addEventListener('scroll', handleStageScroll);
  world.addEventListener('focusin', handleFocusIn);
  world.addEventListener('pointerdown', handlePointerDown, { capture: true });
  world.addEventListener('click', handleClick, { capture: true });

  return () => {
    cancelAnimationFrame(frameRequest);
    cancelAnimationFrame(focusRequest);
    window.clearTimeout(fadeTimer);
    resizeObserver.disconnect();
    unregister();
    window.removeEventListener('scroll', handleScroll);
    stage.removeEventListener('scroll', handleStageScroll);
    world.removeEventListener('focusin', handleFocusIn);
    world.removeEventListener('pointerdown', handlePointerDown, {
      capture: true,
    });
    world.removeEventListener('click', handleClick, { capture: true });
    world.style.removeProperty('transform');
    stage.scrollLeft = 0;
    stage.scrollTop = 0;
    world.removeAttribute('data-fading');
    root.style.removeProperty('--camera-track');
    setFrameEndHint(undefined);
  };
}
