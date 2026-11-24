import type { HTMLAttributes } from 'react';
import styles from './Tag.module.css';

type TagElement = 'span' | 'li';

interface TagProps extends HTMLAttributes<HTMLElement> {
  as?: TagElement;
  /** neutral: 일반 분류, accent: 강조할 분류 */
  tone?: 'neutral' | 'accent';
  size?: 'sm' | 'md';
}

/** 짧은 라벨 칩 (프로젝트 태그, 기술 분류, 상태). 누를 수 없는 정적 요소 */
export function Tag({
  as: Element = 'span',
  tone = 'neutral',
  size = 'md',
  className,
  ...props
}: TagProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <Element
      className={rootClassName}
      data-tone={tone}
      data-size={size}
      {...props}
    />
  );
}
