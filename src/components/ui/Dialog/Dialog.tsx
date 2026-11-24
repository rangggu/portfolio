'use client';

import { useId, type ComponentPropsWithoutRef } from 'react';
import { ModalContent } from './ModalContent';
import { useModalDialog } from './useModalDialog';
import styles from './Dialog.module.css';

export interface ModalProps extends Omit<
  ComponentPropsWithoutRef<'dialog'>,
  'open' | 'title' | 'onClose' | 'onCancel'
> {
  open: boolean;
  /** Esc, 바깥 누르기, 닫기 버튼에서 부른다. 부모가 open을 false로 바꿔 닫는다 */
  onClose: () => void;
  /** 제목 (h2, aria-labelledby로 연결) */
  title: string;
  /** 제목 아래 짧은 설명 (aria-describedby로 연결) */
  description?: string;
  /** 아래 버튼 영역 */
  footer?: React.ReactNode;
}

interface DialogProps extends ModalProps {
  /** 최대 폭. 좁은 화면에서는 화면 폭에 맞춰 줄어든다 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 화면 가운데 모달 (네이티브 <dialog>). 폰처럼 좁은 화면에서는 쓰는 쪽이 BottomSheet를 고른다.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  footer,
  size = 'md',
  className,
  children,
  ...props
}: DialogProps) {
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
      data-size={size}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      {...dialogProps}
      {...props}
    >
      <div className={styles.panel}>
        <ModalContent
          titleId={titleId}
          descriptionId={descriptionId}
          title={title}
          description={description}
          footer={footer}
          onClose={onClose}
        >
          {children}
        </ModalContent>
      </div>
    </dialog>
  );
}
