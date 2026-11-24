/**
 * tokens.css를 읽어 디자인 시스템 문서(/dev/design-system)가 보여 줄 토큰 목록을 만든다.
 * 문서와 코드가 어긋나지 않도록 값을 손으로 옮기지 않고 이 파서로 읽는다.
 *
 * 파일 형식 (src/styles/tokens.css):
 *   /* ---------- 그룹 제목 ---------- *\/   ← 다음 블록의 그룹
 *   :root { --name: value; /* 꼬리 주석 *\/ }
 *   [data-theme='dark'] { --name: value; }   ← 같은 이름 토큰의 다크 값
 *   @media (조건) { :root { --name: value; } } ← 같은 이름 토큰의 조건부 값
 */

export interface TokenOverride {
  /** @media 조건. 예: (pointer: coarse) */
  condition: string;
  value: string;
}

export interface DesignToken {
  /** --를 뺀 이름이 아니라 --를 포함한 그대로 */
  name: string;
  /** 기본(:root) 값 */
  light: string;
  /** [data-theme='dark'] 값 (다르게 정의된 경우만) */
  dark?: string;
  overrides: TokenOverride[];
  /** 선언 뒤 같은 줄 주석 */
  note?: string;
}

export interface DesignTokenGroup {
  title: string;
  tokens: DesignToken[];
}

const GROUP_TITLE = /^-{3,}\s*(.+?)\s*-{3,}$/;
const DARK_SELECTOR = /data-theme=['"]?dark/;

interface Declaration {
  name: string;
  value: string;
  note?: string;
}

/** 여러 줄 값의 공백을 한 칸으로 줄이고 괄호 안쪽 공백을 없앤다 */
function normalizeValue(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim();
}

/** 블록 안 텍스트를 선언 목록으로 (괄호 안 ;는 나누지 않는다, 주석은 같은 줄이면 앞 선언의 note) */
function parseDeclarations(body: string): Declaration[] {
  const declarations: Declaration[] = [];
  let buffer = '';
  let depth = 0;
  let index = 0;

  const flush = () => {
    const text = buffer.trim();
    buffer = '';
    const match = /^(--[\w-]+)\s*:([\s\S]*)$/.exec(text);
    if (match?.[1] && match[2] !== undefined) {
      declarations.push({ name: match[1], value: normalizeValue(match[2]) });
    }
  };

  while (index < body.length) {
    if (body.startsWith('/*', index)) {
      const end = body.indexOf('*/', index + 2);
      const close = end === -1 ? body.length : end;
      const comment = body.slice(index + 2, close).trim();
      // 선언이 끝난 뒤 줄바꿈 없이 이어진 주석이면 그 선언의 설명
      const last = declarations.at(-1);
      if (last && buffer.trim() === '' && !buffer.includes('\n')) {
        last.note = comment;
      }
      index = close + 2;
      continue;
    }
    const char = body[index] ?? '';
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === ';' && depth === 0) {
      flush();
    } else {
      buffer += char;
    }
    index += 1;
  }
  flush();
  return declarations;
}

interface Block {
  selector: string;
  body: string;
  /** 블록 바로 앞 그룹 제목 주석 */
  title?: string;
}

/** 최상위 블록과 그 앞 그룹 제목을 나눈다 (@media 안 블록은 body에 그대로 남는다) */
function splitBlocks(css: string): Block[] {
  const blocks: Block[] = [];
  let index = 0;
  let selector = '';
  let title: string | undefined;

  while (index < css.length) {
    if (css.startsWith('/*', index)) {
      const end = css.indexOf('*/', index + 2);
      const close = end === -1 ? css.length : end;
      const text = css
        .slice(index + 2, close)
        .replace(/^\s*\*/gm, '')
        .trim();
      const match = GROUP_TITLE.exec(text);
      if (match?.[1]) title = match[1];
      index = close + 2;
      continue;
    }
    const char = css[index] ?? '';
    if (char !== '{') {
      selector += char;
      index += 1;
      continue;
    }
    // 짝이 맞는 닫는 괄호까지 (주석 안 괄호는 건너뛴다)
    let depth = 1;
    let cursor = index + 1;
    while (cursor < css.length && depth > 0) {
      if (css.startsWith('/*', cursor)) {
        const end = css.indexOf('*/', cursor + 2);
        cursor = end === -1 ? css.length : end + 2;
        continue;
      }
      if (css[cursor] === '{') depth += 1;
      if (css[cursor] === '}') depth -= 1;
      cursor += 1;
    }
    blocks.push({
      selector: selector.trim(),
      body: css.slice(index + 1, cursor - 1),
      title,
    });
    selector = '';
    index = cursor;
  }
  return blocks;
}

export function parseTokens(css: string): DesignTokenGroup[] {
  const groups: DesignTokenGroup[] = [];
  const byName = new Map<string, DesignToken>();
  const pendingDark: Declaration[] = [];
  const pendingOverrides: { condition: string; declaration: Declaration }[] =
    [];

  for (const block of splitBlocks(css)) {
    if (block.selector.startsWith('@media')) {
      const condition = block.selector.replace(/^@media\s*/, '');
      for (const inner of splitBlocks(block.body)) {
        for (const declaration of parseDeclarations(inner.body)) {
          pendingOverrides.push({ condition, declaration });
        }
      }
      continue;
    }
    if (DARK_SELECTOR.test(block.selector)) {
      pendingDark.push(...parseDeclarations(block.body));
      continue;
    }

    const title = block.title ?? '기타';
    let group = groups.find((item) => item.title === title);
    if (!group) {
      group = { title, tokens: [] };
      groups.push(group);
    }
    for (const declaration of parseDeclarations(block.body)) {
      const token: DesignToken = {
        name: declaration.name,
        light: declaration.value,
        overrides: [],
        ...(declaration.note ? { note: declaration.note } : {}),
      };
      group.tokens.push(token);
      byName.set(token.name, token);
    }
  }

  for (const declaration of pendingDark) {
    const token = byName.get(declaration.name);
    if (token && token.light !== declaration.value) {
      token.dark = declaration.value;
    }
  }
  for (const { condition, declaration } of pendingOverrides) {
    byName
      .get(declaration.name)
      ?.overrides.push({ condition, value: declaration.value });
  }

  return groups;
}

export type TokenKind =
  | 'color-text'
  | 'color-bg'
  | 'color-border'
  | 'color'
  | 'gradient'
  | 'shadow'
  | 'spacing'
  | 'radius'
  | 'border-width'
  | 'font-family'
  | 'font-size'
  | 'font-weight'
  | 'line-height'
  | 'letter-spacing'
  | 'duration'
  | 'ease'
  | 'z-index'
  | 'size'
  | 'other';

const KIND_PREFIXES: [string, TokenKind][] = [
  ['--color-text-', 'color-text'],
  ['--color-bg-', 'color-bg'],
  ['--color-border-', 'color-border'],
  ['--color-', 'color'],
  ['--gradient-', 'gradient'],
  ['--shadow-', 'shadow'],
  ['--spacing-', 'spacing'],
  ['--radius-', 'radius'],
  ['--border-width-', 'border-width'],
  ['--font-family-', 'font-family'],
  ['--font-size-', 'font-size'],
  ['--font-weight-', 'font-weight'],
  ['--line-height-', 'line-height'],
  ['--letter-spacing-', 'letter-spacing'],
  ['--duration-', 'duration'],
  ['--ease-', 'ease'],
  ['--z-', 'z-index'],
  ['--size-', 'size'],
  ['--layout-', 'size'],
];

/** 토큰 이름으로 미리보기 종류를 정한다 (모션 애니메이션별 토큰은 접미사로) */
export function tokenKind(name: string): TokenKind {
  if (name.startsWith('--motion-')) {
    if (name.endsWith('-duration')) return 'duration';
    if (name.endsWith('-ease')) return 'ease';
    return 'other';
  }
  return (
    KIND_PREFIXES.find(([prefix]) => name.startsWith(prefix))?.[1] ?? 'other'
  );
}
