import { describe, expect, it } from 'vitest';

import { getNextTheme, isTheme } from './theme';

describe('isTheme', () => {
  it('light와 dark만 테마로 본다', () => {
    expect(isTheme('light')).toBe(true);
    expect(isTheme('dark')).toBe(true);
  });

  it('그 밖의 값은 테마가 아니다', () => {
    expect(isTheme('system')).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
  });
});

describe('getNextTheme', () => {
  it('라이트와 다크를 서로 바꾼다', () => {
    expect(getNextTheme('light')).toBe('dark');
    expect(getNextTheme('dark')).toBe('light');
  });
});
