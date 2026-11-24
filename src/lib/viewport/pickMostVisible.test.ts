import { describe, expect, it } from 'vitest';

import { pickMostVisible } from './pickMostVisible';

const VIEWPORT = 800;

describe('pickMostVisible', () => {
  it('보이는 높이가 가장 큰 구간을 고른다', () => {
    const spans = [
      { id: 'hero', top: -600, bottom: 200 },
      { id: 'about', top: 200, bottom: 1000 },
    ];

    expect(pickMostVisible(spans, VIEWPORT)).toBe('about');
  });

  it('뷰포트보다 긴 구간이 화면을 덮으면 그 구간을 고른다', () => {
    const spans = [
      { id: 'career', top: -1000, bottom: 2000 },
      { id: 'projects', top: 2000, bottom: 2800 },
    ];

    expect(pickMostVisible(spans, VIEWPORT)).toBe('career');
  });

  it('보이는 높이가 같으면 앞 구간을 고른다', () => {
    const spans = [
      { id: 'hero', top: -400, bottom: 400 },
      { id: 'about', top: 400, bottom: 1200 },
    ];

    expect(pickMostVisible(spans, VIEWPORT)).toBe('hero');
  });

  it('하나도 보이지 않으면 undefined를 돌려준다', () => {
    const spans = [
      { id: 'hero', top: -900, bottom: -100 },
      { id: 'about', top: 900, bottom: 1700 },
    ];

    expect(pickMostVisible(spans, VIEWPORT)).toBeUndefined();
  });

  it('빈 목록이면 undefined를 돌려준다', () => {
    expect(pickMostVisible([], VIEWPORT)).toBeUndefined();
  });
});
