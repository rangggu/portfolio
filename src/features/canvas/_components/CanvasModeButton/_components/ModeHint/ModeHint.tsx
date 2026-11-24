'use client';

import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { setCanvasMode } from '../../../../_state/canvasMode';
import { hideModeHint, useModeHint } from '../../../../_state/modeHint';
import styles from './ModeHint.module.css';

/** 말풍선을 보이는 시간 (동작 값). 마우스를 올리거나 포커스가 있으면 멈췄다가 처음부터 센다 */
const VISIBLE_DURATION = 6000;

/**
 * 읽기 모드에서 확대·좌우 이동을 하려 할 때 모드 버튼 아래에 띄우는 자유 모드 권유 말풍선.
 * 꼬리가 모드 버튼을 가리켜 다음에는 직접 누를 수 있게 한다.
 * 알림 영역(role="status")은 항상 있어 새 안내를 보조기기가 읽는다.
 */
export function ModeHint() {
  const visible = useModeHint();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const pause = () => setPaused(true);
    const resume = () => setPaused(false);
    bubble.addEventListener('pointerenter', pause);
    bubble.addEventListener('pointerleave', resume);
    bubble.addEventListener('focusin', pause);
    bubble.addEventListener('focusout', resume);
    return () => {
      bubble.removeEventListener('pointerenter', pause);
      bubble.removeEventListener('pointerleave', resume);
      bubble.removeEventListener('focusin', pause);
      bubble.removeEventListener('focusout', resume);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || paused) return;
    const timer = window.setTimeout(hideModeHint, VISIBLE_DURATION);
    return () => window.clearTimeout(timer);
  }, [visible, paused]);

  return (
    <div role="status" className={styles.region}>
      {visible && (
        <div ref={bubbleRef} className={styles.bubble}>
          <p className={styles.message}>
            확대하거나 자유롭게 둘러보고 싶으신가요?
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.action}
              onClick={() => {
                hideModeHint();
                setCanvasMode('free');
              }}
            >
              자유 모드로
            </button>
            <IconButton
              aria-label="안내 닫기"
              type="button"
              className={styles.close}
              onClick={hideModeHint}
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
          </div>
        </div>
      )}
    </div>
  );
}
