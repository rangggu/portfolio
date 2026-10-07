/** 케이스 스터디 frontmatter. generateMetadata·OG 이미지·sitemap·AI 지식이 같은 데이터를 쓴다. */
export interface ProjectPeriod {
  /** YYYY-MM */
  start: string;
  /** YYYY-MM. 진행 중이면 생략 */
  end?: string;
}

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  period: ProjectPeriod;
  tags: string[];
  /** public/projects/{slug}/ 아래 경로 */
  thumbnail: string;
  /** 경력 타임라인 항목 id (content/resume/timeline.ts). 없는 id면 빌드가 실패한다 */
  timelineId: string;
  /** 초안. 개발 서버에서만 보이고 프로덕션 빌드에서는 모든 곳에서 빠진다. 기본값 false */
  draft: boolean;
}

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

function fail(slug: string, message: string): never {
  throw new Error(`[content/projects/${slug}.mdx] frontmatter: ${message}`);
}

function readString(
  data: Record<string, unknown>,
  key: string,
  slug: string,
): string {
  const value = data[key];
  if (typeof value !== 'string' || value.trim() === '') {
    fail(slug, `${key}는 비어 있지 않은 문자열이어야 합니다`);
  }
  return value;
}

function readYearMonth(value: unknown, key: string, slug: string): string {
  if (typeof value !== 'string' || !YEAR_MONTH.test(value)) {
    fail(
      slug,
      `${key}는 YYYY-MM 형식이어야 합니다 (받은 값: ${String(value)})`,
    );
  }
  return value;
}

function readPeriod(value: unknown, slug: string): ProjectPeriod {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(slug, 'period는 { start, end } 객체여야 합니다');
  }
  const period = value as Record<string, unknown>;
  const start = readYearMonth(period.start, 'period.start', slug);
  if (period.end === undefined) return { start };

  const end = readYearMonth(period.end, 'period.end', slug);
  if (end < start) fail(slug, 'period.end가 period.start보다 앞섭니다');
  return { start, end };
}

function readTags(value: unknown, slug: string): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((tag) => typeof tag !== 'string' || tag.trim() === '')
  ) {
    fail(slug, 'tags는 비어 있지 않은 문자열 배열이어야 합니다');
  }
  return value;
}

function readDraft(value: unknown, slug: string): boolean {
  if (value === undefined) return false;
  if (typeof value !== 'boolean')
    fail(slug, 'draft는 true 또는 false여야 합니다');
  return value;
}

export function parseProjectFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): ProjectFrontmatter {
  const thumbnail = readString(data, 'thumbnail', slug);
  if (!thumbnail.startsWith(`/projects/${slug}/`)) {
    fail(slug, `thumbnail은 /projects/${slug}/ 아래 경로여야 합니다`);
  }

  return {
    title: readString(data, 'title', slug),
    summary: readString(data, 'summary', slug),
    period: readPeriod(data.period, slug),
    tags: readTags(data.tags, slug),
    thumbnail,
    timelineId: readString(data, 'timelineId', slug),
    draft: readDraft(data.draft, slug),
  };
}
