import { useSyncExternalStore } from 'react';
import type { FrameId } from '../_lib/frames';

/**
 * 지금 보고 있는 프레임. 선택 표시, 위치 표시, 메뉴 바가 함께 쓴다.
 * 값은 세로 페이지에서는 CurrentFrameTracker가, 카메라 모드에서는 CameraController가 스크롤 위치로 정한다.
 */

/** 서버 렌더와 첫 하이드레이션에서 쓰는 값 */
export const INITIAL_FRAME: FrameId = 'hero';

let currentFrame: FrameId = INITIAL_FRAME;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCurrentFrame(): FrameId {
  return currentFrame;
}

/** 값이 바뀔 때마다 부른다 (주소·문서 제목 맞추기). 해제 함수를 돌려준다 */
export function subscribeCurrentFrame(listener: () => void) {
  return subscribe(listener);
}

export function setCurrentFrame(frameId: FrameId) {
  if (frameId === currentFrame) return;
  currentFrame = frameId;
  listeners.forEach((listener) => listener());
}

export function useCurrentFrame(): FrameId {
  return useSyncExternalStore(
    subscribe,
    () => currentFrame,
    () => INITIAL_FRAME,
  );
}

/** 이 프레임이 현재 프레임인지. 값이 바뀐 프레임만 다시 렌더된다 */
export function useIsCurrentFrame(frameId: FrameId): boolean {
  return useSyncExternalStore(
    subscribe,
    () => currentFrame === frameId,
    () => INITIAL_FRAME === frameId,
  );
}
