/** 테마 저장 키. ThemeScript(첫 페인트 전)와 테마 버튼이 같은 키를 쓴다 */
export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark';

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export function getNextTheme(theme: Theme): Theme {
  return theme === 'light' ? 'dark' : 'light';
}
