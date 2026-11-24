import type { Metadata } from 'next';
import { DesignSystemPage } from '@/features/design-system';

/** 공개하지만 검색 결과·sitemap에는 넣지 않는다 (나중에 포트폴리오 프로젝트로 소개할 때 연다) */
export const metadata: Metadata = {
  title: '디자인 시스템',
  description: '이 사이트의 디자인 토큰과 공용 UI 컴포넌트 문서',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignSystemPage />;
}
