import { CAMERA_ATTRIBUTE } from '../../_lib/camera';
import type { FrameId } from '../../_lib/frames';

interface InitialFrameProps {
  frameId: FrameId;
}

/**
 * 주소로 직접 들어왔을 때 해당 프레임이 보이는 위치에서 시작하게 한다.
 * Canvas가 프레임들 뒤에 렌더하므로 HTML을 읽다 이 스크립트에 닿을 때 프레임 요소가 이미 있고,
 * 첫 페인트 전에 실행된다 (ThemeScript와 같은 방식). 첫 화면은 맨 위라 아무것도 하지 않는다.
 * - 세로 페이지: 프레임으로 바로 스크롤한다. globals.css의 smooth가 걸리지 않도록 behavior: 'instant'
 * - 카메라 모드: 아직 문서 높이가 없어 스크롤할 수 없으므로, 카메라 첫 위치만 <html>의 변수로 정한다
 *   (React가 그리는 요소의 속성을 바꾸지 않아 하이드레이션과 부딪히지 않는다). 이후 CameraController가 이어받는다
 */
export function InitialFrame({ frameId }: InitialFrameProps) {
  if (frameId === 'hero') return null;

  const script = `
(function() {
  var frame = document.getElementById(${JSON.stringify(frameId)});
  if (!frame) return;
  var html = document.documentElement;
  if (html.hasAttribute(${JSON.stringify(CAMERA_ATTRIBUTE)})) {
    var stage = frame.parentElement && frame.parentElement.parentElement;
    if (!stage) return;
    var x = frame.offsetLeft + frame.offsetWidth / 2 - stage.clientWidth / 2;
    html.style.setProperty('--camera-initial-x', x + 'px');
    html.style.setProperty('--camera-initial-y', frame.offsetTop + 'px');
    return;
  }
  frame.scrollIntoView({ block: 'start', behavior: 'instant' });
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
