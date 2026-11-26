import { Heading } from '@/components/ui/Heading/Heading';
import { Prose } from '@/components/ui/Prose/Prose';
import { Stack } from '@/components/ui/Stack/Stack';
import { Text } from '@/components/ui/Text/Text';
import type { ProjectMeta } from '@/lib/content/projects';
import { formatPeriod } from '@/lib/format/period';

import styles from './CaseStudyArticle.module.css';

interface CaseStudyArticleProps {
  meta: ProjectMeta;
  /** page: 단독 페이지. modal: 캔버스 위 모달 (제목 바가 제목이라 큰 제목(h1)을 그리지 않고 위아래 여백을 줄인다) */
  layout?: 'page' | 'modal';
  /** 컴파일된 MDX 본문 */
  children: React.ReactNode;
}

export function CaseStudyArticle({
  meta,
  layout = 'page',
  children,
}: CaseStudyArticleProps) {
  return (
    <article className={styles.root} data-layout={layout}>
      <Prose>
        <Stack as="header" gap="16" className={styles.header}>
          <Text as="span" variant="monoSm" tone="tertiary">
            <time dateTime={meta.period.start}>
              {formatPeriod(meta.period)}
            </time>
            {/* 초안은 개발 서버에서만 렌더링된다 */}
            {meta.draft && <span className={styles.draft}>초안</span>}
          </Text>
          {layout === 'page' && (
            <Heading level={1} variant="headingLg">
              {meta.title}
            </Heading>
          )}
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
