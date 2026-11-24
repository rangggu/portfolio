'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ToastItem } from '@/lib/ui/toastQueue';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { MODAL_CHANGE_EVENT } from '../Dialog/useModalDialog';
import { dismissToast, useToasts } from './toastStore';
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

const TONE_LABEL = { success: '완료', danger: '오류' } as const;

const TONE_ICON = {
  success: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  danger: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.5" />
    </svg>
  ),
} as const;

function ToastMessage({ item }: { item: ToastItem }) {
  const ref = useRef<HTMLLIElement>(null);
  const [paused, setPaused] = useState(false);

  // 마우스가 올라가 있거나 안에 포커스가 있으면 멈춘다 (li는 상호작용 요소가 아니라 이벤트를 직접 단다)
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const pause = () => setPaused(true);
    const resume = () => setPaused(false);
    element.addEventListener('pointerenter', pause);
    element.addEventListener('pointerleave', resume);
    element.addEventListener('focusin', pause);
    element.addEventListener('focusout', resume);
    return () => {
      element.removeEventListener('pointerenter', pause);
      element.removeEventListener('pointerleave', resume);
      element.removeEventListener('focusin', pause);
      element.removeEventListener('focusout', resume);
    };
  }, []);

  // 멈췄다가 다시 시작하면 처음부터 센다
  useEffect(() => {
    if (paused || item.leaving) return;
    const timer = window.setTimeout(() => dismissToast(item.id), item.duration);
    return () => window.clearTimeout(timer);
  }, [paused, item.id, item.duration, item.leaving]);

  return (
    <li
      ref={ref}
      className={styles.toast}
      data-tone={item.tone}
      data-leaving={item.leaving || undefined}
      role={item.tone === 'danger' ? 'alert' : undefined}
    >
      {item.tone !== 'neutral' && (
        <Icon
          size="sm"
          className={styles.toneIcon}
          label={TONE_LABEL[item.tone]}
        >
          {TONE_ICON[item.tone]}
        </Icon>
      )}
      <span className={styles.message}>{item.message}</span>
      <IconButton
        aria-label="알림 닫기"
        type="button"
        className={styles.close}
        onClick={() => dismissToast(item.id)}
      >
        <Icon size="sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </Icon>
      </IconButton>
    </li>
  );
}
