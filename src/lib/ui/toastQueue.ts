/**
 * 토스트 목록 계산 (Toast의 toast()·Toaster가 쓴다). 화면·타이머 없이 목록만 바꾼다.
 * - 새 토스트는 아래(목록 끝)에 붙고, 최대 개수를 넘으면 오래된 것부터 빠진다
 * - 닫을 때는 먼저 leaving으로 표시해 사라지는 모션을 보인 뒤 목록에서 지운다
 */

export type ToastTone = 'neutral' | 'success' | 'danger';

export interface ToastItem {
  id: string;
  message: string;
  tone: ToastTone;
  /** 자동으로 사라지기까지 (ms) */
  duration: number;
  leaving: boolean;
}

/** 한 번에 보이는 최대 개수 */
export const MAX_TOASTS = 3;

export function addToast(
  list: readonly ToastItem[],
  toast: Omit<ToastItem, 'leaving'>,
  max = MAX_TOASTS,
): ToastItem[] {
  const next = [...list, { ...toast, leaving: false }];
  const visible = next.filter((item) => !item.leaving);
  const overflow = visible.length - max;
  if (overflow <= 0) return next;
  const dropped = new Set(visible.slice(0, overflow).map((item) => item.id));
  return next.filter((item) => !dropped.has(item.id));
}

export function markLeaving(
  list: readonly ToastItem[],
  id: string,
): ToastItem[] {
  return list.map((item) =>
    item.id === id && !item.leaving ? { ...item, leaving: true } : item,
  );
}

export function removeToast(
  list: readonly ToastItem[],
  id: string,
): ToastItem[] {
  return list.filter((item) => item.id !== id);
}
