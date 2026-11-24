'use client';

import { Tab, TabList, TabPanel, Tabs } from '@/components/ui/Tabs';

const MANY = ['전체', '회사', '사이드', '부트캠프', '오픈소스', '글쓰기'];

export function TabsDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-32)' }}>
      <Tabs defaultValue="overview">
        <TabList aria-label="프로젝트 정보">
          <Tab value="overview">개요</Tab>
          <Tab value="stack">기술</Tab>
          <Tab value="retro">회고</Tab>
        </TabList>
        <TabPanel value="overview">←·→로 탭을 옮기면 바로 선택돼요.</TabPanel>
        <TabPanel value="stack">Home·End로 처음·끝 탭으로 가요.</TabPanel>
        <TabPanel value="retro">선택된 탭만 Tab 순서에 들어가요.</TabPanel>
      </Tabs>

      <Tabs defaultValue={MANY[0]}>
        <TabList aria-label="분류 (탭 6개, 좁으면 가로로 밀기)">
          {MANY.map((name) => (
            <Tab key={name} value={name}>
              {name}
            </Tab>
          ))}
        </TabList>
        {MANY.map((name) => (
          <TabPanel key={name} value={name}>
            {name} 패널
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
