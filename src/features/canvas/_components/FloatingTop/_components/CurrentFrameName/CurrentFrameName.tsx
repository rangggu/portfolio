'use client';

import { FRAMES } from '../../../../_lib/frames';
import { useCurrentFrame } from '../../../../_state/currentFrame';

/** 위치 표시의 현재 프레임 이름. 스크롤마다 바뀌므로 aria-live로 읽히게 하지 않는다 */
export function CurrentFrameName() {
  const currentFrame = useCurrentFrame();
  const label = FRAMES.find((frame) => frame.id === currentFrame)?.label;

  return <strong>{label}</strong>;
}
