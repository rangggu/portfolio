/**
 * 데스크톱 카메라 모드 (docs/product.md 「마우스·트랙패드 — 카메라 이동」).
 * 마우스 기기이고 움직임 줄이기를 켜지 않았을 때만 켠다. 그 밖(터치·reduced-motion·인쇄·JS 전)은 세로 페이지다.
 * 켜지면 <html data-camera>가 붙고, Canvas.module.css가 이 속성을 보고 프레임을 지도대로 놓는다.
 */
export const CAMERA_MEDIA_QUERY =
  '(pointer: fine) and (prefers-reduced-motion: no-preference)';

export const CAMERA_ATTRIBUTE = 'data-camera';

export function isCameraMode(): boolean {
  return document.documentElement.hasAttribute(CAMERA_ATTRIBUTE);
}
