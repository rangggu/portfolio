'use client';

import type { HTMLAttributes, KeyboardEvent } from 'react';
import { nextTabIndex } from '@/lib/ui/tabsKeyboard';
import { useTabsContext } from './TabsContext';
import styles from './Tabs.module.css';

/** 탭 목록: ←·→·Home·End로 탭 사이를 옮기며 바로 선택한다 */
interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** 탭 목록의 이름 (보조기기용). 보이는 제목이 있으면 aria-labelledby를 쓴다 */
  'aria-label'?: string;
}

export function TabList({ className, onKeyDown, ...props }: TabListProps) {
  const { select } = useTabsContext('TabList');
  const rootClassName = className ? `${styles.list} ${className}` : styles.list;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    );
    const current = tabs.findIndex((tab) => tab === document.activeElement);
    if (current === -1) return;
    const next = nextTabIndex(event.key, current, tabs.length);
    const target = next === undefined ? undefined : tabs[next];
    if (!target) return;
    event.preventDefault();
    target.focus();
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    select(target.dataset.value ?? '');
  };

  return (
    // 탭 목록은 포커스를 받지 않고, 안의 탭 사이를 화살표로 옮긴다 (WAI-ARIA Tabs). 키 입력은 목록에서 받는다
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={rootClassName}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}
