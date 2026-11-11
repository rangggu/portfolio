import { describe, expect, it } from 'vitest';

import { buildTimelineRows } from './timelineRows';
import { TODO, type Period, type TimelineItem } from './types';

function company(id: string, period: Period): { item: TimelineItem } {
  return {
    item: {
      id,
      lane: 'company',
      name: id,
      role: 'r',
      period,
      summary: 's',
      achievements: [],
      links: [],
    },
  };
}

function side(id: string, period: Period): { item: TimelineItem } {
  return {
    item: {
      id,
      lane: 'side',
      name: id,
      role: 'r',
      period,
      summary: 's',
      links: [],
    },
  };
}

const ids = (entries: { item: TimelineItem }[]) =>
  entries.map((entry) => entry.item.id);

describe('buildTimelineRows', () => {
  it('회사는 시작한 해부터 끝난 해까지 행마다 놓고, 시작 행만 표시한다', () => {
    const { rows } = buildTimelineRows(
      [company('a', { start: '2023-09', end: '2025-02' })],
      2026,
    );
    expect(rows.map((row) => row.year)).toEqual([2023, 2024, 2025]);
    expect(rows.map((row) => row.company[0]?.isStart)).toEqual([
      true,
      false,
      false,
    ]);
  });

  it('진행 중인 회사는 올해까지 이어진다', () => {
    const { rows } = buildTimelineRows(
      [company('a', { start: '2025-03' })],
      2026,
    );
    expect(rows.map((row) => row.year)).toEqual([2025, 2026]);
  });

  it('끝이 TODO인 회사는 시작한 해에만 놓는다', () => {
    const { rows } = buildTimelineRows(
      [company('a', { start: '2024-01', end: TODO })],
      2026,
    );
    expect(rows.map((row) => row.year)).toEqual([2024]);
  });

  it('사이드는 시작한 해의 행에만, 시작월 순으로 놓는다', () => {
    const { rows } = buildTimelineRows(
      [
        side('late', { start: '2023-11', end: '2024-08' }),
        side('early', { start: '2023-02', end: '2023-04' }),
        side('next', { start: '2024-10' }),
      ],
      2026,
    );
    expect(rows.map((row) => [row.year, ids(row.side)])).toEqual([
      [2023, ['early', 'late']],
      [2024, ['next']],
    ]);
  });

  it('항목이 없는 해는 행을 만들지 않고, 연도 순으로 정렬한다', () => {
    const { rows } = buildTimelineRows(
      [
        side('b', { start: '2026-01' }),
        company('a', { start: '2023-09', end: '2023-12' }),
      ],
      2026,
    );
    expect(rows.map((row) => row.year)).toEqual([2023, 2026]);
  });

  it('시작월이 TODO인 항목은 undated로 모은다', () => {
    const { rows, undated } = buildTimelineRows(
      [company('a', { start: TODO }), side('b', { start: '2024-01' })],
      2026,
    );
    expect(ids(undated)).toEqual(['a']);
    expect(rows.map((row) => row.year)).toEqual([2024]);
  });
});
