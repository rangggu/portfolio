'use client';

import { useEffect } from 'react';
import type { FrameId } from '../../_lib/frames';
import { SWIPE_MEDIA_QUERY } from '../../_lib/swipe';
import { startSwipe } from './startSwipe';

interface SwipeControllerProps {
  frameIds: readonly FrameId[];
}

/**
 * 터치 스와이프 모드를 켜고 끈다. 그리는 것은 없다.
 * 배치는 Canvas.module.css가 같은 미디어 쿼리로 바꾸므로, 여기서는 조건이 맞는 동안만 startSwipe를 돌린다.
 * 접힘·펼침·회전으로는 조건이 바뀌지 않는다 (태블릿에 마우스를 연결하는 경우 등만 바뀐다).
 */
export function SwipeController({ frameIds }: SwipeControllerProps) {
  useEffect(() => {
    const media = matchMedia(SWIPE_MEDIA_QUERY);
    let stop: (() => void) | undefined;

    const sync = () => {
      stop?.();
      stop = media.matches ? startSwipe(frameIds) : undefined;
    };

    sync();
    media.addEventListener('change', sync);

    return () => {
      media.removeEventListener('change', sync);
      stop?.();
    };
  }, [frameIds]);

  return null;
}
