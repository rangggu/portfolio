import type { CSSProperties } from 'react';
import { tokenKind, type TokenKind } from '@/lib/design-tokens/parseTokens';
import { MeasuredBar } from './MeasuredBar';
import styles from './TokenPreview.module.css';

interface TokenPreviewProps {
  name: string;
}

/** 견본 모양: 종류별로 토큰을 어디에 적용할지 */
const SHAPE: Partial<Record<TokenKind, string>> = {
  color: 'fill',
  'color-bg': 'fill',
  gradient: 'gradient',
  'color-text': 'text',
  'color-border': 'border',
  shadow: 'shadow',
  spacing: 'bar',
  size: 'bar',
  radius: 'radius',
  'border-width': 'line',
  'font-family': 'font-family',
  'font-size': 'font-size',
  'font-weight': 'font-weight',
  'line-height': 'line-height',
  'letter-spacing': 'letter-spacing',
  duration: 'duration',
  ease: 'ease',
};

const SAMPLE_TEXT: Partial<Record<string, string>> = {
  text: '가',
  'font-family': '가나다 Aa 123',
  'font-size': '가Aa',
  'font-weight': '가Aa',
  'line-height': '줄 높이\n두 번째 줄',
  'letter-spacing': '자간 Aa',
};

/**
 * 토큰 견본. 값을 복사하지 않고 var(--토큰)을 --preview 변수로 넘겨 그린다
 * (테마를 바꾸면 견본도 바뀐다). 견본이 없는 종류(z-index 등)는 그리지 않는다.
 * 모션 견본은 장식이라 그 줄에 마우스를 올리면 움직인다 (값은 표 글자로 읽힌다).
 */
export function TokenPreview({ name }: TokenPreviewProps) {
  const shape = SHAPE[tokenKind(name)];
  if (!shape) return null;

  // 문서 페이지만의 예외: 토큰 이름을 동적으로 꽂으려면 인라인 변수 하나가 필요하다 (styling.md)
  const style = { '--preview': `var(${name})` } as CSSProperties;
  const sample = SAMPLE_TEXT[shape];
  const isMotion = shape === 'duration' || shape === 'ease';

  const sampleClass =
    shape === 'text'
      ? styles.headingSample
      : shape === 'line-height'
        ? styles.bodySample
        : undefined;
  const rootClassName = sampleClass
    ? `${styles.root} ${sampleClass}`
    : styles.root;

  // 반전·포인트 배경 위에 쓰는 글자색은 그 배경 위에 그린다
  const backdrop = name.includes('inverse')
    ? 'inverse'
    : name.includes('on-accent')
      ? 'accent'
      : undefined;

  return (
    <span
      className={rootClassName}
      data-shape={shape}
      data-backdrop={backdrop}
      style={style}
      aria-hidden="true"
    >
      {shape === 'bar' && <MeasuredBar />}
      {sample ?? (isMotion && <span className={styles.dot} />)}
    </span>
  );
}
