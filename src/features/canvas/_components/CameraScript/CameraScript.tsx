import { CAMERA_ATTRIBUTE, CAMERA_MEDIA_QUERY } from '../../_lib/camera';
import {
  CANVAS_MODE_ATTRIBUTE,
  CANVAS_MODE_STORAGE_KEY,
} from '../../_lib/canvasMode';

/**
 * 카메라 모드를 첫 페인트 전에 <html data-camera>로 정한다 (ThemeScript와 같은 방식).
 * 저장된 캔버스 모드가 자유 모드면 <html data-canvas-mode="free">도 붙인다 (새로고침해도 첫 화면부터 그 모드).
 * Canvas가 프레임보다 앞에 렌더하므로 프레임이 그려지기 전에 지도 배치가 적용된다.
 * 이후 매체 조건이 바뀌면 CameraController가 속성을 맞춘다.
 */
const CAMERA_SCRIPT = `
(function() {
  try {
    if (matchMedia(${JSON.stringify(CAMERA_MEDIA_QUERY)}).matches) {
      document.documentElement.setAttribute(${JSON.stringify(CAMERA_ATTRIBUTE)}, '');
    }
    if (localStorage.getItem(${JSON.stringify(CANVAS_MODE_STORAGE_KEY)}) === 'free') {
      document.documentElement.setAttribute(${JSON.stringify(CANVAS_MODE_ATTRIBUTE)}, 'free');
    }
  } catch (e) {}
})();
`;

export function CameraScript() {
  return <script dangerouslySetInnerHTML={{ __html: CAMERA_SCRIPT }} />;
}
