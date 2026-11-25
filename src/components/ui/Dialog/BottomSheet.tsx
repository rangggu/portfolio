'use client';

import { useId } from 'react';
import type { ModalProps } from './Dialog';
import { ModalContent } from './ModalContent';
import { useModalDialog } from './useModalDialog';
import styles from './BottomSheet.module.css';

/**
 * 화면 아래에 붙는 시트 (네이티브 <dialog>). 접근성·닫기 규칙은 Dialog와 같다.
 * 기기에 따라 Dialog와 BottomSheet 중 무엇을 쓸지는 쓰는 쪽이 고른다.
 */
export function BottomSheet({
  open,
  onClose,
  title,
  description,
  footer,
  actions,
  focusContent,
  className,
  children,
  ...props
}: ModalProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const { ref, dialogProps } = useModalDialog({ open, onClose });
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <dialog
      ref={ref}
      className={rootClassName}
      data-modal
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      {...dialogProps}
      {...props}
    >
      <div className={styles.panel}>
        {/* 끌어 내릴 수 있어 보이는 손잡이 모양 (장식) */}
        <span className={styles.handle} aria-hidden="true" />
        <ModalContent
          titleId={titleId}
          descriptionId={descriptionId}
          title={title}
          description={description}
          footer={footer}
          actions={actions}
          focusContent={focusContent}
          onClose={onClose}
        >
          {children}
        </ModalContent>
      </div>
    </dialog>
  );
}
