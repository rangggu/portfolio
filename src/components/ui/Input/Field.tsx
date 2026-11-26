import { useId } from 'react';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Input.module.css';

export interface FieldProps {
  /** 입력 요소의 이름 (보이지 않게 하려면 hideLabel) */
  label: string;
  hideLabel?: boolean;
  /** 입력 아래 보조 설명 */
  description?: string;
  /** 오류 메시지. 있으면 aria-invalid와 함께 설명보다 먼저 읽힌다 */
  error?: string;
}

interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
}

interface FieldRenderProps extends FieldProps {
  /** 호출하는 쪽이 준 id (없으면 만든다) */
  id?: string;
  /** 호출하는 쪽이 준 aria-describedby (설명·오류 id 뒤에 붙인다) */
  describedBy?: string;
  className?: string;
  children: (control: FieldControlProps) => React.ReactNode;
}

/**
 * Input·Textarea가 함께 쓰는 라벨·설명·오류 배치. id를 만들어 컨트롤과 연결한다.
 * (index에서 내보내지 않는 내부 컴포넌트)
 */
export function Field({
  label,
  hideLabel = false,
  description,
  error,
  id,
  describedBy,
  className,
  children,
}: FieldRenderProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const ariaDescribedBy =
    [errorId, descriptionId, describedBy].filter(Boolean).join(' ') ||
    undefined;
  const rootClassName = className
    ? `${styles.field} ${className}`
    : styles.field;

  return (
    <div className={rootClassName}>
      <label htmlFor={controlId} className={styles.label}>
        {hideLabel ? <VisuallyHidden>{label}</VisuallyHidden> : label}
      </label>
      {children({
        id: controlId,
        'aria-describedby': ariaDescribedBy,
        ...(error ? { 'aria-invalid': true as const } : {}),
      })}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
      {description && (
        <p id={descriptionId} className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}
