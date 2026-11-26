import { getAllProjectMeta } from '@/lib/content/projects';
import { DevPlaceholder } from '../../_shared/DevPlaceholder/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading/FrameHeading';
import { ProjectRow } from './_components/ProjectRow/ProjectRow';
import styles from './ProjectsFrame.module.css';

interface ProjectsFrameProps {
  headingId: string;
  number: string;
  title: string;
}

/**
 * 프로젝트 프레임: 케이스 스터디 행 목록 (mockup-spec.md 「프로젝트」).
 * 행 전체가 /projects/[slug] 링크다. 초안은 개발 서버에서만 목록에 있다.
 */
export async function ProjectsFrame({
  headingId,
  number,
  title,
}: ProjectsFrameProps) {
  const projects = await getAllProjectMeta();

  return (
    <div className={styles.root}>
      <FrameHeading number={number} title={title} id={headingId} />
      {projects.length > 0 ? (
        <ol className={styles.list}>
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </ol>
      ) : (
        <DevPlaceholder variant="block">
          프로젝트 글 (content/projects/*.mdx)
        </DevPlaceholder>
      )}
    </div>
  );
}
