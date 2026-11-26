'use client';

import { useSyncExternalStore } from 'react';

/** 미디어 쿼리가 맞는지. 서버와 첫 렌더(하이드레이션)에서는 false */
export function useMediaQuery(query: string) {
  const subscribe = (onChange: () => void) => {
    const media = matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  };

  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}
