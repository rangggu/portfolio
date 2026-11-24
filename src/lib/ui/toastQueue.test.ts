import { describe, expect, it } from 'vitest';

import {
  addToast,
  markLeaving,
  removeToast,
  type ToastItem,
} from './toastQueue';

const make = (id: string) => ({
  id,
  message: id,
  tone: 'neutral' as const,
  duration: 4000,
});

const ids = (list: ToastItem[]) => list.map((item) => item.id);

describe('addToast', () => {
  it('새 토스트를 끝에 붙인다', () => {
    const list = addToast(addToast([], make('a')), make('b'));
    expect(ids(list)).toEqual(['a', 'b']);
    expect(list[1]?.leaving).toBe(false);
  });

  it('최대 개수를 넘으면 오래된 것부터 뺀다', () => {
    let list: ToastItem[] = [];
    for (const id of ['a', 'b', 'c', 'd']) list = addToast(list, make(id), 3);
    expect(ids(list)).toEqual(['b', 'c', 'd']);
  });

  it('사라지는 중인 토스트는 개수에 세지 않는다', () => {
    let list = addToast(addToast([], make('a')), make('b'));
    list = markLeaving(list, 'a');
    list = addToast(list, make('c'), 2);
    expect(ids(list)).toEqual(['a', 'b', 'c']);
  });
});

describe('markLeaving · removeToast', () => {
  it('leaving으로 표시한 뒤 지운다', () => {
    let list = addToast(addToast([], make('a')), make('b'));
    list = markLeaving(list, 'a');
    expect(list.find((item) => item.id === 'a')?.leaving).toBe(true);
    list = removeToast(list, 'a');
    expect(ids(list)).toEqual(['b']);
  });

  it('없는 id는 그대로 둔다', () => {
    const list = addToast([], make('a'));
    expect(markLeaving(list, 'x')).toEqual(list);
    expect(removeToast(list, 'x')).toEqual(list);
  });
});
