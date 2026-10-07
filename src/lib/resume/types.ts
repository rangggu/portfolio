/**
 * 이력서 데이터 타입. 원본은 content/resume/*.ts.
 * 첫 화면, 경력 타임라인, 기술·학력 프레임, Person JSON-LD, 인쇄 이력서, Phase 4 에이전트가 같은 데이터를 쓴다.
 */

/** 아직 채우지 않은 값. 형식 검사를 건너뛰고, 화면·JSON-LD·평문에서는 빠진다 */
export const TODO = 'TODO';
export type Todo = typeof TODO;

/** YYYY-MM 또는 TODO */
export type YearMonth = string;

export interface Period {
  start: YearMonth;
  /** 진행 중이면 생략 */
  end?: YearMonth;
}

export interface ResumeLink {
  label: string;
  url: string;
}

export interface ProfileLink extends ResumeLink {
  type: 'github' | 'blog' | 'linkedin' | 'other';
}

export interface Profile {
  name: string;
  /** 사이트 로고, JSON-LD alternateName */
  nickname: string;
  jobTitle: string;
  /** 첫 화면 한 줄 소개 */
  tagline: string;
  /** 첫 화면 보조 문장 */
  subline: string;
  email: string;
  links: readonly ProfileLink[];
}

interface TimelineItemBase<Id extends string = string> {
  id: Id;
  /** 기관 또는 프로젝트명 */
  name: string;
  role: string;
  period: Period;
  /** 한 줄 설명 */
  summary: string;
  links: readonly ResumeLink[];
  /** 부트캠프 시기처럼 옅게 표시할 항목 */
  dimmed?: boolean;
}

export interface CompanyTimelineItem<
  Id extends string = string,
> extends TimelineItemBase<Id> {
  lane: 'company';
  /** 성과 요약 (회사 레인만) */
  achievements: readonly string[];
}

export interface SideTimelineItem<
  Id extends string = string,
> extends TimelineItemBase<Id> {
  lane: 'side';
  achievements?: never;
}

/** 프로젝트 글은 글 frontmatter의 timelineId로 연결하고, 여기에는 두지 않는다 */
export type TimelineItem<Id extends string = string> =
  CompanyTimelineItem<Id> | SideTimelineItem<Id>;

export type TimelineLane = TimelineItem['lane'];

export const SKILL_CATEGORIES = [
  'language-framework',
  'styling',
  'data-state',
  'testing-quality',
  'collaboration-tooling',
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export const SKILL_CATEGORY_LABEL: Record<SkillCategory, string> = {
  'language-framework': '언어·프레임워크',
  styling: '스타일링',
  'data-state': '데이터·상태',
  'testing-quality': '테스트·품질',
  'collaboration-tooling': '협업·도구',
};

export interface Skill<TimelineId extends string = string> {
  name: string;
  category: SkillCategory;
  /** 처음 사용한 타임라인 항목 id */
  firstUsedIn: TimelineId;
}

export interface Education {
  school: string;
  major: string;
  degree: string;
  period: Period;
}

export interface Certification {
  name: string;
  issuer: string;
  /** 취득 연월 */
  date: YearMonth;
}

export interface Resume {
  profile: Profile;
  /** 소개 문단 */
  intro: readonly string[];
  timeline: readonly TimelineItem[];
  skills: readonly Skill[];
  education: readonly Education[];
  certifications: readonly Certification[];
}
