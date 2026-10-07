import type { ElementType, HTMLAttributes } from 'react';
import styles from './Text.module.css';
import {
  getTextVariantClassName,
  type TextTone,
  type TextVariant,
} from './textVariant';

type TextElement = 'p' | 'span' | 'div' | 'strong' | 'small' | 'time' | 'li';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant;
  tone?: TextTone;
}

export function Text({
  as = 'p',
  variant = 'bodyMd',
  tone = 'primary',
  className,
  ...props
}: TextProps) {
  const baseClassName = `${styles.root} ${getTextVariantClassName(variant)}`;
  const rootClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  const Component: ElementType = as;

  return (
    <Component
      className={rootClassName}
      data-variant={variant}
      data-tone={tone}
      {...props}
    />
  );
}
