import { Heading } from '@/components/ui/Heading/Heading';
import { Text } from '@/components/ui/Text/Text';
import type { toTokenSections } from '../../_lib/tokenSections';
import { TokenTable } from '../TokenTable/TokenTable';
import { TypeScale } from '../TypeScale/TypeScale';
import styles from './TokenSection.module.css';

type TokenSectionProps = ReturnType<typeof toTokenSections>[number] & {
  /** 주면 이 토큰 묶음 뒤에 텍스트 스타일 견본을 이 id로 붙인다 */
  typeScaleId?: string;
};

/** 토큰 묶음 하나: 제목 · 설명 · 토큰 표 (첫 묶음 뒤에는 텍스트 스타일 견본) */
export function TokenSection({
  id,
  title,
  description,
  group,
  typeScaleId,
}: TokenSectionProps) {
  return (
    <>
      <section
        aria-labelledby={`${id}-title`}
        id={id}
        className={styles.section}
      >
        <Heading level={3} variant="headingMd" id={`${id}-title`}>
          {title}
        </Heading>
        {description && <Text tone="secondary">{description}</Text>}
        <TokenTable label={`${title} 토큰 표`} tokens={group.tokens} />
      </section>
      {typeScaleId && (
        <section
          aria-labelledby={`${typeScaleId}-title`}
          id={typeScaleId}
          className={styles.section}
        >
          <Heading level={3} variant="headingMd" id={`${typeScaleId}-title`}>
            텍스트 스타일
          </Heading>
          <Text tone="secondary">
            컴포넌트는 크기 토큰 대신 이 13개 스타일을 씁니다 (Text·Heading의
            variant, CSS의 composes).
          </Text>
          <TypeScale />
        </section>
      )}
    </>
  );
}
