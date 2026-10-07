import { RESUME } from '@/lib/resume';

const { profile } = RESUME;

/** 사이트 정보. 이름·직무·소개 문구는 이력서 데이터(content/resume/profile.ts)에서 가져온다 */
export const SITE = {
  url: 'https://www.lily-developer.me',
  name: `${profile.name} · ${profile.jobTitle}`,
  title: `${profile.name} · ${profile.jobTitle}`,
  titleTemplate: `%s · ${profile.name}`,
  description: `작은 불편을 그냥 지나치지 않는 ${profile.jobTitle} ${profile.name}의 포트폴리오입니다. 화면의 디테일부터 그 뒤의 구조까지, 한 번 더 들여다보고 만든 작업들을 담았습니다.`,
  shortDescription: profile.tagline,
  locale: 'ko_KR',
  themeColor: {
    light: '#ffffff',
    dark: '#111316',
  },
} as const;
