'use client';

import { useEffect } from 'react';
import { CAMERA_ATTRIBUTE, CAMERA_MEDIA_QUERY } from '../../_lib/camera';
import type { FrameId } from '../../_lib/frames';
import { getCanvasMode, subscribeCanvasMode } from '../../_state/canvasMode';
import { getCurrentFrame } from '../../_state/currentFrame';
import type { CameraHandoff } from './cameraElements';
import { startCamera } from './startCamera';
import { startFreeCamera } from './startFreeCamera';

interface CameraControllerProps {
  frameIds: readonly FrameId[];
}

/**
 * 데스크톱 카메라를 켜고 끈다. 그리는 것은 없다.
 * 매체 조건(마우스 기기)이 바뀌면 <html data-camera>를 맞추고, 세로 페이지로 돌아갈 때는 보던 프레임으로 스크롤해
 * CurrentFrameTracker가 이어받게 한다. 캔버스 모드(<html data-canvas-mode>)가 바뀌면 읽기·자유 카메라를 바꿔 켜고
 * 보던 위치를 넘겨준다 (읽기 → 자유는 그 자리 그대로, 자유 → 읽기는 보던 프레임의 처음부터)
 */
export function CameraController({ frameIds }: CameraControllerProps) {
  useEffect(() => {
    const html = document.documentElement;
    const media = matchMedia(CAMERA_MEDIA_QUERY);
    let stop: (() => CameraHandoff | undefined) | undefined;

    const sync = () => {
      const wasOn = stop !== undefined;
      const handoff = stop?.();
      stop = undefined;

      if (media.matches) {
        html.setAttribute(CAMERA_ATTRIBUTE, '');
        stop =
          getCanvasMode() === 'free'
            ? startFreeCamera(frameIds, handoff)
            : startCamera(frameIds, handoff);
        return;
      }

      html.removeAttribute(CAMERA_ATTRIBUTE);
      if (wasOn) {
        document
          .getElementById(getCurrentFrame())
          ?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      window.dispatchEvent(new Event('resize'));
    };

    sync();
    media.addEventListener('change', sync);
    const unsubscribeMode = subscribeCanvasMode(sync);

    return () => {
      media.removeEventListener('change', sync);
      unsubscribeMode();
      stop?.();
      html.removeAttribute(CAMERA_ATTRIBUTE);
    };
  }, [frameIds]);

  return null;
}
