/**
 * 터치 스와이프의 계산 (docs/product.md 「터치 — 좌우 스와이프」).
 *
 * 터치 기기에서는 프레임이 데스크톱 지도대로 놓인 스크롤 스냅 영역 안에 있고,
 * 프레임마다 자기 안에서 세로로 스크롤된다. 여기서는 위치 계산만 한다 (DOM은 SwipeController가 다룬다).
 */
import type { CameraDirection, FrameRect } from './cameraTrack';

/** 끝 판정 여유 (소수점 스크롤 위치 대비) */
const END_TOLERANCE = 1;

/** 다음 프레임이 어느 쪽에 있는지. 같은 열이면 아래, 아니면 오른쪽 */
export function nextFrameDirection(
  from: Pick<FrameRect, 'x'>,
  to: Pick<FrameRect, 'x'>,
): CameraDirection {
  return Math.abs(from.x - to.x) < END_TOLERANCE ? 'down' : 'right';
}

/** 프레임 안 세로 스크롤 위치를 0~1 비율로. 스크롤할 수 없으면 0 */
export function scrollRatio(
  scrollTop: number,
  clientHeight: number,
  scrollHeight: number,
): number {
  const max = scrollHeight - clientHeight;
  if (max <= 0) return 0;
  return Math.min(Math.max(scrollTop / max, 0), 1);
}

/** 비율을 다시 스크롤 위치로 (크기가 바뀐 뒤 같은 자리로 되돌릴 때) */
export function scrollTopForRatio(
  ratio: number,
  clientHeight: number,
  scrollHeight: number,
): number {
  const max = scrollHeight - clientHeight;
  if (max <= 0) return 0;
  return Math.round(Math.min(Math.max(ratio, 0), 1) * max);
}

/**
 * 프레임 안을 끝까지 내렸는지. 프레임 끝 안내는 직접 내려서 끝에 닿았을 때만 보이므로
 * 스크롤할 수 없는(한 화면에 다 들어가는) 프레임이나 맨 위에서는 false
 */
export function isScrolledToEnd(
  scrollTop: number,
  clientHeight: number,
  scrollHeight: number,
): boolean {
  if (scrollTop <= 0) return false;
  return scrollTop + clientHeight >= scrollHeight - END_TOLERANCE;
}
