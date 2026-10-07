import type { ComponentPropsWithoutRef, Ref } from 'react';
import textStyles from '../Text/Text.module.css';
import {
  getTextVariantClassName,
  type TextTone,
  type TextVariant,
} from '../Text/textVariant';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends ComponentPropsWithoutRef<'h2'> {
  /** 문서 구조상 수준 (h1~h6) */
  level: HeadingLevel;
  /** 시각적 스타일. 생략하면 level별 기본값 */
  variant?: TextVariant;
  tone?: TextTone;
  ref?: Ref<HTMLHeadingElement>;
}

const DEFAULT_VARIANT: Record<HeadingLevel, TextVariant> = {
  1: 'headingXl',
  2: 'headingLg',
  3: 'headingMd',
  4: 'headingSm',
  5: 'headingSm',
  6: 'headingSm',
};

export function Heading({
  level,
  variant = DEFAULT_VARIANT[level],
  tone = 'primary',
  className,
  ...props
}: HeadingProps) {
  const Component = `h${level}` as const;
  const baseClassName = `${textStyles.root} ${getTextVariantClassName(variant)}`;
  const rootClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <Component
      className={rootClassName}
      data-variant={variant}
      data-tone={tone}
      {...props}
    />
  );
}
