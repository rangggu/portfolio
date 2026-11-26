import type { ComponentPropsWithoutRef, Ref } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  'aria-label': string;
  variant?: 'ghost' | 'surface';
  ref?: Ref<HTMLButtonElement>;
}

export function IconButton({
  variant = 'ghost',
  className,
  ...props
}: IconButtonProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return <button className={rootClassName} data-variant={variant} {...props} />;
}
