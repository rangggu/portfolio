// TODO: Phase 2에서 프로젝트별 OG 이미지 추가 예정
import { ImageResponse } from 'next/og';

import { RESUME } from '@/lib/resume';
import { SITE } from '@/lib/site';

const { profile } = RESUME;

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111316',
        color: '#f1f3f5',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 20,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 32, color: '#8a929c', fontWeight: 500 }}>
          {profile.jobTitle}
        </div>
        <div
          style={{
            width: 64,
            height: 3,
            backgroundColor: '#4c535d',
            marginTop: 8,
            marginBottom: 8,
          }}
        />
        <div style={{ fontSize: 26, color: '#69717c', lineHeight: 1.5 }}>
          {profile.tagline}
        </div>
      </div>
    </div>,
    size,
  );
}
