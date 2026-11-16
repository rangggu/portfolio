'use client';

import { Text } from '@/components/ui/Text';
import { getFrame } from '../../_lib/frames';
import { useFrameEndHint } from '../../_state/frameEndHint';
import styles from './FrameEndHint.module.css';

const ARROW = { right: '→', down: '↓' } as const;

/** 안내 앞부분. 카메라는 스크롤 한 방향이고, 터치는 넘기는 방향을 알려 준다 */
const LEAD = {
  scroll: { right: '계속 스크롤하면', down: '계속 스크롤하면' },
  swipe: { right: '옆으로 넘기면', down: '아래로 넘기면' },
} as const;

/**
 * 프레임 끝 안내: 프레임 끝에 닿으면 「계속 스크롤하면 03 프로젝트 →」(카메라),
 * 「옆으로 넘기면 03 프로젝트 →」·「아래로 넘기면 06 연락처 ↓」(터치)를 보인다.
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
          {LEAD[target.gesture][target.direction]} {name}{' '}
          {ARROW[target.direction]}
        </Text>
      )}
    </div>
  );
}
