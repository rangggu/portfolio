import {
  getAllProjectMeta,
  type ContentOptions,
  type ProjectMeta,
} from '@/lib/content/projects';

import { RESUME } from './index';
import type { TimelineItem } from './types';

export interface TimelineEntry {
  item: TimelineItem;
  /** 이 항목에 연결된 프로젝트 글 (글 frontmatter의 timelineId 기준). 프로덕션에서는 초안이 빠진다 */
  projects: ProjectMeta[];
}

/** 경력 타임라인 + 항목별 프로젝트 글. 한 항목에 글이 여러 개 연결될 수 있다 */
export async function getTimelineEntries(
  options: ContentOptions & { timeline?: readonly TimelineItem[] } = {},
): Promise<TimelineEntry[]> {
  const { timeline = RESUME.timeline, ...contentOptions } = options;
  const projects = await getAllProjectMeta(contentOptions);
  return timeline.map((item) => ({
    item,
    projects: projects.filter((project) => project.timelineId === item.id),
  }));
}
