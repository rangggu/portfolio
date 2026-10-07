import type { Metadata } from 'next';

import { mdxComponents } from '@/components/mdx/mdxComponents';
import { Container } from '@/components/ui/Container';
import { CaseStudyArticle } from '@/features/case-study';
import {
  getProjectContent,
  getProjectMeta,
  getProjectSlugs,
} from '@/lib/content/projects';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** content/projects/에 없는 slug는 404 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// TODO: Phase 2에서 OG 이미지, JSON-LD 추가
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getProjectMeta(slug);
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { meta, Content } = await getProjectContent(slug);

  return (
    <Container as="main" id="main" tabIndex={-1}>
      <CaseStudyArticle meta={meta}>
        <Content components={mdxComponents} />
      </CaseStudyArticle>
    </Container>
  );
}
