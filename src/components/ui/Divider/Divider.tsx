import type { HTMLAttributes } from 'react';
import styles from './Divider.module.css';

interface DividerProps extends HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  /** 내용을 나누는 의미가 없는 장식 선이면 보조기기에서 숨긴다 */
  decorative?: boolean;
}

/** 구분선. 가로는 <hr>, 세로는 role="separator" */
export function Divider({
  orientation = 'horizontal',
  decorative = false,
  className,
  ...props
}: DividerProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;
  const a11yProps = decorative
    ? { 'aria-hidden': true as const }
    : orientation === 'vertical'
      ? { role: 'separator' as const, 'aria-orientation': 'vertical' as const }
      : {};

  if (orientation === 'horizontal') {
    return (
      <hr
        className={rootClassName}
        data-orientation={orientation}
        {...a11yProps}
        {...props}
      />
    );
  }

  return (
    <div
      className={rootClassName}
      data-orientation={orientation}
      {...a11yProps}
      {...props}
    />
  );
}
