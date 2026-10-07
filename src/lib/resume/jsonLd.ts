import type { Resume } from './types';
import { isTodo } from './validate';

/** schema.org Person. TODO인 값은 넣지 않는다 (seo.md JSON-LD) */
export function toPersonJsonLd(resume: Resume, siteUrl: string) {
  const { profile, skills, education } = resume;
  const sameAs = profile.links
    .map((link) => link.url)
    .filter((url) => !isTodo(url));
  const alumniOf = education
    .filter((item) => !isTodo(item.school))
    .map((item) => ({ '@type': 'EducationalOrganization', name: item.school }));
  const knowsAbout = skills
    .map((skill) => skill.name)
    .filter((name) => !isTodo(name));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.nickname,
    jobTitle: profile.jobTitle,
    description: profile.tagline,
    url: siteUrl,
    ...(isTodo(profile.email) ? {} : { email: `mailto:${profile.email}` }),
    ...(sameAs.length > 0 && { sameAs }),
    ...(alumniOf.length > 0 && { alumniOf }),
    ...(knowsAbout.length > 0 && { knowsAbout }),
  };
}
