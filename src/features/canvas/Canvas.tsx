import { CareerFrame } from './_components/CareerFrame';
import { Frame } from './_components/Frame';
import { HeroFrame } from './_components/HeroFrame';
import { PlaceholderFrame } from './_components/PlaceholderFrame';
import { FRAMES, getFrameHeadingId, type CanvasFrame } from './_lib/frames';
import styles from './Canvas.module.css';

function FrameContent({ frame }: { frame: CanvasFrame }) {
  const headingId = getFrameHeadingId(frame.id);

  switch (frame.id) {
    case 'hero':
      return <HeroFrame headingId={headingId} />;
    case 'career':
      return <CareerFrame headingId={headingId} title={frame.label} />;
    default:
      return <PlaceholderFrame headingId={headingId} title={frame.label} />;
  }
}

/** 점 무늬 캔버스. 이번 단계는 카메라 이동 없이 프레임을 문서 순서대로 세로로 쌓는다. */
export function Canvas() {
  return (
    <main id="main" tabIndex={-1} className={styles.root}>
      {FRAMES.map((frame) => (
        <Frame
          key={frame.id}
          id={frame.id}
          number={frame.number}
          label={frame.label}
          headingId={getFrameHeadingId(frame.id)}
          align={frame.id === 'hero' ? 'center' : 'start'}
        >
          <FrameContent frame={frame} />
        </Frame>
      ))}
    </main>
  );
}
