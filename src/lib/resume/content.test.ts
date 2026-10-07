import { describe, expect, it } from 'vitest';

import { getAllProjectMeta } from '@/lib/content/projects';

import { rawResume } from '../../../content/resume';

import { RESUME, TIMELINE_IDS } from './index';

/** 실제 content/ 데이터 검사: 빌드 전에 Vitest에서도 같은 규칙으로 잡는다 */
describe('content/resume 실제 데이터', () => {
  it('검증을 통과한다', () => {
    expect(RESUME).toBe(rawResume);
  });

  it('모든 프로젝트 글(초안 포함)의 timelineId가 타임라인에 있다', async () => {
    const metas = await getAllProjectMeta({ includeDrafts: true });
    for (const meta of metas)
      expect(TIMELINE_IDS.has(meta.timelineId)).toBe(true);
  });
});
