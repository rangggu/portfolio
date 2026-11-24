import { TODO, type TimelineItem } from '@/lib/resume/types';

/**
 * 경력 타임라인. 프로젝트 글은 글 frontmatter의 timelineId로 이 항목의 id를 가리키면 자동으로 연결된다.
 * 진행 중이면 period.end를 생략한다.
 */
export const timeline = [
  {
    id: 'bitgaram',
    lane: 'company',
    name: '빛가람시스템',
    // TODO: 역할, 기간, 한 줄 설명, 성과 요약, 링크
    role: TODO,
    period: { start: TODO },
    summary: TODO,
    achievements: [],
    links: [],
  },
  {
    id: 'superposition',
    lane: 'side',
    name: 'SuperPosition',
    // TODO: 역할, 기간, 한 줄 설명, 링크
    role: TODO,
    period: { start: TODO },
    summary: TODO,
    links: [],
  },
  // TODO: 나머지 회사·사이드 항목 (부트캠프 시기는 dimmed: true)
  {
    // 사이드 레인의 마지막 항목. 경력 프레임에서 「지금 보는 중」이 붙는다
    id: 'portfolio',
    lane: 'side',
    name: '이 포트폴리오',
    // TODO: 역할, 기간, 한 줄 설명
    role: TODO,
    period: { start: TODO },
    summary: TODO,
    links: [],
  },
] as const satisfies readonly TimelineItem[];

export type TimelineId = (typeof timeline)[number]['id'];
