'use client';

import { pageTitle } from '@/lib/siteTitle';
import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 루트 레이아웃까지 실패했을 때 보이는 페이지 (Next 기본 영어 페이지 대신).
 * 레이아웃을 대신하므로 <html>·<body>를 직접 그리고, metadata 대신 <title>을 둔다.
 */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="ko">
      <body>
        <title>{pageTitle('문제가 생겼어요')}</title>
        <main id="main" tabIndex={-1}>
          <h1>문제가 생겼어요</h1>
          <p>잠시 뒤 다시 시도해 주세요.</p>
          <button type="button" onClick={reset}>
            다시 시도
          </button>
        </main>
      </body>
    </html>
  );
}
