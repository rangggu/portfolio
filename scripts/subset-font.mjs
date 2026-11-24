/**
 * 사이트에 쓰는 글자만 남긴 Pretendard 서브셋을 만든다 (docs/conventions/design-tokens.md 「폰트 서브셋」).
 * 이력서 데이터·프로젝트 글·UI 문자열에서 글자를 모아, 원본 가변 폰트에서 그 글자와 굵기 400~700만 남긴다.
 * 결과 woff2와 글자 목록을 커밋한다. 목록에 없는 글자가 내용에 생기면 Vitest(subsetCoverage)가 알려 준다.
 *
 * 사용법: yarn fonts
 */
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import subsetFont from 'subset-font';
import {
  textFromMdx,
  textFromScript,
  toGlyphs,
} from '../src/lib/fonts/collectGlyphs.ts';
import {
  ALWAYS_INCLUDED_TEXT,
  GLYPH_SOURCE_EXCLUDE,
  GLYPH_SOURCE_PATTERNS,
  SUBSET_FONT_PATH,
  SUBSET_GLYPHS_PATH,
} from '../src/lib/fonts/glyphSources.ts';

const SOURCE_FONT =
  'node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2';

/** 굵기 토큰(--font-weight-*) 범위 */
const WEIGHT_RANGE = { min: 400, max: 700 };

const files = (patterns) =>
  patterns
    .flatMap((pattern) => globSync(pattern))
    .filter((file) => !GLYPH_SOURCE_EXCLUDE.test(file))
    .sort();

const text = [
  ALWAYS_INCLUDED_TEXT,
  ...files(GLYPH_SOURCE_PATTERNS.script).map((file) =>
    textFromScript(readFileSync(file, 'utf8'), file),
  ),
  ...files(GLYPH_SOURCE_PATTERNS.mdx).map((file) =>
    textFromMdx(readFileSync(file, 'utf8')),
  ),
].join('\n');

const glyphs = toGlyphs(text);
const subset = await subsetFont(readFileSync(SOURCE_FONT), glyphs.join(''), {
  targetFormat: 'woff2',
  variationAxes: { wght: WEIGHT_RANGE },
  // 대체 글리프(GSUB: 숫자 모양·스타일 세트 등)는 쓰지 않는다. tabular-nums는 고정폭 시스템 폰트(mono)에만 쓴다.
  // 한글은 완성형 글자라 대체 글리프 없이 그대로 그려진다. 켜면 69KB → 끄면 53KB
  noLayoutClosure: true,
});

writeFileSync(SUBSET_FONT_PATH, subset);
writeFileSync(SUBSET_GLYPHS_PATH, `${glyphs.join('')}\n`);

const hangul = glyphs.filter((glyph) => /\p{Script=Hangul}/u.test(glyph));
console.log(
  `글자 ${glyphs.length}개 (한글 ${hangul.length}개) → ${SUBSET_FONT_PATH} ${(subset.length / 1024).toFixed(1)}KB`,
);
