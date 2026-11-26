import { createContext, use } from 'react';

/** Tabs와 그 조각(TabList · Tab · TabPanel)이 함께 쓰는 선택 상태 */
export interface TabsContextValue {
  value: string;
  select: (value: string) => void;
  idFor: (kind: 'tab' | 'panel', value: string) => string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(component: string): TabsContextValue {
  const context = use(TabsContext);
  if (!context) throw new Error(`${component}는 <Tabs> 안에서 써야 해요`);
  return context;
}
