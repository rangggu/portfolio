import { Link } from '@/components/ui/Link/Link';
import type { TimelineEntry } from '@/lib/resume/timeline';
import styles from './ItemLinks.module.css';

/** 항목 링크 + 연결된 케이스 스터디 글 */
export function ItemLinks({ entry }: { entry: TimelineEntry }) {
  const { item, projects } = entry;
  if (item.links.length === 0 && projects.length === 0) return null;

  return (
    <ul className={styles.links}>
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={`/projects/${project.slug}`}>{project.title} →</Link>
        </li>
      ))}
      {item.links.map((link) => (
        <li key={link.url}>
          <Link href={link.url}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
