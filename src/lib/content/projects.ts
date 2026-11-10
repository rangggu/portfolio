import * as runtime from 'react/jsx-runtime';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createProcessor, evaluate } from '@mdx-js/mdx';
import matter from 'gray-matter';

import { TIMELINE_IDS } from '@/lib/resume';
import { validateProjectTimelineIds } from '@/lib/resume/validate';

import {
  parseProjectFrontmatter,
  type ProjectFrontmatter,
} from './frontmatter';
import { REHYPE_PLUGINS, REMARK_PLUGINS } from './mdxOptions';
import { mdastToPlainText } from './plainText';

/** 프로젝트 글 원본 폴더 (레포 루트 content/projects) */
export const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

/**
 * 초안(draft: true)은 개발 서버에서만 보인다. 프로덕션 빌드에서는 페이지·목록·sitemap·AI 지식 모두에서 빠진다.
 * 예외: 빌드 시 SHOW_DRAFTS=true를 주면 초안을 포함한다 (Lighthouse CI 측정 전용, 배포 빌드에서는 쓰지 않는다)
 */
export const SHOW_DRAFTS =
  process.env.NODE_ENV === 'development' || process.env.SHOW_DRAFTS === 'true';

const EXTENSION = '.mdx';

type MDXContent = Awaited<ReturnType<typeof evaluate>>['default'];

export interface ContentOptions {
  /** 원본 폴더 (테스트용) */
  dir?: string;
  /** 초안 포함 여부. 기본값은 SHOW_DRAFTS */
  includeDrafts?: boolean;
  /** timelineId 검사 기준 (테스트용). 기본값은 이력서 데이터의 타임라인 id */
  timelineIds?: ReadonlySet<string>;
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

interface ProjectSource {
  meta: ProjectMeta;
  body: string;
}

async function listSlugs(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(EXTENSION))
    .map((entry) => entry.name.slice(0, -EXTENSION.length))
    .sort();
}

async function readSource(slug: string, dir: string): Promise<ProjectSource> {
  const raw = await readFile(path.join(dir, `${slug}${EXTENSION}`), 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: { slug, ...parseProjectFrontmatter(data, slug) },
    body: content,
  };
}

/** 한 편 읽기. 초안을 숨기는 환경에서 초안을 요청하면 에러 */
async function readProject(
  slug: string,
  { dir = PROJECTS_DIR, includeDrafts = SHOW_DRAFTS }: ContentOptions = {},
): Promise<ProjectSource> {
  const source = await readSource(slug, dir);
  if (source.meta.draft && !includeDrafts) {
    throw new Error(
      `[content/projects/${slug}.mdx] 초안은 프로덕션에서 읽을 수 없습니다`,
    );
  }
  return source;
}

/** generateStaticParams, sitemap용 slug 목록 (파일 이름 순, 초안 제외는 options를 따른다) */
export async function getProjectSlugs(
  options: ContentOptions = {},
): Promise<string[]> {
  const metas = await getAllProjectMeta(options);
  return metas.map((meta) => meta.slug).sort();
}

/** generateMetadata, OG 이미지용 */
export async function getProjectMeta(
  slug: string,
  options: ContentOptions = {},
): Promise<ProjectMeta> {
  return (await readProject(slug, options)).meta;
}

/** 프로젝트 목록·타임라인 연결용. 최근 시작한 프로젝트부터 */
export async function getAllProjectMeta({
  dir = PROJECTS_DIR,
  includeDrafts = SHOW_DRAFTS,
  timelineIds = TIMELINE_IDS,
}: ContentOptions = {}): Promise<ProjectMeta[]> {
  const slugs = await listSlugs(dir);
  const sources = await Promise.all(slugs.map((slug) => readSource(slug, dir)));
  const metas = sources.map((source) => source.meta);
  // 초안 포함 모든 글의 timelineId가 경력에 있어야 한다 (없으면 빌드 실패)
  validateProjectTimelineIds(metas, timelineIds);
  return metas
    .filter((meta) => includeDrafts || !meta.draft)
    .sort((a, b) => b.period.start.localeCompare(a.period.start));
}

/** 본문 MDX를 빌드 시점에 컴파일한다. 코드 블록은 Shiki로 하이라이팅된 정적 HTML이 된다 */
export async function getProjectContent(
  slug: string,
  options: ContentOptions = {},
): Promise<{ meta: ProjectMeta; Content: MDXContent }> {
  const { meta, body } = await readProject(slug, options);
  const { default: Content } = await evaluate(body, {
    ...runtime,
    remarkPlugins: REMARK_PLUGINS,
    rehypePlugins: REHYPE_PLUGINS,
  });
  return { meta, Content };
}

/** Phase 4 AI 지식용 평문 (제목·요약 + 본문) */
export async function getProjectPlainText(
  slug: string,
  options: ContentOptions = {},
): Promise<string> {
  const { meta, body } = await readProject(slug, options);
  const tree = createProcessor({ remarkPlugins: REMARK_PLUGINS }).parse(body);
  return [meta.title, meta.summary, mdastToPlainText(tree)].join('\n\n');
}

/** Phase 4 AI 지식 추출용: 공개된 모든 글의 평문 (초안 제외는 options를 따른다) */
export async function getAllProjectPlainText(
  options: ContentOptions = {},
): Promise<{ slug: string; text: string }[]> {
  const slugs = await getProjectSlugs(options);
  return Promise.all(
    slugs.map(async (slug) => ({
      slug,
      text: await getProjectPlainText(slug, options),
    })),
  );
}
