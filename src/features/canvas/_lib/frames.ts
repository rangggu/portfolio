/** 캔버스 프레임 목록. 실제 문서 순서와 같다 (docs/product.md 프레임 배치). */
export const FRAMES = [
  { id: 'hero', number: '00', label: '첫 화면' },
  { id: 'about', number: '01', label: '소개' },
  { id: 'career', number: '02', label: '경력' },
  { id: 'projects', number: '03', label: '프로젝트' },
  { id: 'skills', number: '04', label: '기술' },
  { id: 'education', number: '05', label: '학력·자격' },
  { id: 'contact', number: '06', label: '연락처' },
] as const;

export type CanvasFrame = (typeof FRAMES)[number];

export function getFrameHeadingId(frameId: CanvasFrame['id']): string {
  return `${frameId}-title`;
}
