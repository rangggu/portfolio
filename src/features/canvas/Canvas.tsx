import { AboutFrame } from './_components/AboutFrame';
import { CareerFrame } from './_components/CareerFrame';
import { CurrentFrameTracker } from './_components/CurrentFrameTracker';
import { Frame } from './_components/Frame';
import { HeroFrame } from './_components/HeroFrame';
import { PlaceholderFrame } from './_components/PlaceholderFrame';
import {
  FRAME_IDS,
  FRAMES,
  getFrameHeadingId,
  getFrameLabel,
  type CanvasFrame,
} from './_lib/frames';
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
      return <CareerFrame headingId={headingId} title={frame.label} />;
    default:
      return <PlaceholderFrame headingId={headingId} title={frame.label} />;
  }
}

interface CanvasProps {
  /** 프레임들 뒤에 렌더할 내용 (라우트별 초기 프레임 스크립트) */
  children?: React.ReactNode;
}

/** 점 무늬 캔버스. 이번 단계는 카메라 이동 없이 프레임을 문서 순서대로 세로로 쌓는다. */
export function Canvas({ children }: CanvasProps) {
  return (
    <main id="main" tabIndex={-1} className={styles.root}>
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
      {children}
      <CurrentFrameTracker frameIds={FRAME_IDS} />
    </main>
  );
}
