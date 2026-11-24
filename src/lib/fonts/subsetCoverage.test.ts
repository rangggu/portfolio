import { globSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  missingGlyphs,
  textFromMdx,
  textFromScript,
  toGlyphs,
} from './collectGlyphs';
import {
  ALWAYS_INCLUDED_TEXT,
  GLYPH_SOURCE_EXCLUDE,
  GLYPH_SOURCE_PATTERNS,
  SUBSET_GLYPHS_PATH,
} from './glyphSources';

const ROOT = path.resolve(__dirname, '../../..');

function files(patterns: readonly string[]) {
  return patterns
    .flatMap((pattern) => globSync(pattern, { cwd: ROOT }))
    .filter((file) => !GLYPH_SOURCE_EXCLUDE.test(file));
}

function read(file: string) {
  return readFileSync(path.join(ROOT, file), 'utf8');
}

describe('Pretendard 서브셋', () => {
  it('지금 내용의 글자가 모두 서브셋에 있다 (없으면 yarn fonts로 다시 만든다)', () => {
    const text = [
      ALWAYS_INCLUDED_TEXT,
      ...files(GLYPH_SOURCE_PATTERNS.script).map((file) =>
        textFromScript(read(file), file),
      ),
      ...files(GLYPH_SOURCE_PATTERNS.mdx).map((file) =>
        textFromMdx(read(file)),
      ),
    ].join('\n');

    const missing = missingGlyphs(toGlyphs(text), read(SUBSET_GLYPHS_PATH));

    expect(
      missing,
      `서브셋에 없는 글자: ${missing.join('')} — yarn fonts로 다시 만드세요`,
    ).toEqual([]);
  });
});
