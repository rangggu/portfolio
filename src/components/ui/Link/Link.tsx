import type { ComponentPropsWithoutRef, Ref } from 'react';
import NextLink from 'next/link';
import { resolveLinkAttributes } from '@/lib/link/linkAttributes';
import styles from './Link.module.css';

interface LinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
}

export function Link({
  href,
  rel,
  target,
  className,
  children,
  ...props
}: LinkProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const linkAttributes = resolveLinkAttributes(href, { rel, target });

  return (
    <NextLink
      href={href}
      className={rootClassName}
      {...props}
      {...linkAttributes}
    >
      {children}
    </NextLink>
  );
}
