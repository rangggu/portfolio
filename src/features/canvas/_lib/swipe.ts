/**
 * 터치 스와이프 모드 (docs/product.md 「터치 — 좌우 스와이프」).
 * 터치 기기면 움직임 줄이기와 상관없이 켠다. Canvas.module.css가 같은 미디어 쿼리로 배치를 바꾸므로
 * 속성을 붙이지 않고, JS에서는 이 조건으로만 판단한다. 접힘·펼침·회전으로는 바뀌지 않는다.
 */
export const SWIPE_MEDIA_QUERY = 'screen and (pointer: coarse)';

export function isSwipeMode(): boolean {
  return matchMedia(SWIPE_MEDIA_QUERY).matches;
}
