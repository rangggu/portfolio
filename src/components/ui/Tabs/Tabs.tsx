'use client';

import { useId, useState, type HTMLAttributes } from 'react';
import { TabsContext, type TabsContextValue } from './TabsContext';
import styles from './Tabs.module.css';

/**
 * 탭 (WAI-ARIA Authoring Practices 「Tabs」, 자동 활성).
 * <Tabs defaultValue> · <TabList aria-label> · <Tab value> · <TabPanel value>로 조합한다 (조각은 같은 폴더의 TabList.tsx · Tab.tsx · TabPanel.tsx).
 * - 선택된 탭만 Tab 순서에 들어가고, ←·→·Home·End로 탭 사이를 옮기면 바로 선택된다
 * - 탭과 패널은 aria-controls·aria-labelledby로 서로 연결된다
 */

/** 값을 id에 쓸 수 있는 문자로 바꾼다 (한글·공백 포함 값도 안전하게) */
function toIdPart(value: string): string {
  return Array.from(value, (char) =>
    (char.codePointAt(0) ?? 0).toString(36),
  ).join('-');
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** 처음 선택된 탭 (비제어) */
  defaultValue?: string;
  /** 선택된 탭 (제어). onValueChange와 함께 쓴다 */
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const baseId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  const select = (next: string) => {
    if (controlledValue === undefined) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  const context: TabsContextValue = {
    value,
    select,
    idFor: (kind, tabValue) => `${baseId}-${kind}-${toIdPart(tabValue)}`,
  };

  return (
    <TabsContext value={context}>
      <div className={rootClassName} {...props} />
    </TabsContext>
  );
}
