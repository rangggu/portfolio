import { describe, expect, it } from 'vitest';

import { parseProjectFrontmatter } from './frontmatter';

const valid = {
  title: '제목',
  summary: '요약',
  period: { start: '2024-03', end: '2024-08' },
  tags: ['React'],
  thumbnail: '/projects/sample/thumbnail.png',
  timelineId: 'sample',
  draft: false,
};

describe('parseProjectFrontmatter', () => {
  it('올바른 frontmatter를 그대로 돌려준다', () => {
    expect(parseProjectFrontmatter(valid, 'sample')).toEqual(valid);
  });

  it('draft를 생략하면 false, true를 주면 true다', () => {
    const { draft: _, ...withoutDraft } = valid;
    expect(parseProjectFrontmatter(withoutDraft, 'sample').draft).toBe(false);
    expect(
      parseProjectFrontmatter({ ...valid, draft: true }, 'sample').draft,
    ).toBe(true);
  });

  it('진행 중이면 period.end를 생략할 수 있다', () => {
    const result = parseProjectFrontmatter(
      { ...valid, period: { start: '2024-03' } },
      'sample',
    );
    expect(result.period).toEqual({ start: '2024-03' });
  });

  it.each([
    ['title 누락', { ...valid, title: undefined }, /title/],
    ['빈 summary', { ...valid, summary: '  ' }, /summary/],
    ['period 형식', { ...valid, period: { start: '2024.03' } }, /period.start/],
    ['없는 달', { ...valid, period: { start: '2024-13' } }, /period.start/],
    [
      'end가 start보다 앞섬',
      { ...valid, period: { start: '2024-08', end: '2024-03' } },
      /앞섭니다/,
    ],
    ['period가 문자열', { ...valid, period: '2024-03' }, /period/],
    ['빈 tags', { ...valid, tags: [] }, /tags/],
    [
      '다른 slug의 thumbnail',
      { ...valid, thumbnail: '/projects/other/thumbnail.png' },
      /thumbnail/,
    ],
    ['timelineId 누락', { ...valid, timelineId: undefined }, /timelineId/],
    ['draft가 문자열', { ...valid, draft: 'yes' }, /draft/],
  ])('%s이면 파일 이름과 함께 에러를 낸다', (_, data, message) => {
    expect(() => parseProjectFrontmatter(data, 'sample')).toThrow(message);
    expect(() => parseProjectFrontmatter(data, 'sample')).toThrow(
      'content/projects/sample.mdx',
    );
  });
});
