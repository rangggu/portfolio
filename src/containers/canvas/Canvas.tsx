import { CameraController } from './_navigation/CameraController/CameraController';
import { CameraScript } from './_navigation/CameraScript/CameraScript';
import { CurrentFrameTracker } from './_navigation/CurrentFrameTracker/CurrentFrameTracker';
import { Frame } from './_components/Frame/Frame';
import { FrameContent } from './_components/FrameContent/FrameContent';
import { FrameAddressSync } from './_navigation/FrameAddressSync/FrameAddressSync';
import { FrameEndHint } from './_floating/FrameEndHint/FrameEndHint';
import { SwipeController } from './_navigation/SwipeController/SwipeController';
import { ZoomControls } from './_floating/ZoomControls/ZoomControls';
import {
  FRAME_IDS,
  FRAMES,
  getFrameHeadingId,
  getFrameLabel,
} from './_lib/frames';
import { getFrameDocumentTitles } from './_lib/frameMetadata';
import styles from './Canvas.module.css';

interface CanvasProps {
  /** 프레임들 뒤에 렌더할 내용 (라우트별 초기 프레임 스크립트) */
  children?: React.ReactNode;
}

/**
 * 점 무늬 캔버스. 문서는 프레임 순서대로 이어지는 세로 페이지다.
 * 카메라 모드(마우스 기기)에서는 stage가 화면에 고정되고, world 안 프레임이 지도대로 놓이며,
 * CameraController가 스크롤 위치에 맞춰 world를 옮긴다.
 * 스와이프 모드(터치 기기)에서는 stage가 지도대로 놓인 프레임을 가로·세로로 넘기는 스냅 스크롤 영역이 되고,
 * SwipeController가 그 위치로 현재 프레임을 정한다. data-camera-* 속성은 두 모드가 함께 쓴다.
 * DOM 순서는 그대로라 키보드·스크린리더 순서가 같다.
 */
export function Canvas({ children }: CanvasProps) {
  return (
    <main id="main" tabIndex={-1} className={styles.root} data-camera-root>
      <CameraScript />
      <div className={styles.stage} data-camera-stage>
        <div className={styles.world} data-camera-world>
          {FRAMES.map((frame) => (
            <Frame
              key={frame.id}
              id={frame.id}
              label={getFrameLabel(frame)}
              headingId={getFrameHeadingId(frame.id)}
              align={
                frame.id === 'hero' || frame.id === 'contact'
                  ? 'center'
                  : 'start'
              }
            >
              <FrameContent frame={frame} />
            </Frame>
          ))}
        </div>
      </div>
      {children}
      <FrameEndHint />
      <ZoomControls />
      <CurrentFrameTracker frameIds={FRAME_IDS} />
      <FrameAddressSync titles={getFrameDocumentTitles()} />
      <CameraController frameIds={FRAME_IDS} />
      <SwipeController frameIds={FRAME_IDS} />
    </main>
  );
}
