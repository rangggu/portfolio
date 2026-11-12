'use client';

import { Text } from '@/components/ui/Text';
import { getFrame } from '../../_lib/frames';
import { useFrameEndHint } from '../../_state/frameEndHint';
import styles from './FrameEndHint.module.css';

const ARROW = { right: '→', down: '↓' } as const;

/**
 * 프레임 끝 안내: 카메라가 프레임 끝에서 멈춘 동안 「계속 스크롤하면 03 프로젝트 →」를 보인다.
 * 화면 장식이라 보조기기에서는 숨긴다 (스크린리더는 문서 순서대로 다음 프레임을 읽는다).
 */
export function FrameEndHint() {
  const { target, visible } = useFrameEndHint();
  const frame = target ? getFrame(target.nextFrameId) : undefined;
  const name = frame
    ? 'number' in frame
      ? `${frame.number} ${frame.label}`
      : frame.label
    : '';

  return (
    <div
      className={styles.root}
      data-visible={visible || undefined}
      aria-hidden="true"
    >
      {target && (
        <Text as="p" variant="labelSm" tone="secondary">
          계속 스크롤하면 {name} {ARROW[target.direction]}
        </Text>
      )}
    </div>
  );
}
