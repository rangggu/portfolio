import type { ComponentPropsWithoutRef } from 'react';

import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import {
  MarginNote,
  MarginNoteAnchor,
  MarginNoteGroup,
} from '@/components/ui/MarginNote';

import { CodeBlock } from './CodeBlock';

/**
 * MDX 요소 → 컴포넌트 매핑. 글 안의 JSX 컴포넌트도 여기 등록한 이름으로만 쓸 수 있다.
 * 문서 제목(h1)은 페이지가 그리므로 본문은 h2부터 쓴다.
 * TODO: Phase 2에서 Figure, Callout 등 추가
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <Heading level={2} variant="headingMd" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <Heading level={3} variant="headingSm" {...props} />
  ),
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => (
    <Link href={href} {...props} />
  ),
  pre: CodeBlock,
  MarginNoteGroup,
  MarginNoteAnchor,
  MarginNote,
};
