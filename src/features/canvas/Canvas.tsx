import { AboutFrame } from './_components/AboutFrame';
import { CameraController } from './_components/CameraController';
import { CameraScript } from './_components/CameraScript';
import { CareerFrame } from './_components/CareerFrame';
import { ContactFrame } from './_components/ContactFrame';
import { CurrentFrameTracker } from './_components/CurrentFrameTracker';
import { EducationFrame } from './_components/EducationFrame';
import { Frame } from './_components/Frame';
import { FrameAddressSync } from './_components/FrameAddressSync';
import { FrameEndHint } from './_components/FrameEndHint';
import { HeroFrame } from './_components/HeroFrame';
import { ProjectsFrame } from './_components/ProjectsFrame';
import { SkillsFrame } from './_components/SkillsFrame';
import {
  FRAME_IDS,
  FRAMES,
  getFrameHeadingId,
  getFrameLabel,
  type CanvasFrame,
} from './_lib/frames';
import { getFrameDocumentTitles } from './_lib/frameMetadata';
import styles from './Canvas.module.css';

function FrameContent({ frame }: { frame: CanvasFrame }) {
  const headingId = getFrameHeadingId(frame.id);

  switch (frame.id) {
    case 'hero':
      return <HeroFrame headingId={headingId} />;
    case 'about':
      return (
        <AboutFrame
          headingId={headingId}
          number={frame.number}
          title={frame.label}
        />
      );
    case 'career':
      return (
        <CareerFrame
          headingId={headingId}
          number={frame.number}
          title={frame.label}
        />
      );
    case 'projects':
      return (
        <ProjectsFrame
          headingId={headingId}
          number={frame.number}
          title={frame.label}
        />
      );
    case 'skills':
      return (
        <SkillsFrame
          headingId={headingId}
          number={frame.number}
          title={frame.label}
        />
      );
    case 'education':
      return (
        <EducationFrame
          headingId={headingId}
          number={frame.number}
          title={frame.label}
        />
      );
    case 'contact':
      return (
        <ContactFrame
          headingId={headingId}
          number={frame.number}
          title={frame.label}
        />
      );
  }
}

interface CanvasProps {
  /** 프레임들 뒤에 렌더할 내용 (라우트별 초기 프레임 스크립트) */
  children?: React.ReactNode;
}

/**
 * 점 무늬 캔버스. 문서는 프레임 순서대로 이어지는 세로 페이지다.
 * 카메라 모드(마우스 기기)에서는 stage가 화면에 고정되고, world 안 프레임이 지도대로 놓이며,
 * CameraController가 스크롤 위치에 맞춰 world를 옮긴다. DOM 순서는 그대로라 키보드·스크린리더 순서가 같다.
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
              align={frame.id === 'hero' ? 'center' : 'start'}
            >
              <FrameContent frame={frame} />
            </Frame>
          ))}
        </div>
      </div>
      {children}
      <FrameEndHint />
      <CurrentFrameTracker frameIds={FRAME_IDS} />
      <FrameAddressSync titles={getFrameDocumentTitles()} />
      <CameraController frameIds={FRAME_IDS} />
    </main>
  );
}
