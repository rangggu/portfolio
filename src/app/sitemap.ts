import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// TODO: content/ 목록 기반으로 동적 생성하도록 변경
const PROJECT_SLUGS = ['bitlight', 'superposition'];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = PROJECT_SLUGS.map((slug) => ({
    url: `${SITE.url}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
    },
    ...projectEntries,
  ];
}
