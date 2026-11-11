import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { getAllProjectMeta, type ProjectMeta } from '@/lib/content/projects';
import { formatPeriod } from '@/lib/format/period';
import { DevPlaceholder } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import styles from './ProjectsFrame.module.css';

interface ProjectsFrameProps {
  headingId: string;
  number: string;
  title: string;
}

function ProjectRow({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const meta = [formatPeriod(project.period), ...project.tags].join(' · ');

  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        variant="plain"
        className={styles.row}
      >
        <Text as="span" variant="monoMd" tone="tertiary" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </Text>
        <div className={styles.main}>
          <div className={styles.titleRow}>
            <Heading level={3} variant="headingMd">
              {project.title}
            </Heading>
            {project.draft && (
              <Text as="span" variant="caption" tone="accent">
                초안
              </Text>
            )}
          </div>
          <Text variant="bodyMd" tone="secondary">
            {project.summary}
          </Text>
        </div>
        <Text
          as="span"
          variant="monoSm"
          tone="secondary"
          className={styles.meta}
        >
          {meta}
        </Text>
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
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
