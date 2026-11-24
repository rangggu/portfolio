'use client';

import { useSyncExternalStore } from 'react';
import { DURATION } from '@/lib/motion/tokens';
import {
  addToast,
  markLeaving,
  removeToast,
  type ToastItem,
  type ToastTone,
} from '@/lib/ui/toastQueue';

/**
 * 토스트 상태. 어디서든 toast()로 띄우고, 루트 레이아웃의 <Toaster />가 그린다.
 * Toaster가 없는 화면에서 불러도 목록에만 쌓이고 아무 일도 일어나지 않는다.
 */

/** 기본 표시 시간: 한두 문장을 읽을 시간 (디자인 값이 아니라 동작 값) */
const DEFAULT_DURATION = 4000;
/** 사라지는 모션 시간 (--motion-toast-duration과 같다) */
const LEAVE_DURATION = DURATION.normal;

let toasts: ToastItem[] = [];
let nextId = 0;
const listeners = new Set<() => void>();
const EMPTY: ToastItem[] = [];

function setToasts(next: ToastItem[]) {
  toasts = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

interface ToastOptions {
  tone?: ToastTone;
  /** 자동으로 사라지기까지 (ms) */
  duration?: number;
}

/** 짧은 알림을 띄운다. 닫을 때 쓸 id를 돌려준다 */
export function toast(
  message: string,
  { tone = 'neutral', duration = DEFAULT_DURATION }: ToastOptions = {},
): string {
  nextId += 1;
  const id = `toast-${nextId}`;
  setToasts(addToast(toasts, { id, message, tone, duration }));
  return id;
}

/** 사라지는 모션을 보인 뒤 지운다 */
export function dismissToast(id: string) {
  setToasts(markLeaving(toasts, id));
  window.setTimeout(() => setToasts(removeToast(toasts, id)), LEAVE_DURATION);
}

export function useToasts(): ToastItem[] {
  return useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  );
}
