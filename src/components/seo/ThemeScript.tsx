import { THEME_STORAGE_KEY } from '@/lib/theme/theme';

/** 저장된 테마(없거나 읽을 수 없으면 시스템 설정)를 첫 페인트 전에 <html data-theme>에 적용한다 */
const THEME_SCRIPT = `
(function() {
  var saved;
  try { saved = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}); } catch (e) {}
  var theme = saved === 'light' || saved === 'dark'
    ? saved
    : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
