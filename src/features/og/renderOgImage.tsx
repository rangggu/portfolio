import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

import { OG_COLORS, OG_SIZE } from '@/lib/og/ogTheme';
import { RESUME } from '@/lib/resume';

const C = OG_COLORS;
const { profile } = RESUME;

/** OG 엔진에 넣을 Pretendard (굵기별 정적 서브셋, yarn fonts가 만든다). 빌드 도구가 읽는 파일만 추적하도록 경로는 고정 문자열 */
async function loadFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), 'src/styles/fonts/og/pretendard-400.woff')),
    readFile(join(process.cwd(), 'src/styles/fonts/og/pretendard-700.woff')),
  ]);
  return [
    { name: 'Pretendard', data: regular, weight: 400 as const },
    { name: 'Pretendard', data: bold, weight: 700 as const },
  ];
}

/**
 * 사이트 대표 OG 이미지 하나 (모든 페이지 공용). 대표 문장을 크게, 이름·직함만 작게.
 * 바탕은 캔버스 색, 포인트색은 짧은 선 하나
 */
export async function siteOgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 112px',
        backgroundColor: C['--color-bg-canvas'],
        fontFamily: 'Pretendard',
        color: C['--color-text-primary'],
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 56,
          height: 6,
          marginBottom: 40,
          backgroundColor: C['--color-bg-accent'],
        }}
      />
      <div
        style={{
          display: 'flex',
          fontSize: 66,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1.3,
          wordBreak: 'keep-all',
        }}
      >
        {profile.tagline}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 36,
          fontSize: 32,
          color: C['--color-text-secondary'],
        }}
      >
        {`${profile.name} · ${profile.jobTitle}`}
      </div>
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
