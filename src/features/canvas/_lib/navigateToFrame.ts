import { getFrame, getFrameHeadingId, type FrameId } from './frames';

/**
 * 메뉴·옆 프레임·뒤로 가기가 함께 쓰는 프레임 이동 (클라이언트 전용).
 * - 카메라 모드: CameraController가 등록한 이동 함수로 바로 옮긴다 (짧은 페이드)
 * - 세로 페이지: 프레임으로 스크롤한다 (smooth면 이동이 끝날 때까지 스크롤로 주소를 바꾸지 않는다)
 * 메뉴·옆 프레임은 기록을 추가하고(pushState), 뒤로 가기는 기록을 건드리지 않는다.
 */

export interface CameraNavigator {
  jumpToFrame: (frameId: FrameId, options: { fade: boolean }) => void;
}

let cameraNavigator: CameraNavigator | undefined;

/** 세로 페이지에서 smooth 스크롤로 이동 중인 목적지 */
let pendingFrame: FrameId | undefined;
let pendingTimer = 0;

/** smooth 스크롤이 끝났는데 scrollend가 오지 않는 브라우저를 위한 상한 */
const PENDING_TIMEOUT = 1000;

export function registerCameraNavigator(navigator: CameraNavigator) {
  cameraNavigator = navigator;
  return () => {
    if (cameraNavigator === navigator) cameraNavigator = undefined;
  };
}

/** 이동 중이면 스크롤로 지나가는 프레임의 주소를 기록하지 않는다 */
export function isNavigatingToFrame(): boolean {
  return pendingFrame !== undefined;
}

function clearPending() {
  pendingFrame = undefined;
  window.clearTimeout(pendingTimer);
  window.removeEventListener('scrollend', clearPending);
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
}

export function navigateToFrame(
  frameId: FrameId,
  { history = 'push', focus = true }: NavigateOptions = {},
) {
  const { path } = getFrame(frameId);
  if (history === 'push' && window.location.pathname !== path) {
    window.history.pushState(null, '', path);
  }

  if (cameraNavigator) {
    cameraNavigator.jumpToFrame(frameId, { fade: true });
  } else {
    const element = document.getElementById(frameId);
    if (!element) return;
    clearPending();
    pendingFrame = frameId;
    window.addEventListener('scrollend', clearPending, { once: true });
    pendingTimer = window.setTimeout(clearPending, PENDING_TIMEOUT);
    element.scrollIntoView({
      block: 'start',
      behavior: history === 'none' ? 'instant' : 'auto',
    });
  }

  if (focus) focusFrameHeading(frameId);
}
