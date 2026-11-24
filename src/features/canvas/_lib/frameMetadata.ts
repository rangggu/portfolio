import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { FRAMES, type FrameDefinition, type FrameId } from './frames';

/**
 * 프레임 라우트의 메타데이터 (docs/conventions/seo.md 프레임별 메타데이터).
 * 첫 화면은 루트 기본 title·description을 쓰고, 나머지는 title 템플릿(`%s · 이름`)을 탄다.
 */
export function getFrameMetadata(frameId: FrameId): Metadata {
  const frame: FrameDefinition | undefined = FRAMES.find(
    (item) => item.id === frameId,
  );
  if (!frame) throw new Error(`알 수 없는 프레임: ${frameId}`);

  if (frame.id === 'hero') {
    return { alternates: { canonical: frame.path } };
  }

  const description = frame.description ?? SITE.description;

  return {
    title: frame.label,
    description,
    alternates: { canonical: frame.path },
  };
}

/** 프레임별 문서 제목. 스크롤로 프레임이 바뀔 때 클라이언트가 document.title에 쓴다 (메타데이터와 같은 규칙) */
export function getFrameDocumentTitles(): Record<FrameId, string> {
  return Object.fromEntries(
    FRAMES.map((frame) => [
      frame.id,
      frame.id === 'hero'
        ? SITE.title
        : SITE.titleTemplate.replace('%s', frame.label),
    ]),
  ) as Record<FrameId, string>;
}
