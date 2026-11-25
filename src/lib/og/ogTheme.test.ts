import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { parseTokens } from '../design-tokens/parseTokens';
import { OG_COLORS } from './ogTheme';

const tokens = new Map(
  parseTokens(readFileSync('src/styles/tokens.css', 'utf8'))
    .flatMap((group) => group.tokens)
    .map((token) => [token.name, token.light]),
);

/** var(--a) 사슬을 따라 실제 값까지 */
function resolve(name: string): string | undefined {
  const value = tokens.get(name);
  const match = value && /^var\((--[\w-]+)\)$/.exec(value);
  return match?.[1] ? resolve(match[1]) : value;
}

describe('OG_COLORS', () => {
  it.each(Object.entries(OG_COLORS))(
    '%s는 tokens.css의 라이트 값과 같다',
    (name, hex) => {
      expect(resolve(name)?.toLowerCase()).toBe(hex);
    },
  );
});
