import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import { JsonLd, ThemeScript } from '@/components/seo';
import { PERSON, SITE } from '@/lib/site';
import './globals.css';

const ViewportIndicator =
  process.env.NODE_ENV === 'development'
    ? dynamic(() =>
        import('@/components/dev/ViewportIndicator').then(
          (m) => m.ViewportIndicator,
        ),
      )
    : () => null;

const ThemeToggle =
  process.env.NODE_ENV === 'development'
    ? dynamic(() =>
        import('@/components/dev/ThemeToggle').then((m) => m.ThemeToggle),
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

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON.name,
  jobTitle: PERSON.jobTitle,
  description: PERSON.description,
  url: SITE.url,
  sameAs: PERSON.sameAs,
};

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
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {children}
        <JsonLd data={personJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <ViewportIndicator />
        <ThemeToggle />
      </body>
    </html>
  );
}
