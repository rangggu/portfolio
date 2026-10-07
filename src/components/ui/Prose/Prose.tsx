import type { ComponentPropsWithoutRef } from 'react';

import styles from './Prose.module.css';

type ProseProps = ComponentPropsWithoutRef<'div'>;

/**
 * 긴 글 레이아웃. 본문 폭(--layout-prose-max)과 문단 간격을 정하고,
 * 넓은 프레임(컨테이너 ≥ 832px)에서는 여백 메모 열을 비워 둬 MarginNoteGroup과 본문 열을 맞춘다.
 */
export function Prose({ className, ...props }: ProseProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return <div className={rootClassName} {...props} />;
}
