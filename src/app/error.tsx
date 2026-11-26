'use client';

import { Container } from '@/components/ui/Container/Container';
import { pageTitle } from '@/lib/siteTitle';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Container as="main" id="main" tabIndex={-1}>
      {/* 클라이언트 오류 경계라 metadata를 내보낼 수 없어 <title>을 직접 둔다 (React가 head로 올린다) */}
      <title>{pageTitle('문제가 생겼어요')}</title>
      <h1>오류가 발생했습니다</h1>
      <button type="button" onClick={reset}>
        다시 시도
      </button>
    </Container>
  );
}
