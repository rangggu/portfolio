import { useSyncExternalStore } from 'react';

/**
 * 자유 모드 권유 말풍선을 보일지. 읽기 카메라(startCamera)가 확대·좌우 이동 시도를 보면 켜고,
 * 모드 버튼 옆 말풍선(ModeHint)이 그리고 끈다.
 */

let visible = false;
const listeners = new Set<() => void>();

function setVisible(next: boolean) {
  if (next === visible) return;
  visible = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function showModeHint() {
  setVisible(true);
}

export function hideModeHint() {
  setVisible(false);
}

export function useModeHint(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => visible,
    () => false,
  );
}
