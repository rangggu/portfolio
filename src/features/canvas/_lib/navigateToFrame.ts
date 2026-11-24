import { getFrame, getFrameHeadingId, type FrameId } from './frames';

/**
 * 메뉴·옆 프레임·뒤로 가기가 함께 쓰는 프레임 이동 (클라이언트 전용).
 * - 카메라·스와이프 모드: 그 모드의 컨트롤러가 등록한 이동 함수로 옮긴다
 * - 세로 페이지: 프레임으로 스크롤한다 (smooth면 이동이 끝날 때까지 스크롤로 주소를 바꾸지 않는다)
 * 메뉴·옆 프레임은 기록을 추가하고(pushState), 뒤로 가기는 기록을 건드리지 않는다.
 */

/**
 * fade: 짧게 감췄다가 바로 옮긴다 (메뉴·뒤로 가기처럼 먼 프레임)
 * slide: 이어진 화면이 미끄러지듯 옮긴다 (옆 프레임). 모드가 지원하지 않으면 fade로 본다
 */
export type FrameTransition = 'fade' | 'slide';

export interface FrameNavigator {
  jumpToFrame: (
    frameId: FrameId,
    options: { transition: FrameTransition },
  ) => void;
}

let frameNavigator: FrameNavigator | undefined;

/** 스크롤로 이동 중인 목적지 */
let pendingFrame: FrameId | undefined;
let pendingTimer = 0;
let pendingScroller: EventTarget | undefined;

/** 이동이 끝났을 때 부를 함수 (이동 중 건너뛴 주소·제목 맞추기) */
const navigationEndListeners = new Set<() => void>();

/** smooth 스크롤이 끝났는데 scrollend가 오지 않는 브라우저를 위한 상한 */
const PENDING_TIMEOUT = 1000;

/** 직접 끝내는 이동(카메라 미끄러짐)이 끝내지 못했을 때의 안전장치 (가장 긴 이동보다 길게) */
const MANUAL_PENDING_TIMEOUT = 2000;

export function registerFrameNavigator(navigator: FrameNavigator) {
  frameNavigator = navigator;
  return () => {
    if (frameNavigator === navigator) frameNavigator = undefined;
  };
}

/** 이동 중이면 스크롤로 지나가는 프레임의 주소를 기록하지 않는다 */
export function isNavigatingToFrame(): boolean {
  return pendingFrame !== undefined;
}

/** 이동이 끝나면 부른다. 해제 함수를 돌려준다 */
export function subscribeNavigationEnd(listener: () => void) {
  navigationEndListeners.add(listener);
  return () => {
    navigationEndListeners.delete(listener);
  };
}

function stopPending() {
  pendingFrame = undefined;
  window.clearTimeout(pendingTimer);
  pendingScroller?.removeEventListener('scrollend', clearPending);
  pendingScroller = undefined;
}

function clearPending() {
  if (pendingFrame === undefined) return;
  stopPending();
  navigationEndListeners.forEach((listener) => listener());
}

/**
 * frameId까지 옮기는 동안 이동 중으로 표시한다. 끝내는 함수를 돌려준다.
 * - scroller를 주면 그 scrollend(또는 상한 시간)에 저절로 끝난다
 * - 'manual'이면 돌려받은 함수로 직접 끝낸다 (rAF로 조금씩 옮겨 중간에 scrollend가 오는 이동). 상한 시간은 안전장치
 */
export function markNavigating(
  frameId: FrameId,
  scroller: EventTarget | 'manual' = window,
): () => void {
  // 이어진 이동이면 앞 이동의 끝을 알리지 않는다 (지나온 프레임으로 주소를 되돌리지 않게)
  stopPending();
  pendingFrame = frameId;
  if (scroller === 'manual') {
    pendingTimer = window.setTimeout(clearPending, MANUAL_PENDING_TIMEOUT);
  } else {
    pendingScroller = scroller;
    scroller.addEventListener('scrollend', clearPending, { once: true });
    pendingTimer = window.setTimeout(clearPending, PENDING_TIMEOUT);
  }
  return () => {
    if (pendingFrame === frameId) clearPending();
  };
}

/** 키보드 사용자를 위해 제목으로 포커스를 옮긴다 (스크롤은 이미 했으므로 막는다) */
function focusFrameHeading(frameId: FrameId) {
  const heading = document.getElementById(getFrameHeadingId(frameId));
  if (!heading) return;
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

interface NavigateOptions {
  /** push: 기록 추가 (메뉴·옆 프레임), none: 주소를 이미 바꾼 경우 (뒤로·앞으로 가기) */
  history?: 'push' | 'none';
  /** 제목으로 포커스를 옮길지 */
  focus?: boolean;
  /** 카메라·스와이프 모드에서 옮기는 방식 */
  transition?: FrameTransition;
}

export function navigateToFrame(
  frameId: FrameId,
  { history = 'push', focus = true, transition = 'fade' }: NavigateOptions = {},
) {
  const { path } = getFrame(frameId);
  if (history === 'push' && window.location.pathname !== path) {
    window.history.pushState(null, '', path);
  }

  if (frameNavigator) {
    frameNavigator.jumpToFrame(frameId, { transition });
  } else {
    const element = document.getElementById(frameId);
    if (!element) return;
    markNavigating(frameId);
    element.scrollIntoView({
      block: 'start',
      behavior: history === 'none' ? 'instant' : 'auto',
    });
  }

  if (focus) focusFrameHeading(frameId);
}
