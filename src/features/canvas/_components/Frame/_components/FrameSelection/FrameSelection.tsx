'use client';

import type { FrameId } from '../../../../_lib/frames';
import { useIsCurrentFrame } from '../../../../_state/currentFrame';
import styles from './FrameSelection.module.css';

interface FrameSelectionProps {
  frameId: FrameId;
}

/**
 * 현재 프레임의 피그마식 선택 표시 (외곽선 + 네 모서리 핸들). 장식이라 보조기기에서는 숨긴다.
 * 이름표 색은 Frame.module.css가 data-frame-selected를 보고 바꾼다.
 */
export function FrameSelection({ frameId }: FrameSelectionProps) {
  const isCurrent = useIsCurrentFrame(frameId);

  if (!isCurrent) return null;

  return (
    <span className={styles.root} data-frame-selected aria-hidden="true">
      <span className={styles.handle} data-corner="top-left" />
      <span className={styles.handle} data-corner="top-right" />
      <span className={styles.handle} data-corner="bottom-left" />
      <span className={styles.handle} data-corner="bottom-right" />
    </span>
  );
}
