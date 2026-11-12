'use client';

import { useEffect } from 'react';
import { pickMostVisible } from '@/lib/viewport/pickMostVisible';
import { isCameraMode } from '../../_lib/camera';
import type { FrameId } from '../../_lib/frames';
import { setCurrentFrame } from '../../_state/currentFrame';

interface CurrentFrameTrackerProps {
  frameIds: readonly FrameId[];
}

/**
 * 세로 페이지에서 화면에 가장 많이 보이는 프레임을 현재 프레임으로 정한다. 그리는 것은 없다.
 * 카메라 모드에서는 CameraController가 정하므로 쉰다 (모드가 바뀌면 resize 이벤트로 다시 잰다).
 */
export function CurrentFrameTracker({ frameIds }: CurrentFrameTrackerProps) {
  useEffect(() => {
    let frameRequest = 0;

    const update = () => {
      frameRequest = 0;
      if (isCameraMode()) return;
      const spans = frameIds.flatMap((id) => {
        const element = document.getElementById(id);
        if (!element) return [];
        const { top, bottom } = element.getBoundingClientRect();
        return [{ id, top, bottom }];
      });
      const visibleId = pickMostVisible(spans, window.innerHeight);
      if (visibleId) setCurrentFrame(visibleId);
    };

    const scheduleUpdate = () => {
      if (frameRequest) return;
      frameRequest = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      cancelAnimationFrame(frameRequest);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [frameIds]);

  return null;
}
