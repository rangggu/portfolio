import type { MetadataRoute } from 'next';

import { getProjectSlugs } from '@/lib/content/projects';
import { SITE } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const projectEntries = slugs.map((slug) => ({
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
