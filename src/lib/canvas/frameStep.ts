import type { CameraTrack } from './cameraTrack';

/**
 * 읽기 모드에서 스크롤 입력 한 번(휠·키)을 어떻게 처리할지 (docs/product.md 「읽기 모드」).
 * 프레임 안에서는 그대로 스크롤하고, 경계를 넘으려는 입력이면 멈추지 않고 곧장
 * 다음 프레임 맨 위(아래로) · 이전 프레임 끝(위로)으로 옮긴다. move 구간을 스크롤로 지나가지 않는다.
 * - 긴 프레임: 끝에 닿은 뒤에도 hold 구간만큼 더 당길 수 있고(카메라가 끝 너머로 내려간다), 그걸 넘으면 다음 프레임.
 *   위로도 같아서 맨 위에 닿은 뒤 lead 구간만큼 더 올릴 수 있고, 그걸 넘으면 이전 프레임
 * - 화면에 다 들어오는 프레임: 내릴 내용이 없어 위아래로 한 번이면 바로 이전·다음 프레임
 *
 * - scroll: 브라우저가 그대로 스크롤한다
 * - travel: frameId의 scroll 위치로 옮긴다
 */
export type FrameStep<Id extends string = string> =
  { kind: 'scroll' } | { kind: 'travel'; frameId: Id; scroll: number };

/**
 * 스크롤한 뒤 경계까지 이만큼(px) 이하만 남으면 넘어가는 것으로 본다 (몇 px 남기고 멈춰서 한 번 더 굴려야 넘어가지 않게).
 * 위쪽 경계는 프레임 위 여백(본체 안쪽 여백 48px)이라, 아래쪽은 끝 너머 캔버스라 건너뛰어도 못 보는 내용이 없다
 */
const EDGE = 48;

/** 프레임을 따라 내려간 마지막 위치 (긴 프레임의 끝이 화면 아래에 닿는 곳) */
export function frameEndScroll<Id extends string>(
  track: CameraTrack<Id>,
  frameId: Id,
): number {
  return (
    (track.frameStarts[frameId] ?? 0) + (track.followLengths[frameId] ?? 0)
  );
}

export function frameStep<Id extends string>(
  track: CameraTrack<Id>,
  frameIds: readonly Id[],
  scrollY: number,
  delta: number,
): FrameStep<Id> {
  if (delta === 0) return { kind: 'scroll' };

  const segment = track.segments.find(
    (item) => scrollY >= item.start - 0.5 && scrollY < item.start + item.length,
  );
  // 프레임 사이(move 구간, 스크롤바를 끌어서 온 경우)는 그대로 둔다. 끝 너머는 마지막 프레임
  if (segment?.phase === 'move') return { kind: 'scroll' };
  const frameId = segment?.frameId ?? frameIds[frameIds.length - 1];
  if (!frameId) return { kind: 'scroll' };
  const index = frameIds.indexOf(frameId);

  if (delta > 0) {
    const nextId = frameIds[index + 1];
    const hold = track.segments.find(
      (item) => item.frameId === frameId && item.phase === 'hold',
    );
    if (!nextId || !hold) return { kind: 'scroll' };
    // 넘어가는 곳: 긴 프레임은 더 당기는 구간(hold)의 끝, 화면 높이 프레임은 바로
    const limit =
      (track.followLengths[frameId] ?? 0) > 0
        ? hold.start + hold.length - EDGE
        : frameEndScroll(track, frameId);
    return scrollY + delta > limit
      ? {
          kind: 'travel',
          frameId: nextId,
          scroll: track.frameStarts[nextId] ?? 0,
        }
      : { kind: 'scroll' };
  }

  const previousId = frameIds[index - 1];
  if (!previousId) return { kind: 'scroll' };
  // 넘어가는 곳: 긴 프레임은 더 올리는 구간(lead)의 처음, 화면 높이 프레임은 바로
  const lead = track.segments.find(
    (item) => item.frameId === frameId && item.phase === 'lead',
  );
  const limit = lead
    ? lead.start + EDGE
    : (track.frameStarts[frameId] ?? 0) + EDGE;
  return scrollY + delta < limit
    ? {
        kind: 'travel',
        frameId: previousId,
        scroll: frameEndScroll(track, previousId),
      }
    : { kind: 'scroll' };
}
