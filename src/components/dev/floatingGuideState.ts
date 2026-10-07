/**
 * 개발 모드 플로팅 UI 자리 표시 on/off 상태.
 * <html data-floating-guide>로 공유하고 localStorage에 기억한다. (ViewportIndicator ↔ FloatingGuide)
 */
const ATTRIBUTE = 'data-floating-guide';
const STORAGE_KEY = 'dev:floating-guide';

export function getFloatingGuide(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.hasAttribute(ATTRIBUTE);
}

export function setFloatingGuide(on: boolean) {
  document.documentElement.toggleAttribute(ATTRIBUTE, on);
  try {
    localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
  } catch {
    // 저장소를 쓸 수 없으면 이번 세션에만 적용
  }
}

export function restoreFloatingGuide() {
  try {
    setFloatingGuide(localStorage.getItem(STORAGE_KEY) === '1');
  } catch {
    // 무시
  }
}

export function subscribeFloatingGuide(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [ATTRIBUTE],
  });
  return () => observer.disconnect();
}
