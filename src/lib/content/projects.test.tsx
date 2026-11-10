import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  getAllProjectMeta,
  getAllProjectPlainText,
  getProjectContent,
  getProjectMeta,
  getProjectPlainText,
  getProjectSlugs,
} from './projects';

const FIXTURES = path.join(__dirname, '__fixtures__', 'projects');
/** 프로덕션 빌드 기준 (초안 제외) */
const FIXTURE_TIMELINE = new Set(['alpha', 'beta', 'gamma']);
const PUBLISHED = {
  dir: FIXTURES,
  includeDrafts: false,
  timelineIds: FIXTURE_TIMELINE,
};
/** 개발 서버 기준 (초안 포함) */
const WITH_DRAFTS = {
  dir: FIXTURES,
  includeDrafts: true,
  timelineIds: FIXTURE_TIMELINE,
};

describe('getProjectSlugs', () => {
  it('.mdx 파일만 이름 순으로 돌려준다', async () => {
    expect(await getProjectSlugs(WITH_DRAFTS)).toEqual([
      'alpha',
      'beta',
      'gamma',
    ]);
  });

  it('초안을 숨기면 draft: true인 글을 뺀다', async () => {
    expect(await getProjectSlugs(PUBLISHED)).toEqual(['alpha', 'beta']);
  });
});

describe('getProjectMeta', () => {
  it('slug와 검증된 frontmatter를 합치고, draft 기본값은 false다', async () => {
    const meta = await getProjectMeta('alpha', PUBLISHED);
    expect(meta).toEqual({
      slug: 'alpha',
      title: 'Alpha',
      summary: '알파 요약',
      period: { start: '2024-01', end: '2024-03' },
      tags: ['React'],
      thumbnail: '/projects/alpha/thumbnail.png',
      timelineId: 'alpha',
      draft: false,
    });
  });

  it('진행 중이면 period.end가 없다', async () => {
    const meta = await getProjectMeta('beta', PUBLISHED);
    expect(meta.period).toEqual({ start: '2025-02' });
  });

  it('초안을 숨기는 환경에서 초안을 요청하면 에러를 낸다', async () => {
    await expect(getProjectMeta('gamma', PUBLISHED)).rejects.toThrow('초안');
    await expect(getProjectMeta('gamma', WITH_DRAFTS)).resolves.toMatchObject({
      draft: true,
    });
  });
});

describe('getAllProjectMeta', () => {
  it('최근 시작한 프로젝트부터 정렬한다', async () => {
    const metas = await getAllProjectMeta(WITH_DRAFTS);
    expect(metas.map((meta) => meta.slug)).toEqual(['gamma', 'beta', 'alpha']);
  });

  it('초안을 숨기면 목록에서 뺀다', async () => {
    const metas = await getAllProjectMeta(PUBLISHED);
    expect(metas.map((meta) => meta.slug)).toEqual(['beta', 'alpha']);
  });

  it('타임라인에 없는 timelineId가 있으면 초안이라도 에러를 낸다', async () => {
    await expect(
      getAllProjectMeta({
        ...PUBLISHED,
        timelineIds: new Set(['alpha', 'beta']),
      }),
    ).rejects.toThrow('gamma.mdx → "gamma"');
  });
});

describe('getProjectContent', () => {
  it('코드 블록을 빌드 타임에 Shiki 듀얼 테마로 하이라이팅한다', async () => {
    const { Content } = await getProjectContent('alpha', PUBLISHED);
    const html = renderToStaticMarkup(<Content />);
    expect(html).toContain('data-rehype-pretty-code-figure');
    expect(html).toContain('--shiki-light');
    expect(html).toContain('--shiki-dark');
  });

  it('components로 받은 컴포넌트에 MDX 요소를 매핑한다', async () => {
    const { Content } = await getProjectContent('alpha', PUBLISHED);
    const html = renderToStaticMarkup(
      <Content
        components={{
          h2: ({ children }) => <h2 data-mapped="">{children}</h2>,
        }}
      />,
    );
    expect(html).toContain('<h2 data-mapped="">소개</h2>');
  });

  it('초안을 숨기는 환경에서는 본문도 읽지 않는다', async () => {
    await expect(getProjectContent('gamma', PUBLISHED)).rejects.toThrow('초안');
  });
});

describe('getProjectPlainText', () => {
  it('제목·요약·본문 텍스트를 평문으로 뽑고, JSX는 감싼 내용만 남긴다', async () => {
    const text = await getProjectPlainText('beta', PUBLISHED);
    expect(text).toContain('Beta');
    expect(text).toContain('베타 요약');
    expect(text).toContain('연결 텍스트');
    expect(text).toContain('메모 내용');
    expect(text).not.toContain('MarginNote');
    expect(text).not.toContain('주석');
  });

  it('코드 블록 내용도 남긴다', async () => {
    const text = await getProjectPlainText('alpha', PUBLISHED);
    expect(text).toContain('const answer = 42;');
  });
});

describe('getAllProjectPlainText', () => {
  it('초안을 숨기면 AI 지식 추출에서도 뺀다', async () => {
    const items = await getAllProjectPlainText(PUBLISHED);
    expect(items.map((item) => item.slug)).toEqual(['alpha', 'beta']);
    expect(items.some((item) => item.text.includes('감마'))).toBe(false);
  });
});

describe('SHOW_DRAFTS', () => {
  /** 모듈을 불러올 때 값이 정해지므로 환경 변수를 바꾼 뒤 새로 불러온다 */
  async function loadInProduction(showDrafts?: string) {
    vi.stubEnv('NODE_ENV', 'production');
    if (showDrafts !== undefined) vi.stubEnv('SHOW_DRAFTS', showDrafts);
    vi.resetModules();
    return import('./projects');
  }

  /** includeDrafts를 넘기지 않아 기본값(SHOW_DRAFTS)을 따른다 */
  const DEFAULT_DRAFTS = { dir: FIXTURES, timelineIds: FIXTURE_TIMELINE };

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('프로덕션에서 SHOW_DRAFTS가 없으면 초안을 뺀다', async () => {
    const projects = await loadInProduction();
    expect(projects.SHOW_DRAFTS).toBe(false);
    expect(await projects.getProjectSlugs(DEFAULT_DRAFTS)).toEqual([
      'alpha',
      'beta',
    ]);
  });

  it('프로덕션에서 SHOW_DRAFTS=true면 초안을 포함한다', async () => {
    const projects = await loadInProduction('true');
    expect(projects.SHOW_DRAFTS).toBe(true);
    expect(await projects.getProjectSlugs(DEFAULT_DRAFTS)).toEqual([
      'alpha',
      'beta',
      'gamma',
    ]);
  });

  it.each(['1', 'TRUE', 'yes', ''])(
    'SHOW_DRAFTS가 "true"가 아닌 값(%j)이면 초안을 뺀다',
    async (value) => {
      const projects = await loadInProduction(value);
      expect(projects.SHOW_DRAFTS).toBe(false);
      expect(await projects.getProjectSlugs(DEFAULT_DRAFTS)).toEqual([
        'alpha',
        'beta',
      ]);
    },
  );
});
