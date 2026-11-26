import { mdxComponents } from '@/components/mdx/mdxComponents';
import { CaseStudyArticle } from '@/containers/case-study';
import { getProjectContent, type ProjectMeta } from '@/lib/content/projects';
import { SITE } from '@/lib/site';
import { displayUrl } from '../../_lib/displayUrl';
import styles from './Appendix.module.css';

/** 부록: 프로젝트 글 전체. 글마다 새 쪽에서 시작한다 */
export async function Appendix({ projects }: { projects: ProjectMeta[] }) {
  const contents = await Promise.all(
    projects.map((project) => getProjectContent(project.slug)),
  );

  return (
    <div className={styles.appendix}>
      {contents.map(({ meta, Content }, index) => (
        <section
          key={meta.slug}
          className={styles.appendixItem}
          aria-label={`부록 ${index + 1} ${meta.title}`}
        >
          <p className={styles.appendixLabel}>
            부록 {index + 1} · 프로젝트
            <span className={styles.appendixUrl}>
              {displayUrl(`${SITE.url}/projects/${meta.slug}`)}
            </span>
          </p>
          <CaseStudyArticle meta={meta}>
            <Content components={mdxComponents} />
          </CaseStudyArticle>
        </section>
      ))}
    </div>
  );
}
