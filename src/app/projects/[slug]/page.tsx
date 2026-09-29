import { notFound } from 'next/navigation';

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
    <main>
      <h1>{slug}</h1>
    </main>
  );
}
