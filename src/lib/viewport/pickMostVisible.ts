/** 뷰포트 기준 세로 구간. top·bottom은 getBoundingClientRect()와 같은 뷰포트 좌표 */
export interface VerticalSpan<Id extends string = string> {
  id: Id;
  top: number;
  bottom: number;
}

/**
 * 뷰포트(0 ~ viewportHeight) 안에 보이는 높이가 가장 큰 구간의 id를 고른다.
 * 같으면 배열 앞(문서 순서)을 고르고, 하나도 보이지 않으면 undefined를 돌려준다.
 */
export function pickMostVisible<Id extends string>(
  spans: readonly VerticalSpan<Id>[],
  viewportHeight: number,
): Id | undefined {
  let pickedId: Id | undefined;
  let pickedHeight = 0;

  for (const span of spans) {
    const visibleHeight =
      Math.min(span.bottom, viewportHeight) - Math.max(span.top, 0);
    if (visibleHeight > pickedHeight) {
      pickedId = span.id;
      pickedHeight = visibleHeight;
    }
  }

  return pickedId;
}
