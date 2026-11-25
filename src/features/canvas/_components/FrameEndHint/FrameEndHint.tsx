'use client';

import { useLayoutEffect, useRef } from 'react';
import { Text } from '@/components/ui/Text';
import { hintPosition } from '@/lib/canvas/hintPosition';
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
 * 메뉴 바 위에서 다음 프레임의 메뉴 항목을 꼬리로 가리킨다 (항목 위치는 FrameMenu의 data-frame-id로 찾는다).
 * 화면 장식이라 보조기기에서는 숨긴다 (스크린리더는 문서 순서대로 다음 프레임을 읽는다).
 */
export function FrameEndHint() {
  const { target, visible } = useFrameEndHint();
  const rootRef = useRef<HTMLDivElement>(null);
  const nextFrameId = target?.nextFrameId;

  // 보이는 동안 다음 항목 위치를 따라간다 (창 크기, 좁은 화면에서 바를 가로로 밀 때)
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !nextFrameId || !visible) return;
    const item = document.querySelector<HTMLElement>(
      `[data-frame-id="${nextFrameId}"]`,
    );
    const bar = item?.closest('nav');
    if (!item || !bar) return;

    const place = () => {
      const itemRect = item.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      const styles = getComputedStyle(root);
      const { left, tailX } = hintPosition({
        targetCenter: itemRect.left + itemRect.width / 2,
        barLeft: barRect.left,
        barRight: barRect.right,
        hintWidth: root.offsetWidth,
        viewportWidth: document.documentElement.clientWidth,
        edge: parseFloat(styles.getPropertyValue('--hint-edge')) || 0,
        tailInset:
          parseFloat(styles.getPropertyValue('--hint-tail-inset')) || 0,
      });
      root.style.setProperty('--hint-left', `${left}px`);
      root.dataset.placed = '';
      if (tailX === null) {
        root.style.removeProperty('--hint-tail-x');
        delete root.dataset.tail;
      } else {
        root.style.setProperty('--hint-tail-x', `${tailX}px`);
        root.dataset.tail = '';
      }
    };

    place();
    window.addEventListener('resize', place);
    bar.addEventListener('scroll', place, { passive: true });
    return () => {
      window.removeEventListener('resize', place);
      bar.removeEventListener('scroll', place);
    };
  }, [nextFrameId, visible]);

  const frame = target ? getFrame(target.nextFrameId) : undefined;
  const name = frame
    ? 'number' in frame
      ? `${frame.number} ${frame.label}`
      : frame.label
    : '';

  return (
    <div
      ref={rootRef}
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
