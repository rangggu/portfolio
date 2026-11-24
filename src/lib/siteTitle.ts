import { profile } from '../../content/resume/profile';

/**
 * 브라우저 탭·검색 결과 제목 규칙 (docs/conventions/seo.md 「title」).
 * 첫 화면: 「이름 | 직무」, 하위 페이지: 「페이지 이름 | 이름 포트폴리오」.
 * 클라이언트 오류 페이지에서도 쓰므로 이력서 전체(검증 포함)가 아니라 프로필 모듈만 불러온다.
 */
export const SITE_NAME = `${profile.name} 포트폴리오`;

export const HOME_TITLE = `${profile.name} | ${profile.jobTitle}`;

export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

export function pageTitle(page: string): string {
  return TITLE_TEMPLATE.replace('%s', page);
}
