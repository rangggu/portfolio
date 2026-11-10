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
