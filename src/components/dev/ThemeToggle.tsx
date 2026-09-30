// TODO: Phase 3에서 원형 확산 효과로 교체 예정
'use client';

import { useCallback, useSyncExternalStore } from 'react';

function getTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return (
    (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ??
    'light'
  );
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light');

  const toggle = useCallback(() => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${theme === 'light' ? '다크' : '라이트'} 모드로 전환`}
      style={{
        position: 'fixed',
        bottom: 8,
        right: 8,
        zIndex: 99999,
        padding: '6px 12px',
        borderRadius: 6,
        border: 'none',
        backgroundColor: 'var(--color-bg-elevated)',
        color: 'var(--color-text-primary)',
        fontSize: 13,
        fontFamily: 'monospace',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
