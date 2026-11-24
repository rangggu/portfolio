import type { ComponentPropsWithoutRef, Ref } from 'react';
import NextLink from 'next/link';
import { resolveLinkAttributes } from '@/lib/link/linkAttributes';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Link.module.css';

interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  /** inline: 본문 링크(포인트색, hover 밑줄). plain: 글자색을 물려받고 꾸밈 없음 (메뉴 항목 등) */
  variant?: 'inline' | 'plain';
  ref?: Ref<HTMLAnchorElement>;
}

export function Link({
  href,
  variant = 'inline',
  rel,
  target,
  className,
  children,
  ...props
}: LinkProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const linkAttributes = resolveLinkAttributes(href, { rel, target });
  const opensNewTab = linkAttributes.target === '_blank';

  return (
    <NextLink
      href={href}
      className={rootClassName}
      data-variant={variant}
      {...props}
      {...linkAttributes}
    >
      {children}
      {opensNewTab && <VisuallyHidden> (새 탭에서 열림)</VisuallyHidden>}
    </NextLink>
  );
}
