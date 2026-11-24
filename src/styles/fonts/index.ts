import localFont from 'next/font/local';

/**
 * Pretendard 서브셋: 사이트에 쓰는 글자와 굵기 400~700만 남긴 가변 폰트 (yarn fonts로 만든다).
 * 루트 레이아웃에서 쓰므로 모든 페이지 head에 preload가 들어가 첫 페인트부터 Pretendard로 그린다.
 * 서브셋에 없는 글자는 tokens.css의 운영체제별 대체 폰트(메트릭 보정)가 글자 단위로 그리므로 자동 보정은 끈다.
 */
export const pretendard = localFont({
  src: './pretendard-subset.woff2',
  weight: '400 700',
  display: 'swap',
  variable: '--font-pretendard',
  preload: true,
  adjustFontFallback: false,
  fallback: [],
});
