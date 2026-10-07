/**
 * MDX 본문을 평문으로 바꾼다 (Phase 4 AI 지식용).
 * 텍스트·코드는 남기고, JSX 컴포넌트(여백 메모 등)는 감싼 내용만 남긴다. import/export, 식(expression)은 버린다.
 */
interface MdastNode {
  type: string;
  value?: string;
  children?: MdastNode[];
}

const DROP = new Set([
  'mdxjsEsm',
  'mdxFlowExpression',
  'mdxTextExpression',
  'html',
  'yaml',
]);

const BLOCK = new Set([
  'paragraph',
  'heading',
  'code',
  'blockquote',
  'listItem',
  'table',
  'tableRow',
  'thematicBreak',
  'mdxJsxFlowElement',
]);

function collect(node: MdastNode, blocks: string[], buffer: string[]) {
  if (DROP.has(node.type)) return;

  if (node.type === 'text' || node.type === 'inlineCode') {
    buffer.push(node.value ?? '');
    return;
  }
  if (node.type === 'break') {
    buffer.push('\n');
    return;
  }

  const isBlock = BLOCK.has(node.type);
  if (isBlock) flush(blocks, buffer);

  if (node.type === 'code') {
    blocks.push(node.value ?? '');
    return;
  }

  for (const child of node.children ?? []) collect(child, blocks, buffer);
  if (isBlock) flush(blocks, buffer);
}

function flush(blocks: string[], buffer: string[]) {
  const text = buffer
    .join('')
    .replace(/[ \t]+/g, ' ')
    .trim();
  buffer.length = 0;
  if (text) blocks.push(text);
}

export function mdastToPlainText(root: MdastNode): string {
  const blocks: string[] = [];
  const buffer: string[] = [];
  collect(root, blocks, buffer);
  flush(blocks, buffer);
  return blocks.join('\n\n');
}
