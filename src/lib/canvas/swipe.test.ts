import { describe, expect, it } from 'vitest';

import {
  isScrolledToEnd,
  nextFrameDirection,
  scrollRatio,
  scrollTopForRatio,
} from './swipe';

describe('nextFrameDirection', () => {
  it('같은 열이면 아래', () => {
    expect(nextFrameDirection({ x: 100 }, { x: 100 })).toBe('down');
    expect(nextFrameDirection({ x: 100 }, { x: 100.4 })).toBe('down');
  });

  it('다른 열이면 오른쪽', () => {
    expect(nextFrameDirection({ x: 100 }, { x: 481 })).toBe('right');
  });
});

describe('scrollRatio', () => {
  it('스크롤 위치를 0~1 비율로 바꾼다', () => {
    expect(scrollRatio(0, 800, 2000)).toBe(0);
    expect(scrollRatio(600, 800, 2000)).toBe(0.5);
    expect(scrollRatio(1200, 800, 2000)).toBe(1);
  });

  it('범위를 벗어난 값(바운스)은 0~1로 자른다', () => {
    expect(scrollRatio(-30, 800, 2000)).toBe(0);
    expect(scrollRatio(1300, 800, 2000)).toBe(1);
  });

  it('스크롤할 수 없으면 0', () => {
    expect(scrollRatio(0, 800, 800)).toBe(0);
    expect(scrollRatio(0, 800, 600)).toBe(0);
  });
});

describe('scrollTopForRatio', () => {
  it('비율을 새 크기의 스크롤 위치로 바꾼다', () => {
    expect(scrollTopForRatio(0.5, 400, 3000)).toBe(1300);
    expect(scrollTopForRatio(1, 400, 3000)).toBe(2600);
  });

  it('저장·복원을 거쳐도 같은 크기면 같은 위치', () => {
    const ratio = scrollRatio(437, 800, 2000);
    expect(scrollTopForRatio(ratio, 800, 2000)).toBe(437);
  });

  it('스크롤할 수 없으면 0', () => {
    expect(scrollTopForRatio(0.7, 800, 800)).toBe(0);
  });
});

describe('isScrolledToEnd', () => {
  it('끝까지 내렸으면 true', () => {
    expect(isScrolledToEnd(1200, 800, 2000)).toBe(true);
    expect(isScrolledToEnd(1199.5, 800, 2000)).toBe(true);
  });

  it('끝에 닿지 않았으면 false', () => {
    expect(isScrolledToEnd(1100, 800, 2000)).toBe(false);
  });

  it('스크롤할 수 없는 프레임·맨 위는 false', () => {
    expect(isScrolledToEnd(0, 800, 800)).toBe(false);
    expect(isScrolledToEnd(0, 800, 2000)).toBe(false);
  });
});
