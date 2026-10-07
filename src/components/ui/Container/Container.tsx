import type { ElementType, HTMLAttributes } from 'react';
import styles from './Container.module.css';

type ContainerElement =
  'div' | 'main' | 'section' | 'article' | 'header' | 'footer';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  /** page: 여백 포함 최대 --layout-page-max / prose: 본문 최대 --layout-prose-max + 여백 */
  width?: 'page' | 'prose';
}

export function Container({
  as = 'div',
  width = 'page',
  className,
  ...props
}: ContainerProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  const Component: ElementType = as;

  return <Component className={rootClassName} data-width={width} {...props} />;
}
