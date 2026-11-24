'use client';

import { useEffect } from 'react';
import { CAMERA_ATTRIBUTE, CAMERA_MEDIA_QUERY } from '../../_lib/camera';
import type { FrameId } from '../../_lib/frames';
import { getCurrentFrame } from '../../_state/currentFrame';
import { startCamera } from './startCamera';

interface CameraControllerProps {
  frameIds: readonly FrameId[];
}

/**
 * 데스크톱 카메라 이동을 켜고 끈다. 그리는 것은 없다.
 * 매체 조건(마우스 기기 + 움직임 줄이기 꺼짐)이 바뀌면 <html data-camera>를 맞추고,
 * 세로 페이지로 돌아갈 때는 보던 프레임으로 스크롤해 CurrentFrameTracker가 이어받게 한다.
 */
export function CameraController({ frameIds }: CameraControllerProps) {
  useEffect(() => {
    const html = document.documentElement;
    const media = matchMedia(CAMERA_MEDIA_QUERY);
    let stop: (() => void) | undefined;

    const sync = () => {
      const wasOn = stop !== undefined;
      stop?.();
      stop = undefined;

      if (media.matches) {
        html.setAttribute(CAMERA_ATTRIBUTE, '');
        stop = startCamera(frameIds);
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

    return () => {
      media.removeEventListener('change', sync);
      stop?.();
      html.removeAttribute(CAMERA_ATTRIBUTE);
    };
  }, [frameIds]);

  return null;
}
