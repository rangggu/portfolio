import { mdxComponents } from '@/components/mdx/mdxComponents';
import { CaseStudyArticle, ProjectModal } from '@/features/case-study';
import { getProjectContent, getProjectSlugs } from '@/lib/content/projects';
import { SITE } from '@/lib/site';

interface ProjectModalPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 캔버스 안에서 /projects/{slug}로 이동하면 캔버스를 두고 그 위에 글을 모달로 연다 (Intercepting Routes).
 * 주소로 직접 들어오거나 새로고침하면 app/projects/[slug]의 단독 페이지가 열린다.
 * 병렬 라우트(@modal)의 metadata는 반영되지 않으므로 문서 제목은 ProjectModal이 맞춘다.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectModalPage({
  params,
}: ProjectModalPageProps) {
  const { slug } = await params;
  const { meta, Content } = await getProjectContent(slug);

  return (
    <ProjectModal
      slug={slug}
      title={meta.title}
      documentTitle={SITE.titleTemplate.replace('%s', meta.title)}
    >
      <CaseStudyArticle meta={meta} layout="modal">
        <Content components={mdxComponents} />
      </CaseStudyArticle>
    </ProjectModal>
  );
}
