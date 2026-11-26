import type { ComponentPropsWithoutRef, Ref } from 'react';
import styles from './IconButton.module.css';

interface IconLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  'aria-label': string;
  variant?: 'ghost' | 'surface';
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * IconButton과 같은 모양의 링크 (네이티브 <a>). 다른 페이지로 가는 아이콘에 쓴다.
 * next/link를 거치지 않으므로 항상 전체 페이지 이동이다.
 */
export function IconLink({
  variant = 'ghost',
  className,
  children,
  ...props
}: IconLinkProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <a className={rootClassName} data-variant={variant} {...props}>
      {children}
    </a>
  );
}
