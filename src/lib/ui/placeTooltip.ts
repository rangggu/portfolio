/**
 * 툴팁 위치 계산. 기준 요소(anchor)의 위·아래에 놓고, 화면 밖으로 나가지 않게 한다.
 * - 원하는 쪽(placement)에 공간이 없고 반대쪽에 있으면 뒤집는다
 * - 가로는 기준 요소 가운데에 맞추되, 화면 가장자리 여백(padding) 안으로 밀어 넣는다
 * 좌표는 모두 화면(viewport) 기준이다 (getBoundingClientRect, position: fixed).
 */

export type TooltipPlacement = 'top' | 'bottom';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface PlaceTooltipOptions {
  placement: TooltipPlacement;
  /** 기준 요소와의 간격 */
  offset: number;
  /** 화면 가장자리와의 최소 여백 */
  padding: number;
}

export interface TooltipPosition {
  top: number;
  left: number;
  placement: TooltipPlacement;
}

export function placeTooltip(
  anchor: Rect,
  tooltip: Size,
  viewport: Size,
  { placement, offset, padding }: PlaceTooltipOptions,
): TooltipPosition {
  const topOf = (side: TooltipPlacement) =>
    side === 'top'
      ? anchor.top - offset - tooltip.height
      : anchor.top + anchor.height + offset;
  const fits = (side: TooltipPlacement) => {
    const top = topOf(side);
    return top >= padding && top + tooltip.height <= viewport.height - padding;
  };

  const opposite: TooltipPlacement = placement === 'top' ? 'bottom' : 'top';
  const side = !fits(placement) && fits(opposite) ? opposite : placement;

  const centered = anchor.left + anchor.width / 2 - tooltip.width / 2;
  const maxLeft = viewport.width - padding - tooltip.width;
  // 툴팁이 화면보다 넓으면 왼쪽 여백에 붙인다
  const left = maxLeft < padding ? padding : clamp(centered, padding, maxLeft);

  return { top: topOf(side), left, placement: side };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
