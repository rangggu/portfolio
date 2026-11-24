'use client';

import {
  createContext,
  use,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type Ref,
} from 'react';
import { nextTabIndex } from '@/lib/ui/tabsKeyboard';
import styles from './Tabs.module.css';

/**
 * 탭 (WAI-ARIA Authoring Practices 「Tabs」, 자동 활성).
 * <Tabs defaultValue> · <TabList aria-label> · <Tab value> · <TabPanel value>로 조합한다.
 * - 선택된 탭만 Tab 순서에 들어가고, ←·→·Home·End로 탭 사이를 옮기면 바로 선택된다
 * - 탭과 패널은 aria-controls·aria-labelledby로 서로 연결된다
 */

interface TabsContextValue {
  value: string;
  select: (value: string) => void;
  idFor: (kind: 'tab' | 'panel', value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = use(TabsContext);
  if (!context) throw new Error(`${component}는 <Tabs> 안에서 써야 해요`);
  return context;
}

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
