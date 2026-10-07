import { describe, expect, it } from 'vitest';

import { toPersonJsonLd } from './jsonLd';
import { TODO, type Resume } from './types';

const base: Resume = {
  profile: {
    name: '이름',
    nickname: 'Myu',
    jobTitle: '프론트엔드 개발자',
    tagline: '한 줄 소개',
    subline: '보조 문장',
    email: TODO,
    links: [{ type: 'github', label: 'GitHub', url: 'https://github.com/me' }],
  },
  intro: [],
  timeline: [],
  skills: [],
  education: [],
  certifications: [],
};

describe('toPersonJsonLd', () => {
  it('Person 기본 필드와 alternateName(별명)을 넣는다', () => {
    expect(toPersonJsonLd(base, 'https://example.com')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: '이름',
      alternateName: 'Myu',
      jobTitle: '프론트엔드 개발자',
      description: '한 줄 소개',
      url: 'https://example.com',
      sameAs: ['https://github.com/me'],
    });
  });

  it('TODO인 이메일은 빼고, 채워지면 mailto로 넣는다', () => {
    expect(toPersonJsonLd(base, 'https://example.com')).not.toHaveProperty(
      'email',
    );
    const filled = {
      ...base,
      profile: { ...base.profile, email: 'me@example.com' },
    };
    expect(toPersonJsonLd(filled, 'https://example.com').email).toBe(
      'mailto:me@example.com',
    );
  });

  it('학력·기술이 있으면 alumniOf·knowsAbout을 넣는다', () => {
    const data: Resume = {
      ...base,
      timeline: [
        {
          id: 'a',
          lane: 'side',
          name: 'A',
          role: 'r',
          period: { start: '2024-01' },
          summary: 's',
          links: [],
        },
      ],
      skills: [
        { name: 'React', category: 'language-framework', firstUsedIn: 'a' },
      ],
      education: [
        {
          school: '학교',
          major: '전공',
          degree: '학사',
          period: { start: '2016-03' },
        },
      ],
    };
    const jsonLd = toPersonJsonLd(data, 'https://example.com');
    expect(jsonLd.alumniOf).toEqual([
      { '@type': 'EducationalOrganization', name: '학교' },
    ]);
    expect(jsonLd.knowsAbout).toEqual(['React']);
  });
});
