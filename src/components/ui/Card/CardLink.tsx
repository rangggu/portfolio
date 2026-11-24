import type { ComponentPropsWithoutRef, Ref } from 'react';
import NextLink from 'next/link';
import { resolveLinkAttributes } from '@/lib/link/linkAttributes';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Card.module.css';

interface CardLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * 카드 전체가 링크인 카드. 안에 다른 링크·버튼을 넣지 않는다 (링크 안의 상호작용 요소는 접근성 오류).
 * 링크 이름이 길어지지 않도록 내용은 제목과 짧은 설명 정도로 둔다.
 */
export function CardLink({
  href,
  rel,
  target,
  className,
  children,
  ...props
}: CardLinkProps) {
  const rootClassName = className
    ? `${styles.root} ${styles.link} ${className}`
    : `${styles.root} ${styles.link}`;
  const linkAttributes = resolveLinkAttributes(href, { rel, target });
  const opensNewTab = linkAttributes.target === '_blank';

  return (
    <NextLink
      href={href}
      className={rootClassName}
      {...props}
      {...linkAttributes}
    >
      {children}
      {opensNewTab && <VisuallyHidden> (새 탭에서 열림)</VisuallyHidden>}
    </NextLink>
  );
}
