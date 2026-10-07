import typography from '@/styles/typography.module.css';

/** typography.module.css의 텍스트 스타일 13개 */
export type TextVariant =
  | 'display'
  | 'headingXl'
  | 'headingLg'
  | 'headingMd'
  | 'headingSm'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'labelMd'
  | 'labelSm'
  | 'caption'
  | 'monoMd'
  | 'monoSm';

export type TextTone = 'primary' | 'secondary' | 'tertiary' | 'accent';

/**
 * 텍스트 스타일 클래스를 고른다.
 * composes는 단순 클래스 선택자에서만 쓸 수 있어 data-*로 고를 수 없다 (styling.md 예외 참고).
 */
export function getTextVariantClassName(variant: TextVariant): string {
  return typography[variant] ?? '';
}
