import type { FrameId } from '../../_lib/frames';

/** 카메라(읽기·자유 모드)가 다루는 요소 */
export interface CameraElements {
  root: HTMLElement;
  stage: HTMLElement;
  world: HTMLElement;
  frames: HTMLElement[];
  firstFrame: HTMLElement;
}

export function findCameraElements(
  frameIds: readonly FrameId[],
): CameraElements | null {
  const root = document.querySelector<HTMLElement>('[data-camera-root]');
  const stage = document.querySelector<HTMLElement>('[data-camera-stage]');
  const world = document.querySelector<HTMLElement>('[data-camera-world]');
  const frames = frameIds.flatMap((id) => {
    const element = document.getElementById(id);
    return element ? [element] : [];
  });
  const firstFrame = frames[0];
  if (!root || !stage || !world || !firstFrame) return null;
  return { root, stage, world, frames, firstFrame };
}

/**
 * 모드를 바꿀 때 넘겨주는 보던 위치 (world 좌표의 화면 왼쪽 위, 배율, 그때의 현재 프레임).
 * 읽기 → 자유는 이 위치 그대로, 자유 → 읽기는 frameId 프레임의 처음부터 이어 읽는다
 */
export interface CameraHandoff {
  x: number;
  y: number;
  scale: number;
  frameId: FrameId;
}
