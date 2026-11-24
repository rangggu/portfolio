/**
 * 데스크톱 캔버스 모드 (docs/product.md 「자유 모드」).
 * - read: 읽기 모드. 휠로 정해진 경로를 따라 읽는다 (기본)
 * - free: 자유 모드. 피그마처럼 이동·확대·축소하며 둘러본다
 * 값의 원천은 <html data-canvas-mode> (없으면 read). CameraScript가 저장값을 첫 페인트 전에 붙인다.
 */
export type CanvasMode = 'read' | 'free';

export const CANVAS_MODE_ATTRIBUTE = 'data-canvas-mode';

export const CANVAS_MODE_STORAGE_KEY = 'canvas-mode';

export function isCanvasMode(value: unknown): value is CanvasMode {
  return value === 'read' || value === 'free';
}
