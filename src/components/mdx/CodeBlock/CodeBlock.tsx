import type { ComponentPropsWithoutRef } from 'react';

import styles from './CodeBlock.module.css';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'>;

/**
 * MDX 코드 블록(pre). 하이라이팅은 빌드 타임 Shiki(rehype-pretty-code)가 끝낸 정적 HTML이다.
 * 가로로 넘치면 블록 안에서만 스크롤되고, 키보드로도 스크롤할 수 있게 포커스를 받는다.
 */
export function CodeBlock({ className, ...props }: CodeBlockProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    // 가로로 스크롤되는 영역은 키보드로도 스크롤할 수 있어야 한다 (WCAG 2.1.1)
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <pre className={rootClassName} tabIndex={0} {...props} />
  );
}
