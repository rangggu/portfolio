import { useSyncExternalStore } from 'react';
import {
  CANVAS_MODE_ATTRIBUTE,
  CANVAS_MODE_STORAGE_KEY,
  type CanvasMode,
} from '../_lib/canvasMode';

/**
 * 지금 캔버스 모드. 값의 원천은 <html data-canvas-mode> (CameraScript가 첫 페인트 전에 정한다).
 * 서버와 첫 하이드레이션에서는 알 수 없으므로 'read'로 그린 뒤 맞춘다.
 */

export function getCanvasMode(): CanvasMode {
  return document.documentElement.getAttribute(CANVAS_MODE_ATTRIBUTE) === 'free'
    ? 'free'
    : 'read';
}

export function subscribeCanvasMode(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [CANVAS_MODE_ATTRIBUTE],
  });
  return () => observer.disconnect();
}

export function setCanvasMode(mode: CanvasMode) {
  const html = document.documentElement;
  if (mode === 'free') html.setAttribute(CANVAS_MODE_ATTRIBUTE, 'free');
  else html.removeAttribute(CANVAS_MODE_ATTRIBUTE);
  try {
    localStorage.setItem(CANVAS_MODE_STORAGE_KEY, mode);
  } catch {
    // 저장소를 쓸 수 없으면 이번 세션에만 적용
  }
}

export function useCanvasMode(): CanvasMode {
  return useSyncExternalStore(subscribeCanvasMode, getCanvasMode, () => 'read');
}
