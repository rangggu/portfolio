import { frameAtPoint, type FrameRect } from '@/lib/canvas/cameraTrack';
import {
  isScrolledToEnd,
  nextFrameDirection,
  scrollRatio,
  scrollTopForRatio,
} from '@/lib/canvas/swipe';
import { DURATION } from '@/lib/motion/tokens';
import { getFrameByPath, type FrameId } from '../../_lib/frames';
import { prefersReducedMotion } from '../../_lib/motion';
import {
  markNavigating,
  navigateToFrame,
  registerFrameNavigator,
  type FrameNavigator,
} from '../../_lib/navigateToFrame';
import { getCurrentFrame, setCurrentFrame } from '../../_state/currentFrame';
import { setFrameEndHint } from '../../_state/frameEndHint';

/** 프레임 이동 페이드 시간 (Canvas.module.css의 --duration-fast와 같다) */
const FADE_DURATION = DURATION.fast;

/** 화면 가운데와 프레임 가운데가 이만큼 어긋나도 맞춰진 것으로 본다 (소수점 스크롤 위치 대비) */
const ALIGN_TOLERANCE = 2;

interface SwipeElements {
  stage: HTMLElement;
  world: HTMLElement;
  frames: HTMLElement[];
}

function findElements(frameIds: readonly FrameId[]): SwipeElements | null {
  const stage = document.querySelector<HTMLElement>('[data-camera-stage]');
  const world = document.querySelector<HTMLElement>('[data-camera-world]');
  const frames = frameIds.flatMap((id) => {
    const element = document.getElementById(id);
    return element ? [element] : [];
  });
  if (!stage || !world || frames.length === 0) return null;
  return { stage, world, frames };
}

/**
 * 스와이프 모드를 시작하고, 끝낼 때 부를 정리 함수를 돌려준다.
 * 넘기기·멈추기는 브라우저 스크롤 스냅(Canvas.module.css)이 하고, 여기서는 그 결과를 읽어 맞춘다.
 * - 현재 프레임: stage 스크롤 → 화면 가운데가 든 프레임
 * - 빈 캔버스 보정: 스크롤이 멈췄는데 화면 가운데가 프레임 밖이면 가장 가까운 프레임으로 옮긴다
 * - 프레임 끝 안내: 현재 프레임 안을 끝까지 내리면 다음 프레임을 안내한다
 * - 크기 변경(접힘·펼침·회전): 현재 프레임과 프레임 안 위치를 유지한다
 * - 옆 프레임: 현재 프레임이 아닌 프레임을 누르면 그 프레임으로 넘긴다
 */
export function startSwipe(frameIds: readonly FrameId[]): () => void {
  const elements = findElements(frameIds);
  if (!elements) return () => {};
  const { stage, world, frames } = elements;

  // 스와이프 모드에서는 프레임마다 안에서 세로로 스크롤된다. 안에 링크·버튼이 없는 프레임(학력·자격 등)도
  // 키보드로 스크롤할 수 있게 프레임 자체가 포커스를 받는다 (axe scrollable-region-focusable)
  frames.forEach((frame) => {
    frame.tabIndex = 0;
  });

  /** 프레임 안 세로 위치 비율. 크기가 바뀐 뒤 같은 자리로 되돌린다 */
  const ratios = new Map<HTMLElement, number>();
  let size = { width: stage.clientWidth, height: stage.clientHeight };
  let frameRequest = 0;
  let fadeTimer = 0;

  /** 프레임의 stage 스크롤 좌표 기준 위치 */
  const measure = (): FrameRect<FrameId>[] => {
    const origin = stage.getBoundingClientRect();
    return frames.map((frame) => {
      const box = frame.getBoundingClientRect();
      return {
        id: frame.id as FrameId,
        x: box.left - origin.left + stage.scrollLeft,
        y: box.top - origin.top + stage.scrollTop,
        width: box.width,
        height: box.height,
      };
    });
  };

  const viewCenter = () => ({
    x: stage.scrollLeft + stage.clientWidth / 2,
    y: stage.scrollTop + stage.clientHeight / 2,
  });

  /** 프레임 가운데가 화면 가운데에 오는 stage 스크롤 위치 */
  const scrollForRect = (rect: FrameRect) => ({
    left: rect.x + rect.width / 2 - stage.clientWidth / 2,
    top: rect.y + rect.height / 2 - stage.clientHeight / 2,
  });

  const scrollToFrame = (frameId: FrameId, behavior: ScrollBehavior) => {
    const rect = measure().find((item) => item.id === frameId);
    if (!rect) return;
    stage.scrollTo({ ...scrollForRect(rect), behavior });
  };

  const updateCurrentFrame = () => {
    frameRequest = 0;
    const frameId = frameAtPoint(measure(), viewCenter());
    if (!frameId || frameId === getCurrentFrame()) return;
    setCurrentFrame(frameId);
    // 안내는 그 프레임 안을 내려서 끝에 닿았을 때만 보인다
    setFrameEndHint(undefined);
  };

  const handleStageScroll = () => {
    if (frameRequest) return;
    frameRequest = requestAnimationFrame(updateCurrentFrame);
  };

  // 2D 스냅은 축마다 따로 멈출 자리를 고르는 브라우저가 있어 빈 캔버스(첫 화면 오른쪽 등)에 멈출 수 있다
  const handleStageScrollEnd = () => {
    // 이동이 끝났다는 알림(markNavigating)보다 먼저 도착한 프레임을 현재 프레임으로 둔다
    cancelAnimationFrame(frameRequest);
    updateCurrentFrame();

    const rects = measure();
    const center = viewCenter();
    const frameId = frameAtPoint(rects, center);
    const rect = rects.find((item) => item.id === frameId);
    if (!rect) return;
    const target = scrollForRect(rect);
    if (
      Math.abs(target.left - stage.scrollLeft) <= ALIGN_TOLERANCE &&
      Math.abs(target.top - stage.scrollTop) <= ALIGN_TOLERANCE
    ) {
      return;
    }
    const inside =
      center.x >= rect.x &&
      center.x <= rect.x + rect.width &&
      center.y >= rect.y &&
      center.y <= rect.y + rect.height;
    // 프레임 안이면 스냅이 맞춘 자리(스크롤 끝 등)를 존중한다
    if (inside) return;
    stage.scrollTo({
      ...target,
      behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    });
  };

  // 프레임 안 스크롤 (scroll은 버블링하지 않아 capture로 받는다)
  const handleFrameScroll = (event: Event) => {
    const frame = event.target;
    if (!(frame instanceof HTMLElement) || !frames.includes(frame)) return;
    const { scrollTop, clientHeight, scrollHeight } = frame;
    ratios.set(frame, scrollRatio(scrollTop, clientHeight, scrollHeight));
    if (frame.id !== getCurrentFrame()) return;

    if (!isScrolledToEnd(scrollTop, clientHeight, scrollHeight)) {
      setFrameEndHint(undefined);
      return;
    }
    const rects = measure();
    const index = frames.indexOf(frame);
    const from = rects[index];
    const to = rects[index + 1];
    if (!from || !to) return;
    setFrameEndHint({
      nextFrameId: to.id,
      direction: nextFrameDirection(from, to),
      gesture: 'swipe',
    });
  };

  const handleResize = () => {
    const next = { width: stage.clientWidth, height: stage.clientHeight };
    if (next.width === size.width && next.height === size.height) return;
    size = next;
    ratios.forEach((ratio, frame) => {
      frame.scrollTop = scrollTopForRatio(
        ratio,
        frame.clientHeight,
        frame.scrollHeight,
      );
    });
    scrollToFrame(getCurrentFrame(), 'instant');
  };

  // 옆 프레임 누르기: 가장자리 안의 링크·버튼이 눌리지 않게 click을 가로챈다
  const handleClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    const frame = frames.find((item) => item.contains(target));
    if (!frame || frame.id === getCurrentFrame()) return;
    event.preventDefault();
    event.stopPropagation();
    navigateToFrame(frame.id as FrameId, {
      focus: false,
      transition: 'slide',
    });
  };

  const jumpToFrame: FrameNavigator['jumpToFrame'] = (
    frameId,
    { transition },
  ) => {
    window.clearTimeout(fadeTimer);
    world.removeAttribute('data-fading');
    markNavigating(frameId, stage);

    // 움직임 줄이기: 미끄러지기·페이드 없이 바로 옮긴다 (넘기기는 손가락을 따라가므로 그대로 둔다)
    if (prefersReducedMotion()) {
      scrollToFrame(frameId, 'instant');
      setCurrentFrame(frameId);
      return;
    }
    if (transition === 'slide') {
      scrollToFrame(frameId, 'smooth');
      return;
    }
    world.setAttribute('data-fading', '');
    fadeTimer = window.setTimeout(() => {
      scrollToFrame(frameId, 'instant');
      setCurrentFrame(frameId);
      world.removeAttribute('data-fading');
    }, FADE_DURATION);
  };

  // 시작: 주소의 프레임에 맞춘다 (JS 전에는 InitialFrame 스크립트가 맞춰 둔다)
  const initialFrame =
    getFrameByPath(window.location.pathname)?.id ?? getCurrentFrame();
  scrollToFrame(initialFrame, 'instant');
  setCurrentFrame(initialFrame);

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(stage);

  const unregister = registerFrameNavigator({ jumpToFrame });
  stage.addEventListener('scroll', handleStageScroll, { passive: true });
  stage.addEventListener('scrollend', handleStageScrollEnd);
  world.addEventListener('scroll', handleFrameScroll, {
    capture: true,
    passive: true,
  });
  world.addEventListener('click', handleClick, { capture: true });

  return () => {
    cancelAnimationFrame(frameRequest);
    window.clearTimeout(fadeTimer);
    resizeObserver.disconnect();
    unregister();
    stage.removeEventListener('scroll', handleStageScroll);
    stage.removeEventListener('scrollend', handleStageScrollEnd);
    world.removeEventListener('scroll', handleFrameScroll, { capture: true });
    world.removeEventListener('click', handleClick, { capture: true });
    world.removeAttribute('data-fading');
    frames.forEach((frame) => frame.removeAttribute('tabindex'));
    setFrameEndHint(undefined);
  };
}
