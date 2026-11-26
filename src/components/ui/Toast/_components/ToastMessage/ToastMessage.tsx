'use client';

import { useEffect, useRef, useState } from 'react';
import type { ToastItem } from '@/lib/ui/toastQueue';
import { Icon } from '../../../Icon/Icon';
import { IconButton } from '../../../IconButton/IconButton';
import { dismissToast } from '../../toastStore';
import styles from './ToastMessage.module.css';

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

/** 알림 한 줄: 상태 아이콘 · 문장 · 닫기. 마우스·포커스가 있으면 사라지기를 멈춘다 */
export function ToastMessage({ item }: { item: ToastItem }) {
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
