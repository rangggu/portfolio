import type { ElementType, HTMLAttributes } from 'react';
import styles from './Stack.module.css';

/** --spacing-{px} 토큰 이름 */
type SpacingToken =
  | '0'
  | '2'
  | '4'
  | '6'
  | '8'
  | '12'
  | '16'
  | '20'
  | '24'
  | '32'
  | '40'
  | '48'
  | '64'
  | '80'
  | '120';

type StackElement = 'div' | 'ul' | 'ol' | 'header' | 'footer' | 'nav';

interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: StackElement;
  direction?: 'column' | 'row';
  gap?: SpacingToken;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
  /** 가장 가까운 컨테이너(Container 등)의 폭이 이 값(px) 이상이면 row로 바뀐다 */
  rowFrom?: 480 | 768 | 832;
}

export function Stack({
  as = 'div',
  direction = 'column',
  gap = '0',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  rowFrom,
  className,
  ...props
}: StackProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  const Component: ElementType = as;

  return (
    <Component
      className={rootClassName}
      data-direction={direction}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap || undefined}
      data-row-from={rowFrom}
      {...props}
    />
  );
}
