export interface FrameDefinition {
  id: string;
  /** 이름표 번호. 첫 화면은 번호 없이 표시한다 (시안 CanvasHero) */
  number?: string;
  label: string;
  /** 프레임 주소 (docs/product.md 프레임별 라우트) */
  path: string;
  /** 검색용 설명. 비어 있으면 사이트 기본 설명을 쓴다 (docs/conventions/seo.md) */
  description?: string;
}

/** 캔버스 프레임 목록. 실제 문서 순서와 같다 (docs/product.md 프레임 배치). */
export const FRAMES = [
  { id: 'hero', label: '첫 화면', path: '/' },
  { id: 'about', number: '01', label: '소개', path: '/about' },
  { id: 'career', number: '02', label: '경력', path: '/career' },
  { id: 'projects', number: '03', label: '프로젝트', path: '/projects' },
  { id: 'skills', number: '04', label: '기술', path: '/skills' },
  { id: 'education', number: '05', label: '학력·자격', path: '/education' },
  { id: 'contact', number: '06', label: '연락처', path: '/contact' },
] as const satisfies readonly FrameDefinition[];

export type CanvasFrame = (typeof FRAMES)[number];

export type FrameId = CanvasFrame['id'];

export const FRAME_IDS: readonly FrameId[] = FRAMES.map((frame) => frame.id);

export function getFrameHeadingId(frameId: FrameId): string {
  return `${frameId}-title`;
}

/** 프레임 이름표 문자열. 예: `01 소개 · /about`, `첫 화면 · /` */
export function getFrameLabel(frame: CanvasFrame): string {
  const name =
    'number' in frame ? `${frame.number} ${frame.label}` : frame.label;

  return `${name} · ${frame.path}`;
}
