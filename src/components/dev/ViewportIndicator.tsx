'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  getFloatingGuide,
  restoreFloatingGuide,
  setFloatingGuide,
  subscribeFloatingGuide,
} from './floatingGuideState';

function getBreakpointName(width: number): string {
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  return 'base';
}

export function ViewportIndicator() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  const floatingGuide = useSyncExternalStore(
    subscribeFloatingGuide,
    getFloatingGuide,
    () => false,
  );

  useEffect(() => {
    restoreFloatingGuide();
  }, []);

  useEffect(() => {
    const update = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (size.w === 0) return null;

  const ratio = (size.w / size.h).toFixed(2);
  const bp = getBreakpointName(size.w);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 8,
        left: 8,
        zIndex: 99999,
        padding: '4px 8px',
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.75)',
        color: '#fff',
        fontSize: 11,
        fontFamily: 'monospace',
        lineHeight: 1.4,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span>
        {size.w}×{size.h} · {ratio} · {bp}
      </span>
      <button
        type="button"
        aria-pressed={floatingGuide}
        onClick={() => setFloatingGuide(!floatingGuide)}
        style={{
          padding: '0 6px',
          border: '1px solid currentColor',
          borderRadius: 3,
          background: floatingGuide ? '#fff' : 'transparent',
          color: floatingGuide ? '#000' : '#fff',
          font: 'inherit',
        }}
      >
        플로팅 자리
      </button>
    </div>
  );
}
