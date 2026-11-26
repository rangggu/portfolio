import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ResumeDocument } from '@/containers/resume';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '이력서 미리보기',
  robots: { index: false, follow: false },
};

/**
 * 인쇄 이력서 미리보기 (개발 서버 전용). 배포 사이트에서는 404이고, 링크·sitemap에도 없다.
 * 실제 인쇄는 캔버스 페이지에서 한다 (PrintResume). 이 페이지를 인쇄해도 같은 A4가 나온다.
 */
export default function ResumePreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <main
      id="main"
      tabIndex={-1}
      className={styles.root}
      data-resume-preview=""
    >
      <p className={styles.note}>
        인쇄 이력서 미리보기 · 개발 서버 전용 · 캔버스 어느 주소에서 인쇄해도 이
        모습으로 찍혀요
      </p>
      <div className={styles.sheet}>
        <ResumeDocument />
      </div>
    </main>
  );
}
