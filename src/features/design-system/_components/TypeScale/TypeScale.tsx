import { Text, type TextVariant } from '@/components/ui/Text';
import styles from './TypeScale.module.css';

/** typography.module.css의 텍스트 스타일 (TextVariant와 같은 순서) */
const VARIANTS: { variant: TextVariant; usage: string }[] = [
  { variant: 'display', usage: '첫 화면 큰 제목' },
  { variant: 'headingXl', usage: 'h1' },
  { variant: 'headingLg', usage: 'h2' },
  { variant: 'headingMd', usage: 'h3' },
  { variant: 'headingSm', usage: 'h4, 카드 제목' },
  { variant: 'bodyLg', usage: '강조 본문' },
  { variant: 'bodyMd', usage: '본문' },
  { variant: 'bodySm', usage: '보조 본문' },
  { variant: 'labelMd', usage: '버튼, 라벨' },
  { variant: 'labelSm', usage: '칩, 태그' },
  { variant: 'caption', usage: '부가 설명' },
  { variant: 'monoMd', usage: '연도, 기간' },
  { variant: 'monoSm', usage: '작은 고정폭' },
];

/** 텍스트 스타일 13개. 컴포넌트는 크기 토큰 대신 이 스타일을 쓴다 (Text·Heading 또는 composes) */
export function TypeScale() {
  return (
    <ul className={styles.root}>
      {VARIANTS.map(({ variant, usage }) => (
        <li key={variant} className={styles.item}>
          <span className={styles.meta}>
            <code>{variant}</code>
            <span>{usage}</span>
          </span>
          <Text as="span" variant={variant}>
            작은 불편을 그냥 지나치지 않습니다
          </Text>
        </li>
      ))}
    </ul>
  );
}
