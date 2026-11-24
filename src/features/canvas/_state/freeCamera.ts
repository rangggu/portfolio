import { useSyncExternalStore } from 'react';

/**
 * 자유 모드 카메라의 배율과 조작 명령. 확대 버튼(ZoomControls)이 읽고 부르고, startFreeCamera가 채운다.
 */
export interface FreeCameraControls {
  zoomIn: () => void;
  zoomOut: () => void;
  /** 100% (화면 가운데 유지) */
  resetZoom: () => void;
  /** 전체 보기 */
  fitAll: () => void;
}

let scale = 1;
let controls: FreeCameraControls | undefined;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setFreeCameraScale(next: number) {
  if (next === scale) return;
  scale = next;
  listeners.forEach((listener) => listener());
}

export function registerFreeCameraControls(next: FreeCameraControls) {
  controls = next;
  return () => {
    if (controls === next) controls = undefined;
  };
}

export function getFreeCameraControls(): FreeCameraControls | undefined {
  return controls;
}

export function useFreeCameraScale(): number {
  return useSyncExternalStore(
    subscribe,
    () => scale,
    () => 1,
  );
}
