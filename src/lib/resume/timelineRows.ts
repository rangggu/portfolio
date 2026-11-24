import type { TimelineItem } from './types';
import { isTodo } from './validate';

export interface TimelineCompanyCell<E> {
  entry: E;
  /** 회사가 시작한 해의 행이면 true. 이어지는 해의 행에는 막대만 그린다 */
  isStart: boolean;
}

export interface TimelineRow<E> {
  year: number;
  company: TimelineCompanyCell<E>[];
  side: E[];
}

export interface TimelineRows<E> {
  rows: TimelineRow<E>[];
  /** 시작월이 아직 TODO라 연도 행에 넣지 못한 항목 */
  undated: E[];
}

function toYear(yearMonth: string): number {
  return Number(yearMonth.slice(0, 4));
}

/** 회사 항목이 이어지는 마지막 해. 진행 중이면 올해, 끝이 TODO면 시작한 해 */
function getEndYear(item: TimelineItem, currentYear: number): number {
  const { start, end } = item.period;
  if (end === undefined) return Math.max(toYear(start), currentYear);
  if (isTodo(end)) return toYear(start);
  return toYear(end);
}

/**
 * 경력 타임라인을 연도 행으로 묶는다 (두 갈래 타임라인).
 * 회사는 시작한 해부터 끝난 해까지 모든 행에, 사이드는 시작한 해의 행에만 놓는다.
 * 항목이 하나도 없는 해는 행을 만들지 않는다.
 */
export function buildTimelineRows<E extends { item: TimelineItem }>(
  entries: readonly E[],
  currentYear: number,
): TimelineRows<E> {
  const undated: E[] = [];
  const byYear = new Map<number, TimelineRow<E>>();

  const rowOf = (year: number) => {
    let row = byYear.get(year);
    if (!row) {
      row = { year, company: [], side: [] };
      byYear.set(year, row);
    }
    return row;
  };

  // 시작월 순으로 넣어 행 안 순서를 맞춘다 (같은 달이면 원래 순서 유지)
  const dated = entries
    .filter((entry) => {
      if (!isTodo(entry.item.period.start)) return true;
      undated.push(entry);
      return false;
    })
    .sort((a, b) => a.item.period.start.localeCompare(b.item.period.start));

  for (const entry of dated) {
    const startYear = toYear(entry.item.period.start);
    if (entry.item.lane === 'side') {
      rowOf(startYear).side.push(entry);
      continue;
    }
    const endYear = getEndYear(entry.item, currentYear);
    for (let year = startYear; year <= endYear; year++) {
      rowOf(year).company.push({ entry, isStart: year === startYear });
    }
  }

  const rows = [...byYear.values()].sort((a, b) => a.year - b.year);
  return { rows, undated };
}
