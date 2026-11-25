/**
 * OG 이미지(next/og)에 쓰는 색. 이미지 엔진은 CSS 변수를 읽지 못해 토큰과 같은 값을 여기 둔다 (라이트 테마).
 * 값이 tokens.css와 어긋나면 ogTheme.test.ts가 알린다. 키는 대응하는 semantic 토큰 이름.
 */
export const OG_COLORS = {
  '--color-bg-canvas': '#efede8',
  '--color-text-primary': '#1b1e23',
  '--color-text-secondary': '#5f6670',
  '--color-bg-accent': '#c7365f',
} as const;

export type OgColorToken = keyof typeof OG_COLORS;

/** 이미지 크기 (Open Graph 권장 1.91:1) */
export const OG_SIZE = { width: 1200, height: 630 } as const;
