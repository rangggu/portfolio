'use client';

import { useEffect } from 'react';
import { getFrame, getFrameByPath, type FrameId } from '../../_lib/frames';
import {
  isNavigatingToFrame,
  navigateToFrame,
} from '../../_lib/navigateToFrame';
import {
  getCurrentFrame,
  subscribeCurrentFrame,
} from '../../_state/currentFrame';

interface FrameAddressSyncProps {
  /** 프레임별 문서 제목 (서버에서 메타데이터와 같은 규칙으로 만든다) */
  titles: Record<FrameId, string>;
}

/**
 * 현재 프레임이 스크롤로 바뀌면 주소를 교체하고(replaceState, 기록 안 남김) 문서 제목을 맞춘다.
 * 뒤로·앞으로 가기로 주소가 바뀌면 그 프레임으로 이동한다 (docs/product.md 「뒤로 가기 기록」). 그리는 것은 없다.
 */
export function FrameAddressSync({ titles }: FrameAddressSyncProps) {
  useEffect(() => {
    const syncAddress = () => {
      if (isNavigatingToFrame()) return;
      const frameId = getCurrentFrame();
      const { path } = getFrame(frameId);
      if (window.location.pathname !== path) {
        window.history.replaceState(window.history.state, '', path);
      }
      document.title = titles[frameId];
    };

    const handlePopState = () => {
      const frame = getFrameByPath(window.location.pathname);
      if (!frame) return;
      navigateToFrame(frame.id, { history: 'none', focus: false });
      document.title = titles[frame.id];
    };

    const unsubscribe = subscribeCurrentFrame(syncAddress);
    window.addEventListener('popstate', handlePopState);

    return () => {
      unsubscribe();
      window.removeEventListener('popstate', handlePopState);
    };
  }, [titles]);

  return null;
}
