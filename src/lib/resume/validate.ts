import {
  SKILL_CATEGORIES,
  TODO,
  type Period,
  type Resume,
  type ResumeLink,
} from './types';

/**
 * 타입으로 표현할 수 없는 규칙을 검사한다. 틀린 곳을 모두 모아 한 번에 에러로 던진다.
 * TODO 값은 형식 검사를 건너뛰고 todos 목록으로 돌려준다.
 */
export interface ResumeValidation {
  resume: Resume;
  /** 아직 채우지 않은 값의 위치 (예: "timeline[0].role") */
  todos: string[];
}

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const URL = /^https?:\/\/\S+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isTodo(value: unknown): value is typeof TODO {
  return value === TODO;
}

class Checker {
  readonly errors: string[] = [];
  readonly todos: string[] = [];

  text(value: string, at: string) {
    if (isTodo(value)) this.todos.push(at);
    else if (value.trim() === '') this.errors.push(`${at}: 비어 있습니다`);
  }

  pattern(value: string, at: string, pattern: RegExp, label: string) {
    if (isTodo(value)) this.todos.push(at);
    else if (!pattern.test(value)) {
      this.errors.push(`${at}: ${label} 형식이 아닙니다 (받은 값: ${value})`);
    }
  }

  period({ start, end }: Period, at: string) {
    this.pattern(start, `${at}.start`, YEAR_MONTH, 'YYYY-MM');
    if (end === undefined) return;
    this.pattern(end, `${at}.end`, YEAR_MONTH, 'YYYY-MM');
    if (!isTodo(start) && !isTodo(end) && end < start) {
      this.errors.push(`${at}: end가 start보다 앞섭니다`);
    }
  }

  links(links: readonly ResumeLink[], at: string) {
    links.forEach((link, index) => {
      this.text(link.label, `${at}[${index}].label`);
      this.pattern(link.url, `${at}[${index}].url`, URL, 'http(s) URL');
    });
  }
}

export function validateResume(resume: Resume): ResumeValidation {
  const check = new Checker();
  const { profile, intro, timeline, skills, education, certifications } =
    resume;

  check.text(profile.name, 'profile.name');
  check.text(profile.nickname, 'profile.nickname');
  check.text(profile.jobTitle, 'profile.jobTitle');
  check.text(profile.tagline, 'profile.tagline');
  check.text(profile.subline, 'profile.subline');
  check.pattern(profile.email, 'profile.email', EMAIL, '이메일');
  check.links(profile.links, 'profile.links');

  intro.forEach((paragraph, index) => check.text(paragraph, `intro[${index}]`));

  const timelineIds = new Set<string>();
  timeline.forEach((item, index) => {
    const at = `timeline[${index}]`;
    if (timelineIds.has(item.id))
      check.errors.push(`${at}: id "${item.id}"가 중복됩니다`);
    timelineIds.add(item.id);

    check.text(item.name, `${at}.name`);
    check.text(item.role, `${at}.role`);
    check.period(item.period, `${at}.period`);
    check.text(item.summary, `${at}.summary`);
    check.links(item.links, `${at}.links`);
    if (item.lane === 'company') {
      item.achievements.forEach((achievement, i) =>
        check.text(achievement, `${at}.achievements[${i}]`),
      );
    } else if ('achievements' in item) {
      check.errors.push(`${at}: 성과 요약은 회사 레인에만 씁니다`);
    }
  });

  skills.forEach((skill, index) => {
    const at = `skills[${index}]`;
    check.text(skill.name, `${at}.name`);
    if (!SKILL_CATEGORIES.includes(skill.category)) {
      check.errors.push(`${at}.category: 알 수 없는 분류 "${skill.category}"`);
    }
    if (!timelineIds.has(skill.firstUsedIn)) {
      check.errors.push(
        `${at}.firstUsedIn: 타임라인에 "${skill.firstUsedIn}" 항목이 없습니다`,
      );
    }
  });

  education.forEach((item, index) => {
    const at = `education[${index}]`;
    check.text(item.school, `${at}.school`);
    check.text(item.major, `${at}.major`);
    check.text(item.degree, `${at}.degree`);
    check.period(item.period, `${at}.period`);
  });

  certifications.forEach((item, index) => {
    const at = `certifications[${index}]`;
    check.text(item.name, `${at}.name`);
    check.text(item.issuer, `${at}.issuer`);
    check.pattern(item.date, `${at}.date`, YEAR_MONTH, 'YYYY-MM');
  });

  if (check.errors.length > 0) {
    throw new Error(
      `[content/resume] 이력서 데이터 형식 오류 ${check.errors.length}건\n- ${check.errors.join('\n- ')}`,
    );
  }

  return { resume, todos: check.todos };
}

/** 프로젝트 글의 timelineId가 타임라인에 있는지 (초안 포함 모든 글) */
export function validateProjectTimelineIds(
  projects: readonly { slug: string; timelineId: string }[],
  timelineIds: ReadonlySet<string>,
) {
  const missing = projects.filter(
    (project) => !timelineIds.has(project.timelineId),
  );
  if (missing.length > 0) {
    throw new Error(
      `[content/projects] 타임라인에 없는 timelineId: ${missing
        .map((project) => `${project.slug}.mdx → "${project.timelineId}"`)
        .join(', ')}`,
    );
  }
}
