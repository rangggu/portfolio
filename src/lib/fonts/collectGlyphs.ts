import ts from 'typescript';

/**
 * 폰트 서브셋에 넣을 글자 모으기 (docs/conventions/design-tokens.md 「폰트 서브셋」).
 * 사이트에 쓰는 Pretendard는 화면에 나올 수 있는 글자만 남긴 서브셋이라,
 * 소스에서 그 글자를 모으는 규칙을 스크립트(yarn fonts)와 누락 테스트가 함께 쓴다.
 */

/** 화면 글자가 될 수 있는 문법 요소: 문자열·템플릿 조각·JSX 텍스트 (주석·식별자는 빼서 글자 수가 늘지 않게 한다) */
function isTextNode(node: ts.Node): node is ts.LiteralLikeNode {
  return (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateHead(node) ||
    ts.isTemplateMiddle(node) ||
    ts.isTemplateTail(node) ||
    ts.isJsxText(node)
  );
}

/** TS·TSX 소스에서 화면에 나올 수 있는 문자열을 이어 붙인다 */
export function textFromScript(source: string, fileName: string): string {
  const kind = fileName.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const file = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    false,
    kind,
  );
  const parts: string[] = [];
  const visit = (node: ts.Node) => {
    if (isTextNode(node)) parts.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return parts.join('\n');
}

/** MDX는 본문과 frontmatter(제목·요약)가 모두 화면에 나오므로 원문을 그대로 쓴다 */
export function textFromMdx(source: string): string {
  return source;
}

/** 공백·제어 문자를 뺀 고유 글자, 코드 포인트 순 */
export function toGlyphs(text: string): string[] {
  const glyphs = new Set<string>();
  for (const char of text) {
    if (/[\s\p{Cc}\p{Cf}]/u.test(char)) continue;
    glyphs.add(char);
  }
  return [...glyphs].sort(
    (a, b) => (a.codePointAt(0) ?? 0) - (b.codePointAt(0) ?? 0),
  );
}

/** required 중 available에 없는 글자 */
export function missingGlyphs(
  required: readonly string[],
  available: Iterable<string>,
): string[] {
  const set = new Set(available);
  return required.filter((glyph) => !set.has(glyph));
}
