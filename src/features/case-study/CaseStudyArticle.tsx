import { Heading } from '@/components/ui/Heading';
import { Prose } from '@/components/ui/Prose';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import type { ProjectMeta } from '@/lib/content/projects';
import { formatPeriod } from '@/lib/format/period';

import styles from './CaseStudyArticle.module.css';

interface CaseStudyArticleProps {
  meta: ProjectMeta;
  /** 컴파일된 MDX 본문 */
  children: React.ReactNode;
}

export function CaseStudyArticle({ meta, children }: CaseStudyArticleProps) {
  return (
    <article className={styles.root}>
      <Prose>
        <Stack as="header" gap="16" className={styles.header}>
          <Text as="span" variant="monoSm" tone="tertiary">
            <time dateTime={meta.period.start}>
              {formatPeriod(meta.period)}
            </time>
            {/* 초안은 개발 서버에서만 렌더링된다 */}
            {meta.draft && <span className={styles.draft}>초안</span>}
          </Text>
          <Heading level={1} variant="headingLg">
            {meta.title}
          </Heading>
          <Text variant="bodyLg" tone="secondary">
            {meta.summary}
          </Text>
          <Stack as="ul" direction="row" gap="8" wrap aria-label="기술 태그">
            {meta.tags.map((tag) => (
              <li key={tag}>
                <Text as="span" variant="labelSm" className={styles.tag}>
                  {tag}
                </Text>
              </li>
            ))}
          </Stack>
        </Stack>
        {children}
      </Prose>
    </article>
  );
}
