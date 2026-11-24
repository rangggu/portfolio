'use client';

import dynamic from 'next/dynamic';

/**
 * 루트 레이아웃용 Toaster. 첫 화면 JS에 넣지 않고 하이드레이션 뒤에 불러온다
 * (넣으면 모바일 Lighthouse LCP가 2.5초 → 3.3초로 늘었다). 그 전에 부른 toast()는 목록에 쌓였다가 보인다.
 */
export const LazyToaster = dynamic(
  () => import('./Toaster').then((module) => module.Toaster),
  { ssr: false },
);
