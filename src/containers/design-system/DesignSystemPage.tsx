import { Container } from '@/components/ui/Container/Container';
import { Heading } from '@/components/ui/Heading/Heading';
import { Text } from '@/components/ui/Text/Text';
import { ThemeButton } from '@/components/theme/ThemeButton';
import { ComponentDoc } from './_components/ComponentDoc/ComponentDoc';
import { StickyAside } from './_components/StickyAside/StickyAside';
import { Toc } from './_components/Toc/Toc';
import { TokenSection } from './_components/TokenSection/TokenSection';
import { COMPONENT_GROUPS } from './_lib/componentDocs';
import { loadTokens } from './_lib/loadTokens';
import { toTokenSections } from './_lib/tokenSections';
import styles from './DesignSystemPage.module.css';

const TYPE_SCALE_ID = 'tokens-text-styles';

/**
 * 디자인 시스템 문서 (/dev/design-system). 토큰은 tokens.css를 빌드 때 읽어 보여 주고,
 * 컴포넌트는 src/components/ui를 실제로 렌더한다. 한 페이지에 두고 목차로 이동한다.
 */
export function DesignSystemPage() {
  const tokenSections = toTokenSections(loadTokens());
  const tokenCount = tokenSections.reduce(
    (count, section) => count + section.group.tokens.length,
    0,
  );
  const componentCount = COMPONENT_GROUPS.reduce(
    (count, group) => count + group.docs.length,
    0,
  );
  const tocGroups = [
    {
      title: '토큰',
      items: [
        ...tokenSections.slice(0, 1),
        { id: TYPE_SCALE_ID, title: '텍스트 스타일' },
        ...tokenSections.slice(1),
      ].map(({ id, title }) => ({ id, title })),
    },
    {
      title: '컴포넌트',
      items: COMPONENT_GROUPS.flatMap((group) =>
        group.docs.map(({ id, name }) => ({ id, title: name })),
      ),
    },
  ];

  return (
    <Container as="main" id="main" tabIndex={-1} className={styles.root}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <Heading level={1}>디자인 시스템</Heading>
          <ThemeButton />
        </div>
        <Text tone="secondary" className={styles.lead}>
          이 사이트가 쓰는 토큰 {tokenCount}개와 공용 컴포넌트 {componentCount}
          개입니다. 토큰 값은 src/styles/tokens.css에서 자동으로 읽고, 견본과
          예시는 지금 테마로 그려집니다. 디자인은 확정 전 임시 값입니다.
        </Text>
      </header>

      <div className={styles.layout}>
        <StickyAside className={styles.aside}>
          <Toc groups={tocGroups} />
        </StickyAside>

        <div className={styles.content}>
          <section aria-labelledby="tokens-title" className={styles.part}>
            <Heading level={2} id="tokens-title">
              토큰
            </Heading>
            {tokenSections.map((section, index) => (
              <TokenSection
                key={section.id}
                {...section}
                typeScaleId={index === 0 ? TYPE_SCALE_ID : undefined}
              />
            ))}
          </section>

          <section aria-labelledby="components-title" className={styles.part}>
            <Heading level={2} id="components-title">
              컴포넌트
            </Heading>
            {COMPONENT_GROUPS.map((group) => (
              <div key={group.id} className={styles.componentGroup}>
                <Text as="p" variant="labelMd" tone="tertiary">
                  {group.title}
                </Text>
                {group.docs.map((doc) => (
                  <ComponentDoc key={doc.id} {...doc} />
                ))}
              </div>
            ))}
          </section>
        </div>
      </div>
    </Container>
  );
}
