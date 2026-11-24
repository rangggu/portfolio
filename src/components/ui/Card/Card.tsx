import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

type CardElement = 'div' | 'article' | 'li';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: CardElement;
}

/** 목록 항목 상자. 카드 전체가 링크면 CardLink를 쓴다 */
export function Card({ as: Element = 'div', className, ...props }: CardProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return <Element className={rootClassName} {...props} />;
}
