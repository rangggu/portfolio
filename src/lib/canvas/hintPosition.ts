/**
 * 프레임 끝 안내 말풍선의 가로 위치 (docs/product.md 「프레임 끝 안내」).
 * 말풍선은 메뉴 바 위에서 다음 프레임 메뉴 항목을 가리킨다. 화면 밖으로 나가지 않게 좌우를 막고,
 * 꼬리는 말풍선 안에서 항목 가운데를 향한다. 항목이 바 안에서 밀려 안 보이면 꼬리 없이 바 가운데 위에 둔다.
 */
export interface HintPositionInput {
  /** 가리킬 메뉴 항목의 가운데 x (화면 기준) */
  targetCenter: number;
  /** 메뉴 바에서 보이는 구간 (화면 기준) */
  barLeft: number;
  barRight: number;
  hintWidth: number;
  viewportWidth: number;
  /** 화면 가장자리와 말풍선 사이 최소 여백 */
  edge: number;
  /** 꼬리가 말풍선 모서리에서 떨어져야 하는 최소 거리 (둥근 모서리 안쪽) */
  tailInset: number;
}

export interface HintPosition {
  /** 말풍선 왼쪽 x */
  left: number;
  /** 말풍선 왼쪽에서 꼬리 가운데까지. null이면 꼬리를 그리지 않는다 */
  tailX: number | null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

export function hintPosition({
  targetCenter,
  barLeft,
  barRight,
  hintWidth,
  viewportWidth,
  edge,
  tailInset,
}: HintPositionInput): HintPosition {
  const targetVisible = targetCenter >= barLeft && targetCenter <= barRight;
  const anchor = targetVisible ? targetCenter : (barLeft + barRight) / 2;
  const left = clamp(
    anchor - hintWidth / 2,
    edge,
    viewportWidth - edge - hintWidth,
  );

  return {
    left,
    tailX: targetVisible
      ? clamp(targetCenter - left, tailInset, hintWidth - tailInset)
      : null,
  };
}
