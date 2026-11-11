import type { ComponentPropsWithoutRef, Ref } from 'react';
import NextLink from 'next/link';
import { resolveLinkAttributes } from '@/lib/link/linkAttributes';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Button.module.css';

interface ButtonLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  ref?: Ref<HTMLAnchorElement>;
}

/** Button과 같은 모양의 링크. 이동하는 동작이면 Button 대신 이것을 쓴다 */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  rel,
  target,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const sizeClass = size === 'sm' ? styles.sizeSm : styles.sizeMd;
  const rootClassName = className ? `${sizeClass} ${className}` : sizeClass;
  const linkAttributes = resolveLinkAttributes(href, { rel, target });
  const opensNewTab = linkAttributes.target === '_blank';

  return (
    <NextLink
      href={href}
      className={rootClassName}
      data-variant={variant}
      data-size={size}
      {...props}
      {...linkAttributes}
    >
      {children}
      {opensNewTab && <VisuallyHidden> (새 탭에서 열림)</VisuallyHidden>}
    </NextLink>
  );
}
