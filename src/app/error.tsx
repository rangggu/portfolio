'use client';

import { Container } from '@/components/ui/Container';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Container as="main" id="main" tabIndex={-1}>
      <h1>오류가 발생했습니다</h1>
      <button type="button" onClick={reset}>
        다시 시도
      </button>
    </Container>
  );
}
