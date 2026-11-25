'use client';

import { useEffect, useRef, type MouseEvent, type PointerEvent } from 'react';

/**
 * 모달이 열리거나 닫힐 때 window에 보내는 이벤트.
 * 모달 바깥은 inert가 되므로 Toaster가 이 이벤트를 듣고 알림 영역을 열린 모달 안으로 옮긴다
 */
export const MODAL_CHANGE_EVENT = 'modalchange';

interface UseModalDialogOptions {
  open: boolean;
  onClose: () => void;
}

/**
 * Dialog·BottomSheet가 함께 쓰는 <dialog> 열기·닫기 (docs/conventions/component-patterns.md 「접근성」).
 * - open이 true면 showModal(): 배경이 inert가 되고 Tab이 안에서만 돈다. 닫으면 브라우저가 연 요소로 포커스를 돌려준다
 * - 닫기 경로(Esc, 바깥 누르기, 닫기 버튼)는 모두 onClose()를 부르고, 실제로 닫는 건 부모가 open을 false로 바꿀 때다
 * - 열고 닫는 모션은 CSS(@starting-style, allow-discrete)가 맡는다. 지원하지 않는 브라우저에서는 바로 닫힌다
 */
export function useModalDialog({ open, onClose }: UseModalDialogOptions) {
  const ref = useRef<HTMLDialogElement>(null);
  /** 누르기 시작한 곳도 바깥이어야 닫는다 (안에서 끌어 바깥에서 뗀 경우는 무시) */
  const pressedOutsideRef = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal()은 첫 버튼에 포커스를 준다. 내용 영역을 고른 모달이면 그쪽으로 옮긴다 (focusContent)
      dialog.querySelector<HTMLElement>('[data-modal-initial-focus]')?.focus();
      window.dispatchEvent(new Event(MODAL_CHANGE_EVENT));
    }
    if (!open && dialog.open) {
      dialog.close();
      window.dispatchEvent(new Event(MODAL_CHANGE_EVENT));
    }
  }, [open]);

  // 열린 채로 사라지면(페이지 이동 등) 닫힌 것으로 알린다
  useEffect(
    () => () => {
      if (ref.current?.open)
        window.dispatchEvent(new Event(MODAL_CHANGE_EVENT));
    },
    [],
  );

  // Esc: 브라우저가 바로 닫지 않게 막고 부모에게 맡긴다
  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  // 브라우저가 스스로 닫은 경우(반복된 Esc 등)에도 부모 상태를 맞춘다
  const handleClose = () => {
    if (open) onClose();
  };

  // ::backdrop을 누르면 이벤트 대상이 <dialog> 자신이다 (내용은 안쪽 패널이 감싸고 있다)
  const handlePointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    pressedOutsideRef.current = event.target === event.currentTarget;
  };

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    const isOutside =
      event.target === event.currentTarget && pressedOutsideRef.current;
    pressedOutsideRef.current = false;
    if (isOutside) onClose();
  };

  return {
    ref,
    dialogProps: {
      onCancel: handleCancel,
      onClose: handleClose,
      onPointerDown: handlePointerDown,
      onClick: handleClick,
    },
  };
}
