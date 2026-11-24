import { CAMERA_ATTRIBUTE, CAMERA_MEDIA_QUERY } from '../../_lib/camera';

/**
 * 카메라 모드를 첫 페인트 전에 <html data-camera>로 정한다 (ThemeScript와 같은 방식).
 * Canvas가 프레임보다 앞에 렌더하므로 프레임이 그려지기 전에 지도 배치가 적용된다.
 * 이후 매체 조건이 바뀌면 CameraController가 속성을 맞춘다.
 */
const CAMERA_SCRIPT = `
(function() {
  try {
    if (matchMedia(${JSON.stringify(CAMERA_MEDIA_QUERY)}).matches) {
      document.documentElement.setAttribute(${JSON.stringify(CAMERA_ATTRIBUTE)}, '');
    }
  } catch (e) {}
})();
`;

export function CameraScript() {
  return <script dangerouslySetInnerHTML={{ __html: CAMERA_SCRIPT }} />;
}
