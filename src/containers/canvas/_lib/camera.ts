/**
 * 데스크톱 카메라 모드 (docs/product.md 「마우스·트랙패드 — 카메라 이동」).
 * 마우스 기기면 켠다 (움직임 줄이기를 켜도 같은 화면, 이동 연출만 즉시). 그 밖(터치·인쇄·JS 전)은 카메라가 아니다.
 * 켜지면 <html data-camera>가 붙고, Canvas.module.css가 이 속성을 보고 프레임을 지도대로 놓는다.
 */
export const CAMERA_MEDIA_QUERY = '(pointer: fine)';

export const CAMERA_ATTRIBUTE = 'data-camera';

export function isCameraMode(): boolean {
  return document.documentElement.hasAttribute(CAMERA_ATTRIBUTE);
}
