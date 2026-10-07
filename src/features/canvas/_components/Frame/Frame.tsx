import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import styles from './Frame.module.css';

interface FrameProps {
  id: string;
  number: string;
  label: string;
  /** 프레임 제목 요소의 id (section의 접근 가능한 이름) */
  headingId: string;
  /** 프레임 안 내용의 세로 정렬. 첫 화면만 center */
  align?: 'start' | 'center';
  children: React.ReactNode;
}

export function Frame({
  id,
  number,
  label,
  headingId,
  align = 'start',
  children,
}: FrameProps) {
  return (
    <section
      id={id}
      className={styles.root}
      data-align={align}
      aria-labelledby={headingId}
    >
      {/* 피그마 프레임 이름표. 제목은 프레임 안에 따로 있어 보조기기에서는 숨긴다 */}
      <Text
        variant="caption"
        tone="tertiary"
        className={styles.label}
        aria-hidden="true"
      >
        <Text as="span" variant="monoSm">
          {number}
        </Text>{' '}
        {label}
      </Text>
      <div className={styles.surface}>
        <Container>{children}</Container>
      </div>
    </section>
  );
}
