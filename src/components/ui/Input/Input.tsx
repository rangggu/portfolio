import type { ComponentPropsWithoutRef, Ref } from 'react';
import { Field, type FieldProps } from './Field';
import styles from './Input.module.css';

interface InputProps
  extends FieldProps, Omit<ComponentPropsWithoutRef<'input'>, 'children'> {
  ref?: Ref<HTMLInputElement>;
}

/** 한 줄 입력. 라벨·설명·오류를 id로 연결한다 (className은 바깥 배치용으로 감싸는 요소에 붙는다) */
export function Input({
  label,
  hideLabel,
  description,
  error,
  id,
  className,
  'aria-describedby': describedBy,
  type = 'text',
  ...props
}: InputProps) {
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
        <input className={styles.control} type={type} {...control} {...props} />
      )}
    </Field>
  );
}
