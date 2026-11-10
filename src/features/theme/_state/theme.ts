import { useSyncExternalStore } from 'react';
import { isTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme/theme';

/**
 * 현재 테마. 값의 원천은 <html data-theme> (ThemeScript가 첫 페인트 전에 정한다).
 * 서버와 첫 하이드레이션에서는 알 수 없으므로 'light'로 그린 뒤 맞춘다.
 */

const ATTRIBUTE = 'data-theme';

function getTheme(): Theme {
  const value = document.documentElement.getAttribute(ATTRIBUTE);
  return isTheme(value) ? value : 'light';
}

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [ATTRIBUTE],
  });
  return () => observer.disconnect();
}

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute(ATTRIBUTE, theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // 저장소를 쓸 수 없으면 이번 세션에만 적용
  }
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, getTheme, () => 'light');
}
