import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DURATION, EASE } from './tokens';

function readTokensCSS(): string {
  return readFileSync(resolve(__dirname, '../../styles/tokens.css'), 'utf-8');
}

describe('motion tokens 동기화', () => {
  const css = readTokensCSS();

  it('duration 값이 tokens.css와 일치한다', () => {
    expect(css).toContain(`--duration-instant: ${DURATION.instant}ms`);
    expect(css).toContain(`--duration-fast: ${DURATION.fast}ms`);
    expect(css).toContain(`--duration-normal: ${DURATION.normal}ms`);
    expect(css).toContain(`--duration-slow: ${DURATION.slow}ms`);
    expect(css).toContain(`--duration-slower: ${DURATION.slower}ms`);
  });

  it('cubic-bezier easing 값이 tokens.css와 일치한다', () => {
    expect(css).toContain(`--ease-standard: ${EASE.standard}`);
    expect(css).toContain(`--ease-out: ${EASE.out}`);
    expect(css).toContain(`--ease-in: ${EASE.in}`);
  });
});
