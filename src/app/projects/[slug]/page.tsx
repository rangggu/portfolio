import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const DUMMY_SLUGS = ['bitlight', 'superposition'];

export const dynamicParams = false;

export function generateStaticParams() {
  return DUMMY_SLUGS.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  if (!DUMMY_SLUGS.includes(slug)) {
    notFound();
  }

  return (
    <Container as="main" id="main" tabIndex={-1}>
      <h1>{slug}</h1>
    </Container>
  );
}
