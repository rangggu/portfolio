import type { MetadataRoute } from 'next';

import { FRAMES } from '@/features/canvas';
import { getProjectSlugs } from '@/lib/content/projects';
import { SITE } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const frameEntries = FRAMES.map((frame) => ({
    url: frame.path === '/' ? SITE.url : `${SITE.url}${frame.path}`,
    lastModified: new Date(),
  }));

  const slugs = await getProjectSlugs();
  const projectEntries = slugs.map((slug) => ({
    url: `${SITE.url}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [...frameEntries, ...projectEntries];
}
