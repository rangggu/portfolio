import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { parseTokens, tokenKind } from './parseTokens';

const SAMPLE = `
/* =====
 * 파일 머리말
 * ===== */

/* ---------- Primitive: Color ---------- */
:root {
  --color-gray-0: #ffffff;
  --color-gray-550: #6e757f; /* 시안 약한 글자 */

  /* 블록 안 소제목은 설명이 아니다 */
  --color-red-500: #e5484d;
}

/* ---------- Motion ---------- */
:root {
  --ease-spring: linear(
    0,
    0.19 4%,
    1
  );
  --layout-bar: calc(
    var(--size-a) + var(--size-b) * 2
  ); /* 44 + 4×2 */
  --layout-peek: clamp(2rem, 4vw, 4.5rem);
}

@media (pointer: coarse) {
  :root {
    --layout-peek: 12px;
  }
}

/* ---------- Semantic: Light ---------- */
:root {
  --color-text-primary: var(--color-gray-900);
  --color-bg-accent: var(--color-blue-600);
  --shadow-floating:
    0 1px 2px rgb(0 0 0 / 0.06), 0 6px 20px rgb(0 0 0 / 0.08);
}

/* ---------- Semantic: Dark ---------- */
[data-theme='dark'] {
  --color-text-primary: var(--color-gray-50);
  --color-bg-accent: var(--color-blue-600);
}
`;

describe('parseTokens', () => {
  const groups = parseTokens(SAMPLE);
  const find = (name: string) =>
    groups
      .flatMap((group) => group.tokens)
      .find((token) => token.name === name);

  it('그룹 제목 주석으로 블록을 묶는다 (다크·@media 블록은 그룹을 만들지 않는다)', () => {
    expect(groups.map((group) => group.title)).toEqual([
      'Primitive: Color',
      'Motion',
      'Semantic: Light',
    ]);
  });

  it('같은 줄 꼬리 주석만 설명으로 붙인다', () => {
    expect(find('--color-gray-550')?.note).toBe('시안 약한 글자');
    expect(find('--color-red-500')?.note).toBeUndefined();
    expect(find('--layout-bar')?.note).toBe('44 + 4×2');
  });

  it('여러 줄 값을 한 줄로 정리한다', () => {
    expect(find('--ease-spring')?.light).toBe('linear(0, 0.19 4%, 1)');
    expect(find('--layout-bar')?.light).toBe(
      'calc(var(--size-a) + var(--size-b) * 2)',
    );
    expect(find('--shadow-floating')?.light).toBe(
      '0 1px 2px rgb(0 0 0 / 0.06), 0 6px 20px rgb(0 0 0 / 0.08)',
    );
  });

  it('다크 값은 라이트와 다를 때만 붙인다', () => {
    expect(find('--color-text-primary')?.dark).toBe('var(--color-gray-50)');
    expect(find('--color-bg-accent')?.dark).toBeUndefined();
  });

  it('@media screen 안 다크 블록은 다크 값으로 읽는다 (조건부 값이 아니다)', () => {
    const screenDark = parseTokens(`
/* ---------- Semantic ---------- */
:root {
  --color-text-primary: var(--color-gray-900);
}

@media screen {
  [data-theme='dark'] {
    --color-text-primary: var(--color-gray-50);
  }
}
`);
    const token = screenDark[0]?.tokens[0];
    expect(token?.dark).toBe('var(--color-gray-50)');
    expect(token?.overrides).toEqual([]);
  });

  it('@media 안 값은 조건부 값으로 붙인다', () => {
    expect(find('--layout-peek')?.overrides).toEqual([
      { condition: '(pointer: coarse)', value: '12px' },
    ]);
  });

  it('실제 tokens.css의 모든 토큰을 빠짐없이 읽는다', () => {
    const css = readFileSync(
      path.resolve(__dirname, '../../styles/tokens.css'),
      'utf8',
    );
    const names = new Set(css.match(/--[\w-]+(?=\s*:)/g));
    const parsed = parseTokens(css).flatMap((group) => group.tokens);
    expect(parsed.map((token) => token.name).sort()).toEqual([...names].sort());
    // 다크 블록·@media 블록도 읽힌다
    expect(parsed.some((token) => token.dark)).toBe(true);
    expect(parsed.some((token) => token.overrides.length > 0)).toBe(true);
  });
});

describe('tokenKind', () => {
  it('접두사로 종류를 정한다', () => {
    expect(tokenKind('--color-text-primary')).toBe('color-text');
    expect(tokenKind('--color-bg-dim')).toBe('color-bg');
    expect(tokenKind('--color-gray-500')).toBe('color');
    expect(tokenKind('--spacing-16')).toBe('spacing');
    expect(tokenKind('--layout-page-max')).toBe('size');
    expect(tokenKind('--z-toast')).toBe('z-index');
  });

  it('모션 토큰은 접미사로 정한다', () => {
    expect(tokenKind('--motion-dialog-duration')).toBe('duration');
    expect(tokenKind('--motion-sheet-ease')).toBe('ease');
    expect(tokenKind('--motion-press-scale')).toBe('other');
  });
});
