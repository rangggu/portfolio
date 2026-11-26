'use client';

import type { HTMLAttributes, Ref } from 'react';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.css';

/** 탭 하나: 선택된 탭만 Tab 순서에 들어간다 */
interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Tab({ value, className, onClick, ...props }: TabProps) {
  const context = useTabsContext('Tab');
  const isSelected = context.value === value;
  const rootClassName = className ? `${styles.tab} ${className}` : styles.tab;

  return (
    <button
      type="button"
      role="tab"
      id={context.idFor('tab', value)}
      aria-controls={context.idFor('panel', value)}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      data-value={value}
      className={rootClassName}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.select(value);
      }}
      {...props}
    />
  );
}
