import { mdxComponents } from '@/components/mdx/mdxComponents';
import { CaseStudyArticle } from '@/features/case-study';
import {
  getAllProjectMeta,
  getProjectContent,
  type ProjectMeta,
} from '@/lib/content/projects';
import { formatPeriod, formatYearMonth } from '@/lib/format/period';
import { filled, isTodo, RESUME, type CompanyTimelineItem } from '@/lib/resume';
import { isIntroParagraphFilled, toIntroSegments } from '@/lib/resume/intro';
import { groupSkills } from '@/lib/resume/skills';
import { getTimelineEntries } from '@/lib/resume/timeline';
import { SITE } from '@/lib/site';
import styles from './ResumeDocument.module.css';

/** 종이에 적는 주소 (프로토콜·www 없이, 짧게) */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

/** 부록: 프로젝트 글 전체. 글마다 새 쪽에서 시작한다 */
async function Appendix({ projects }: { projects: ProjectMeta[] }) {
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

/**
 * A4 이력서 (docs/product.md 「인쇄」). 캔버스와 같은 이력서 데이터(content/resume)와 프로젝트 글을 쓴다.
 * 비어 있는(TODO) 값과 항목은 싣지 않는다. 경력은 회사 경력만, 최근 순.
 * 이력서 뒤에는 부록으로 프로젝트 글 전체를 붙이고, 프로젝트 카드에 부록 번호를 적는다.
 * 인쇄 전용(PrintResume)과 개발 미리보기(/resume)가 함께 쓴다.
 */
export async function ResumeDocument() {
  const { profile, intro, education, certifications } = RESUME;
  const entries = await getTimelineEntries();
  const projects = await getAllProjectMeta();
  const skillGroups = groupSkills(RESUME.skills);
  /** 부록 번호 = 프로젝트 목록 순서 (1부터) */
  const appendixNumber = (slug: string) =>
    projects.findIndex((project) => project.slug === slug) + 1;

  const companies = entries
    .filter(
      (entry): entry is typeof entry & { item: CompanyTimelineItem } =>
        entry.item.lane === 'company',
    )
    .filter(({ item }) => !isTodo(item.period.start))
    .sort((a, b) => b.item.period.start.localeCompare(a.item.period.start));
  const paragraphs = intro.filter(isIntroParagraphFilled);
  const email = filled(profile.email);
  const github = profile.links.find((link) => link.type === 'github');
  const contacts = [
    email && { label: '이메일', value: email, href: `mailto:${email}` },
    github && {
      label: 'GitHub',
      value: displayUrl(github.url),
      href: github.url,
    },
    { label: '포트폴리오', value: displayUrl(SITE.url), href: SITE.url },
  ].filter((contact) => Boolean(contact)) as {
    label: string;
    value: string;
    href: string;
  }[];
  const schools = education.filter((item) => !isTodo(item.school));
  const licenses = certifications.filter((item) => !isTodo(item.name));

  return (
    <article className={styles.root} aria-label={`${profile.name} 이력서`}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.jobTitle}>{profile.jobTitle}</p>
        </div>
        <p className={styles.tagline}>{profile.tagline}</p>
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <li key={contact.label} className={styles.contact}>
              <span className={styles.contactLabel}>{contact.label}</span>
              <a
                href={contact.href}
                className={styles.contactValue}
                data-print-url="none"
              >
                {contact.value}
              </a>
            </li>
          ))}
        </ul>
      </header>

      {paragraphs.length > 0 && (
        <Section id="resume-intro" title="소개">
          <div className={styles.callout}>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>
                {toIntroSegments(paragraph)
                  .map((segment) =>
                    typeof segment === 'string' ? segment : segment.text,
                  )
                  .join('')}
              </p>
            ))}
          </div>
        </Section>
      )}

      {companies.length > 0 && (
        <Section id="resume-career" title="경력">
          <ol className={styles.list}>
            {companies.map(({ item, projects: linked }) => {
              const role = filled(item.role);
              const summary = filled(item.summary);
              return (
                <li key={item.id} className={styles.company}>
                  <div className={styles.itemHead}>
                    <h3 className={styles.itemTitle}>
                      {item.name}
                      {role && <span className={styles.role}>{role}</span>}
                    </h3>
                    <span className={styles.period}>
                      {formatPeriod(item.period)}
                    </span>
                  </div>
                  {summary && <p className={styles.summary}>{summary}</p>}
                  {item.achievements.length > 0 && (
                    <ul className={styles.achievements}>
                      {item.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                  {linked.length > 0 && (
                    <p className={styles.linked}>
                      <span className={styles.linkedLabel}>관련 프로젝트</span>
                      {linked
                        .map(
                          (project) =>
                            `${project.title} (부록 ${appendixNumber(project.slug)})`,
                        )
                        .join(' · ')}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </Section>
      )}

      {projects.length > 0 && (
        <Section id="resume-projects" title="프로젝트">
          <ul className={styles.cards}>
            {projects.map((project, index) => (
              <li key={project.slug} className={styles.card}>
                <div className={styles.itemHead}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={styles.period}>
                    {formatPeriod(project.period)}
                  </span>
                </div>
                <p className={styles.summary}>{project.summary}</p>
                <p className={styles.tags}>{project.tags.join(' · ')}</p>
                <p className={styles.cardFoot}>
                  <a
                    href={`${SITE.url}/projects/${project.slug}`}
                    className={styles.cardUrl}
                    data-print-url="none"
                  >
                    {displayUrl(`${SITE.url}/projects/${project.slug}`)}
                  </a>
                  <span className={styles.appendixRef}>부록 {index + 1} →</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {skillGroups.length > 0 && (
        <Section id="resume-skills" title="기술">
          <dl className={styles.skills}>
            {skillGroups.map((group) => (
              <div key={group.category} className={styles.skillRow}>
                <dt className={styles.skillLabel}>{group.label}</dt>
                <dd className={styles.skillChips}>
                  {group.skills.map((skill) => (
                    <span key={skill} className={styles.chip}>
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {(schools.length > 0 || licenses.length > 0) && (
        <Section id="resume-education" title="학력·자격">
          <ul className={styles.rows}>
            {schools.map((school) => (
              <li key={school.school} className={styles.row}>
                <span className={styles.rowMain}>
                  <strong>{school.school}</strong> {school.major} ·{' '}
                  {school.degree}
                </span>
                <span className={styles.period}>
                  {formatPeriod(school.period)}
                </span>
              </li>
            ))}
            {licenses.map((license) => (
              <li key={license.name} className={styles.row}>
                <span className={styles.rowMain}>
                  <strong>{license.name}</strong> {license.issuer}
                </span>
                <span className={styles.period}>
                  {formatYearMonth(license.date)}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {projects.length > 0 && <Appendix projects={projects} />}
    </article>
  );
}
