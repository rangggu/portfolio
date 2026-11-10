import type { TimelineItem, YearMonth } from './types';
import { isTodo } from './validate';

/** 개발 시작 시점: 회사 레인에서 가장 이른 시작월. 채워진 값이 없으면 undefined */
export function getCareerStart(
  timeline: readonly TimelineItem[],
): YearMonth | undefined {
  const starts = timeline
    .filter((item) => item.lane === 'company')
    .map((item) => item.period.start)
    .filter((start) => !isTodo(start))
    .sort();

  return starts[0];
}
