'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_CHANGE_EVENT } from '../Dialog/useModalDialog';
import { ToastMessage } from './_components/ToastMessage/ToastMessage';
import { useToasts } from './toastStore';
import styles from './Toast.module.css';

/**
 * 토스트 표시 영역. 루트 레이아웃에 하나 둔다.
 * - 영역은 aria-live="polite"로 항상 있어서 새 알림을 보조기기가 읽는다 (danger는 role="alert"로 바로 읽는다)
 * - Popover API로 맨 위 레이어에 띄워 열린 <dialog> 위에도 보이고, 새 알림이 오면 다시 띄워 맨 위로 올린다
 * - 모달이 열려 있으면 그 바깥은 inert라 누를 수도 읽힐 수도 없으므로, 영역을 맨 위 모달 안으로 옮긴다
 */
export function Toaster() {
  const toasts = useToasts();
  const regionRef = useRef<HTMLOListElement>(null);
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);
  const latestId = toasts.at(-1)?.id;
  const hasToasts = toasts.length > 0;

  useEffect(() => {
    const sync = () => {
      const modals = document.querySelectorAll<HTMLDialogElement>(
        'dialog[data-modal][open]',
      );
      setModal(modals[modals.length - 1] ?? null);
    };
    // 늦게 불러와졌을 때 이미 열려 있는 모달도 찾는다
    sync();
    window.addEventListener(MODAL_CHANGE_EVENT, sync);
    return () => window.removeEventListener(MODAL_CHANGE_EVENT, sync);
  }, []);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    if (region.matches(':popover-open')) region.hidePopover();
    if (hasToasts) region.showPopover();
  }, [hasToasts, latestId, modal]);

  const region = (
    <ol
      ref={regionRef}
      popover="manual"
      aria-live="polite"
      aria-label="알림"
      className={styles.region}
    >
      {toasts.map((item) => (
        <ToastMessage key={item.id} item={item} />
      ))}
    </ol>
  );

  return modal ? createPortal(region, modal) : region;
}
