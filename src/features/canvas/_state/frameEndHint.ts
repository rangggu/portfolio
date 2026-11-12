import { useSyncExternalStore } from 'react';
import type { CameraDirection } from '@/lib/canvas/cameraTrack';
import type { FrameId } from '../_lib/frames';

/**
 * 프레임 끝 안내 (docs/product.md 「프레임 끝 안내」). 카메라가 프레임 끝에서 멈춘 동안(hold) 보인다.
 * 사라지는 동안에도 글자가 남아 있도록 안내 내용과 표시 여부를 따로 둔다.
 */
export interface FrameEndHintTarget {
  nextFrameId: FrameId;
  direction: CameraDirection;
}

interface FrameEndHintState {
  target?: FrameEndHintTarget;
  visible: boolean;
}

const HIDDEN: FrameEndHintState = { visible: false };

let state: FrameEndHintState = HIDDEN;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** 안내할 다음 프레임. undefined면 숨긴다 (마지막 내용은 남긴다) */
export function setFrameEndHint(target: FrameEndHintTarget | undefined) {
  const next: FrameEndHintState = target
    ? { target, visible: true }
    : { target: state.target, visible: false };

  if (
    next.visible === state.visible &&
    next.target?.nextFrameId === state.target?.nextFrameId &&
    next.target?.direction === state.target?.direction
  ) {
    return;
  }
  state = next;
  listeners.forEach((listener) => listener());
}

export function useFrameEndHint(): FrameEndHintState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => HIDDEN,
  );
}
