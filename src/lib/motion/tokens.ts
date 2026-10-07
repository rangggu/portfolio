/**
 * CSS 모션 토큰(`src/styles/tokens.css`)과 동일한 값.
 * Motion 라이브러리에서 사용한다. 값을 바꾸면 tokens.css도 함께 바꾼다.
 * 동기화는 tokens.test.ts에서 검증한다.
 */

// ---------- Duration (ms) ----------

export const DURATION = {
  instant: 100,
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
} as const;

// ---------- Easing ----------

export const EASE = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  springGentle: [
    'linear(',
    '0,',
    '0.19 4%,',
    '0.54 10%,',
    '0.85 18%,',
    '1.02 28%,',
    '1.05 34%,',
    '1.03 44%,',
    '1 60%,',
    '1',
    ')',
  ].join(' '),
  springBounce: [
    'linear(',
    '0,',
    '0.009,',
    '0.035 2.1%,',
    '0.141,',
    '0.281 6.7%,',
    '0.723 12.9%,',
    '0.938 16.7%,',
    '1.017,',
    '1.077,',
    '1.121,',
    '1.149 24.3%,',
    '1.159,',
    '1.163,',
    '1.161,',
    '1.154 29.9%,',
    '1.129 32.8%,',
    '1.051 39.6%,',
    '1.017 43.1%,',
    '0.991,',
    '0.977 51%,',
    '0.974 53.8%,',
    '0.975 57.1%,',
    '0.997 69.8%,',
    '1.003 76.9%,',
    '1',
    ')',
  ].join(' '),
} as const;

// ---------- 애니메이션별 ----------

export const MOTION = {
  press: {
    scale: 0.97,
    duration: DURATION.instant,
    releaseDuration: DURATION.slow,
    releaseEase: EASE.springBounce,
  },
  hover: {
    lift: -2,
    duration: DURATION.fast,
  },
  page: {
    duration: DURATION.slow,
    ease: EASE.out,
  },
  themeReveal: {
    duration: DURATION.slower,
    ease: EASE.in,
  },
  dialog: {
    duration: DURATION.normal,
    ease: EASE.out,
    scaleFrom: 0.96,
  },
  sheet: {
    duration: DURATION.slow,
    ease: EASE.springGentle,
  },
  toast: {
    duration: DURATION.normal,
  },
  indicator: {
    duration: DURATION.normal,
    ease: EASE.springGentle,
  },
} as const;
