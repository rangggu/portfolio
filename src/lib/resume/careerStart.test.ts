import { describe, expect, it } from 'vitest';

import { getCareerStart } from './careerStart';
import { TODO, type TimelineItem } from './types';

function company(id: string, start: string): TimelineItem {
  return {
    id,
    lane: 'company',
    name: id,
    role: '개발자',
    period: { start },
    summary: '설명',
    achievements: [],
    links: [],
  };
}

const SIDE: TimelineItem = {
  id: 'side',
  lane: 'side',
  name: '사이드',
  role: '개인',
  period: { start: '2022-01' },
  summary: '설명',
  links: [],
};

describe('getCareerStart', () => {
  it('회사 레인에서 가장 이른 시작월을 고른다 (사이드는 제외)', () => {
    expect(
      getCareerStart([company('b', '2025-03'), SIDE, company('a', '2023-09')]),
    ).toBe('2023-09');
  });

  it('TODO인 시작월은 건너뛴다', () => {
    expect(getCareerStart([company('a', TODO), company('b', '2025-03')])).toBe(
      '2025-03',
    );
  });

  it('채워진 회사 시작월이 없으면 undefined', () => {
    expect(getCareerStart([company('a', TODO), SIDE])).toBeUndefined();
    expect(getCareerStart([])).toBeUndefined();
  });
});
