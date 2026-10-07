import type { ComponentPropsWithoutRef, Ref } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const sizeClass = size === 'sm' ? styles.sizeSm : styles.sizeMd;
  const rootClassName = className ? `${sizeClass} ${className}` : sizeClass;

  return (
    <button
      className={rootClassName}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}
