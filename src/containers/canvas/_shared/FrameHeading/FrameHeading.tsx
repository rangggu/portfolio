import { Heading } from '@/components/ui/Heading/Heading';
import { Text } from '@/components/ui/Text/Text';
import styles from './FrameHeading.module.css';

interface FrameHeadingProps {
  /** 섹션 번호. 예: `01` */
  number: string;
  title: string;
  /** 제목 요소의 id (section의 접근 가능한 이름) */
  id: string;
}

/** 프레임 안 섹션 머리: 고정폭 번호 + 제목. 위 선은 없다 (프레임 테두리가 이미 영역을 나눈다) (mockup-spec.md 프레임 안 공통) */
export function FrameHeading({ number, title, id }: FrameHeadingProps) {
  return (
    <div className={styles.root}>
      <Text as="span" variant="monoMd" tone="tertiary" aria-hidden="true">
        {number}
      </Text>
      <Heading level={2} id={id}>
        {title}
      </Heading>
    </div>
  );
}
