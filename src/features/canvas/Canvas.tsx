import { AboutFrame } from './_components/AboutFrame';
import { CareerFrame } from './_components/CareerFrame';
import { ContactFrame } from './_components/ContactFrame';
import { CurrentFrameTracker } from './_components/CurrentFrameTracker';
import { EducationFrame } from './_components/EducationFrame';
import { Frame } from './_components/Frame';
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
