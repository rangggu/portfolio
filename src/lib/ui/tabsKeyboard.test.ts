import { describe, expect, it } from 'vitest';

import { nextTabIndex } from './tabsKeyboard';

describe('nextTabIndex', () => {
  it('→는 다음 탭, 마지막에서 처음으로 돈다', () => {
    expect(nextTabIndex('ArrowRight', 0, 3)).toBe(1);
    expect(nextTabIndex('ArrowRight', 2, 3)).toBe(0);
  });

  it('←는 이전 탭, 처음에서 마지막으로 돈다', () => {
    expect(nextTabIndex('ArrowLeft', 2, 3)).toBe(1);
    expect(nextTabIndex('ArrowLeft', 0, 3)).toBe(2);
  });

  it('Home·End는 처음·끝', () => {
    expect(nextTabIndex('Home', 2, 3)).toBe(0);
    expect(nextTabIndex('End', 0, 3)).toBe(2);
  });

  it('그 밖의 키와 빈 목록은 undefined', () => {
    expect(nextTabIndex('Enter', 1, 3)).toBeUndefined();
    expect(nextTabIndex('ArrowDown', 1, 3)).toBeUndefined();
    expect(nextTabIndex('ArrowRight', 0, 0)).toBeUndefined();
  });
});
