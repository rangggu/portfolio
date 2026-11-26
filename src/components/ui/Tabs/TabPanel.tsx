'use client';

import type { HTMLAttributes } from 'react';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.css';

/** 탭 패널: 선택된 탭의 패널만 보인다 */
interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabPanel({ value, className, ...props }: TabPanelProps) {
  const context = useTabsContext('TabPanel');
  const isSelected = context.value === value;
  const rootClassName = className
    ? `${styles.panel} ${className}`
    : styles.panel;

  return (
    <div
      role="tabpanel"
      id={context.idFor('panel', value)}
      aria-labelledby={context.idFor('tab', value)}
      // 패널 안에 포커스할 요소가 없어도 Tab으로 패널에 닿게 한다 (WAI-ARIA Tabs 권장)
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      hidden={!isSelected}
      className={rootClassName}
      {...props}
    />
  );
}
