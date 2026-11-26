import { RESUME } from '@/lib/resume';
import { HOME_TITLE, SITE_NAME, TITLE_TEMPLATE } from './siteTitle';

const { profile } = RESUME;

/** 사이트 정보. 이름·직무·소개 문구는 이력서 데이터(content/resume/profile.ts)에서 가져온다 */
export const SITE = {
  url: 'https://www.myu-developer.me',
  /** 사이트 이름 (OG siteName, WebSite JSON-LD, 하위 페이지 제목 꼬리) */
  name: SITE_NAME,
  /** 첫 화면 제목 */
  title: HOME_TITLE,
  /** 하위 페이지 제목: 페이지 이름 | 사이트 이름 */
  titleTemplate: TITLE_TEMPLATE,
  /** 검색 설명: 직무·이름만으로 짧게 (대표 문구는 OG·shortDescription이 맡는다) */
  description: `${profile.jobTitle} ${profile.name}의 포트폴리오입니다.`,
  shortDescription: profile.tagline,
  locale: 'ko_KR',
  themeColor: {
    light: '#ffffff',
    dark: '#111316',
  },
} as const;
