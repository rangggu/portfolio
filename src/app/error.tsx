'use client';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main>
      <h1>오류가 발생했습니다</h1>
      <button type="button" onClick={reset}>
        다시 시도
      </button>
    </main>
  );
}
