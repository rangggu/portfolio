import type { ComponentPropsWithoutRef, Ref } from 'react';
import styles from './Icon.module.css';

interface IconProps extends ComponentPropsWithoutRef<'span'> {
  /** fill·stroke에 currentColor를 쓰는 SVG */
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** 의미 있는 아이콘이면 대체 텍스트. 생략하면 장식으로 보고 숨긴다 */
  label?: string;
  ref?: Ref<HTMLSpanElement>;
}

export function Icon({ size = 'md', label, className, ...props }: IconProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const a11yProps = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <span
      className={rootClassName}
      data-size={size}
      {...a11yProps}
      {...props}
    />
  );
}
