import { Heading } from '@/components/ui/Heading/Heading';
import { Link } from '@/components/ui/Link/Link';
import { Text } from '@/components/ui/Text/Text';
import type { ProjectMeta } from '@/lib/content/projects';
import { formatPeriod } from '@/lib/format/period';
import styles from './ProjectRow.module.css';

interface ProjectRowProps {
  project: ProjectMeta;
  /** 목록 순서 (0부터, 번호는 01부터 보인다) */
  index: number;
}

/** 프로젝트 목록 한 행: 번호 · 제목·요약 · 메타 · 화살표. 행 전체가 케이스 스터디 링크 */
export function ProjectRow({ project, index }: ProjectRowProps) {
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
            <Heading level={3} variant="headingMd" className={styles.title}>
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
