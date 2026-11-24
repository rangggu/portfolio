import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { SkipLink } from '@/components/layout/SkipLink';
import { JsonLd, ThemeScript } from '@/components/seo';
import { RESUME } from '@/lib/resume';
import { toPersonJsonLd } from '@/lib/resume/jsonLd';
import { SITE } from '@/lib/site';
import { pretendard } from '@/styles/fonts';
import './globals.css';

const ViewportIndicator =
  process.env.NODE_ENV === 'development'
    ? dynamic(() =>
        import('@/components/dev/ViewportIndicator').then(
          (m) => m.ViewportIndicator,
        ),
      )
    : () => null;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.shortDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.shortDescription,
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    // TODO: Google Search Console 인증 코드
    // google: '',
    // TODO: 네이버 서치어드바이저 인증 코드
    // other: { 'naver-site-verification': '' },
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE.themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: SITE.themeColor.dark },
  ],
};

const personJsonLd = toPersonJsonLd(RESUME, SITE.url);

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <SkipLink />
        {children}
        <JsonLd data={personJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <ViewportIndicator />
        {/*
         * 실제 방문자의 Core Web Vitals를 Vercel로 보낸다. 수집 스크립트(/_vercel/…)는 Vercel 배포에만 있으므로
         * Vercel에서 빌드할 때만 넣는다 (로컬·CI의 next start에서는 404 콘솔 오류가 나서 Lighthouse가 감점한다)
         */}
        {process.env.VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
