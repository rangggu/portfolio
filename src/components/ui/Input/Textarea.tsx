import type { ComponentPropsWithoutRef, Ref } from 'react';
import { Field, type FieldProps } from './Field';
import styles from './Input.module.css';

interface TextareaProps
  extends FieldProps, Omit<ComponentPropsWithoutRef<'textarea'>, 'children'> {
  ref?: Ref<HTMLTextAreaElement>;
}

/** 여러 줄 입력. 높이는 rows(기본 4)로 정하고 세로로만 늘일 수 있다 */
export function Textarea({
  label,
  hideLabel,
  description,
  error,
  id,
  className,
  'aria-describedby': describedBy,
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <Field
      label={label}
      hideLabel={hideLabel}
      description={description}
      error={error}
      id={id}
      describedBy={describedBy}
      className={className}
    >
      {(control) => (
        <textarea
          className={`${styles.control} ${styles.textarea}`}
          rows={rows}
          {...control}
          {...props}
        />
      )}
    </Field>
  );
}
