import type { Skill } from '@/lib/resume/types';

import type { TimelineId } from './timeline';

/** firstUsedIn은 timeline.ts의 id만 쓸 수 있다 (오타는 typecheck에서 잡힌다) */
export const skills: readonly Skill<TimelineId>[] = [
  // TODO: 기술 목록 (분류: language-framework, styling, data-state, testing-quality, collaboration-tooling)
];
