import type { ComponentPropsWithoutRef } from 'react';
import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'>;

export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return <span className={rootClassName} {...props} />;
}
