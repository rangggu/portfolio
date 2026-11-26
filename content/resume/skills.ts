import type { Skill } from '@/lib/resume/types';

/** 분류 안 순서가 화면 순서다 */
export const skills: readonly Skill[] = [
  // 언어·프레임워크
  { name: 'TypeScript', category: 'language-framework' },
  { name: 'React', category: 'language-framework' },
  { name: 'Next.js', category: 'language-framework' },
  { name: 'React Native', category: 'language-framework' },
  { name: 'Electron', category: 'language-framework' },

  // UI·스타일링
  { name: 'CSS Modules', category: 'ui-styling' },
  { name: 'styled-components', category: 'ui-styling' },
  { name: 'Tailwind CSS', category: 'ui-styling' },
  { name: 'SCSS', category: 'ui-styling' },
  { name: 'Emotion', category: 'ui-styling' },
  { name: 'Storybook', category: 'ui-styling' },
  { name: 'Tiptap', category: 'ui-styling' },

  // 데이터·상태
  { name: 'TanStack Query', category: 'data-state' },
  { name: 'Recoil', category: 'data-state' },
  { name: 'React Hook Form', category: 'data-state' },
  { name: 'Axios', category: 'data-state' },
  { name: 'WebSocket (STOMP)', category: 'data-state' },
  { name: 'next-intl', category: 'data-state' },

  // 테스트·품질
  { name: 'Jest', category: 'testing-quality' },
  { name: 'Testing Library', category: 'testing-quality' },
  { name: 'Vitest', category: 'testing-quality' },
  { name: 'Playwright', category: 'testing-quality' },
  { name: 'MSW', category: 'testing-quality' },
  { name: 'Lighthouse CI', category: 'testing-quality' },
  { name: 'Stylelint', category: 'testing-quality' },

  // 빌드·배포
  { name: 'GitHub Actions', category: 'build-deploy' },
  { name: 'Docker', category: 'build-deploy' },
  { name: 'AWS (Amplify · Lambda)', category: 'build-deploy' },
  { name: 'Vercel', category: 'build-deploy' },

  // 분석
  { name: 'GA4', category: 'analytics' },
  { name: 'Microsoft Clarity', category: 'analytics' },

  // 협업
  { name: 'Git · GitHub', category: 'collaboration' },
  { name: 'Jira', category: 'collaboration' },
  { name: 'Slack', category: 'collaboration' },
  { name: 'Notion', category: 'collaboration' },
  { name: 'Figma', category: 'collaboration' },

  // AI
  { name: 'Claude Code', category: 'ai' },
  { name: 'MCP (Figma · Jira · Slack · Notion)', category: 'ai' },
  { name: 'Claude API', category: 'ai' },
];
