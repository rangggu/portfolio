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
  /** 제목 바에서 닫기 버튼 앞에 놓는 요소 (아이콘 버튼·링크) */
  actions?: React.ReactNode;
  /** 열 때 첫 버튼 대신 내용 영역에 포커스 (긴 글 읽기: 바로 방향키로 스크롤) */
  focusContent?: boolean;
}

interface DialogProps extends ModalProps {
  /** 최대 폭. 좁은 화면에서는 화면 폭에 맞춰 줄어든다. xl: 긴 글 + 여백 메모 열 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  actions,
  focusContent,
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
