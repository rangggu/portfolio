import type { FrameId } from '../../_lib/frames';

interface InitialFrameProps {
  frameId: FrameId;
}

/**
 * 주소로 직접 들어왔을 때 해당 프레임이 보이는 위치에서 시작하게 한다.
 * Canvas가 프레임들 뒤에 렌더하므로 HTML을 읽다 이 스크립트에 닿을 때 프레임 요소가 이미 있고,
 * 첫 페인트 전에 스크롤된다 (ThemeScript와 같은 방식). 첫 화면은 맨 위라 아무것도 하지 않는다.
 * globals.css의 scroll-behavior: smooth가 걸리지 않도록 behavior: 'instant'로 바로 옮긴다.
 */
export function InitialFrame({ frameId }: InitialFrameProps) {
  if (frameId === 'hero') return null;

  const script = `document.getElementById(${JSON.stringify(frameId)})?.scrollIntoView({ block: 'start', behavior: 'instant' });`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
