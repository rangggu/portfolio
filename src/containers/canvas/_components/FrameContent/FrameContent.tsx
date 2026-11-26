import { getFrameHeadingId, type CanvasFrame } from '../../_lib/frames';
import { AboutFrame } from '../../_frames/AboutFrame/AboutFrame';
import { CareerFrame } from '../../_frames/CareerFrame/CareerFrame';
import { ContactFrame } from '../../_frames/ContactFrame/ContactFrame';
import { EducationFrame } from '../../_frames/EducationFrame/EducationFrame';
import { HeroFrame } from '../../_frames/HeroFrame/HeroFrame';
import { ProjectsFrame } from '../../_frames/ProjectsFrame/ProjectsFrame';
import { SkillsFrame } from '../../_frames/SkillsFrame/SkillsFrame';

/** 프레임 id에 맞는 프레임 내용을 고른다 (Canvas가 FRAMES 순서대로 Frame 안에 넣는다) */
export function FrameContent({ frame }: { frame: CanvasFrame }) {
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
      return <ContactFrame headingId={headingId} title={frame.label} />;
  }
}
