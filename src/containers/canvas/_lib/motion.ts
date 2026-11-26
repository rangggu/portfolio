/**
 * 움직임 줄이기 설정. 캔버스는 이 설정과 상관없이 같은 화면을 보이고,
 * 이동·확대 같은 연출만 애니메이션 없이 바로 바꾼다 (docs/product.md 「prefers-reduced-motion」).
 */
export function prefersReducedMotion(): boolean {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
