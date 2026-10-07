import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { getTimelineEntries } from './timeline';
import type { CompanyTimelineItem, TimelineItem } from './types';

const FIXTURES = path.join(__dirname, '../content/__fixtures__/projects');

const ALPHA: CompanyTimelineItem = {
  id: 'alpha',
  lane: 'company',
  name: 'A',
  role: 'r',
  period: { start: '2024-01' },
  summary: 's',
  achievements: [],
  links: [],
};

const timeline: TimelineItem[] = [
  ALPHA,
  {
    id: 'beta',
    lane: 'side',
    name: 'B',
    role: 'r',
    period: { start: '2025-01' },
    summary: 's',
    links: [],
  },
  {
    id: 'gamma',
    lane: 'side',
    name: 'G',
    role: 'r',
    period: { start: '2025-05' },
    summary: 's',
    links: [],
  },
];
const timelineIds = new Set(timeline.map((item) => item.id));

describe('getTimelineEntries', () => {
  it('글 frontmatter의 timelineId로 항목별 프로젝트 글을 찾는다', async () => {
    const entries = await getTimelineEntries({
      dir: FIXTURES,
      includeDrafts: true,
      timeline,
      timelineIds,
    });
    expect(
      entries.map((entry) => [
        entry.item.id,
        entry.projects.map((p) => p.slug),
      ]),
    ).toEqual([
      ['alpha', ['alpha']],
      ['beta', ['beta']],
      ['gamma', ['gamma']],
    ]);
  });

  it('초안을 숨기면 초안 글에 연결된 항목은 글 없이(링크 없이) 남는다', async () => {
    const entries = await getTimelineEntries({
      dir: FIXTURES,
      includeDrafts: false,
      timeline,
      timelineIds,
    });
    expect(
      entries.find((entry) => entry.item.id === 'gamma')?.projects,
    ).toEqual([]);
  });

  it('한 항목에 글이 여러 개 연결될 수 있다', async () => {
    const company: TimelineItem[] = [{ ...ALPHA, id: 'company' }];
    const entries = await getTimelineEntries({
      dir: path.join(__dirname, '__fixtures__', 'projects'),
      includeDrafts: true,
      timeline: company,
      timelineIds: new Set(['company']),
    });
    expect(entries[0]?.projects.map((project) => project.slug)).toEqual([
      'second',
      'first',
    ]);
  });
});
