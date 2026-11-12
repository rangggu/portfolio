/**
 * 데스크톱 카메라 이동의 경로 계산 (docs/product.md 「스크롤은 진짜, 카메라 이동은 연출」).
 *
 * 문서는 세로로 스크롤되고, 스크롤 위치(scrollY)를 캔버스 위 카메라 좌표로 바꾼다.
 * 카메라 좌표는 화면 왼쪽 위가 가리키는 캔버스(world) 좌표다.
 *
 * 프레임마다 구간이 이어진다 (마지막 프레임은 follow만):
 *   follow  프레임 안에서 카메라가 아래로 따라간다. 길이 = 프레임 높이 - 화면 높이
 *   hold    프레임 끝에서 잠깐 멈춘다. 프레임 끝 안내가 이때 보인다
 *   move    다음 프레임의 시작점으로 옮겨 간다. 길이 = 옆 프레임이면 가로 거리, 아래 프레임이면 세로 거리
 * 스크롤 1px이 카메라 이동 1px이 되도록 구간 길이를 이동 거리로 잡는다.
 */

export interface FrameRect<Id extends string = string> {
  id: Id;
  /** 캔버스(world) 기준 좌표 */
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CameraViewport {
  width: number;
  height: number;
}

export interface CameraPoint {
  x: number;
  y: number;
}

export type CameraPhase = 'follow' | 'hold' | 'move';

/** 다음 프레임이 놓인 방향 (프레임 끝 안내의 화살표) */
export type CameraDirection = 'right' | 'down';

export interface CameraSegment<Id extends string = string> {
  frameId: Id;
  phase: CameraPhase;
  /** 이 구간이 시작하는 스크롤 위치 */
  start: number;
  length: number;
  from: CameraPoint;
  to: CameraPoint;
  /** hold·move 구간에서 넘어갈 프레임 */
  nextFrameId?: Id;
  nextDirection?: CameraDirection;
}

export interface CameraTrack<Id extends string = string> {
  segments: CameraSegment<Id>[];
  /** 프레임별 시작 스크롤 위치 (카메라가 프레임 맨 위에 있을 때) */
  frameStarts: Record<Id, number>;
  /** 프레임별 follow 구간 길이 */
  followLengths: Record<Id, number>;
  /** 스크롤할 수 있는 전체 길이 (문서 높이 = length + 화면 높이) */
  length: number;
}

export interface CameraState<Id extends string = string> {
  x: number;
  y: number;
  /** 지금 보고 있는 프레임. move 구간은 절반을 넘으면 다음 프레임 */
  frameId: Id;
  phase: CameraPhase;
  /** 구간 안 진행 비율 0~1 */
  progress: number;
  nextFrameId?: Id;
  nextDirection?: CameraDirection;
}

/** 창 크기가 바뀌어도 같은 자리로 돌아오기 위한 위치 표시 */
export interface CameraAnchor<Id extends string = string> {
  frameId: Id;
  phase: CameraPhase;
  /** 구간 안 진행 비율 0~1 */
  progress: number;
}

export interface CameraTrackOptions {
  /** hold 구간 길이 (px) */
  holdLength: number;
}

/** 프레임 가운데가 화면 가운데에 오고, 프레임 맨 위가 화면 맨 위에 오는 카메라 위치 */
export function frameStartPoint(
  rect: FrameRect,
  viewport: CameraViewport,
): CameraPoint {
  return { x: rect.x + rect.width / 2 - viewport.width / 2, y: rect.y };
}

export function buildCameraTrack<Id extends string>(
  rects: readonly FrameRect<Id>[],
  viewport: CameraViewport,
  options: CameraTrackOptions,
): CameraTrack<Id> {
  const segments: CameraSegment<Id>[] = [];
  const frameStarts = {} as Record<Id, number>;
  const followLengths = {} as Record<Id, number>;
  let position = 0;

  const push = (segment: Omit<CameraSegment<Id>, 'start'>) => {
    segments.push({ ...segment, start: position });
    position += segment.length;
  };

  rects.forEach((rect, index) => {
    const top = frameStartPoint(rect, viewport);
    const followLength = Math.max(0, rect.height - viewport.height);
    const bottom = { x: top.x, y: top.y + followLength };

    frameStarts[rect.id] = position;
    followLengths[rect.id] = followLength;
    push({
      frameId: rect.id,
      phase: 'follow',
      length: followLength,
      from: top,
      to: bottom,
    });

    const next = rects[index + 1];
    if (!next) return;

    const nextTop = frameStartPoint(next, viewport);
    const dx = nextTop.x - bottom.x;
    const dy = nextTop.y - bottom.y;
    // 옆 프레임으로 갈 때는 가로 거리만큼만 스크롤한다. 긴 프레임 끝에서 옆 프레임 맨 위로 올라가는 세로 이동은
    // 그 안에 함께 일어난다 (아래로 스크롤하는데 화면이 오래 위로 가지 않도록)
    const horizontal = Math.abs(dx) >= 1;
    const nextDirection: CameraDirection = horizontal ? 'right' : 'down';

    push({
      frameId: rect.id,
      phase: 'hold',
      length: options.holdLength,
      from: bottom,
      to: bottom,
      nextFrameId: next.id,
      nextDirection,
    });
    push({
      frameId: rect.id,
      phase: 'move',
      length: horizontal ? Math.abs(dx) : Math.abs(dy),
      from: bottom,
      to: nextTop,
      nextFrameId: next.id,
      nextDirection,
    });
  });

  return { segments, frameStarts, followLengths, length: position };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** scrollY가 속한 구간. 길이 0인 구간은 건너뛰고, 끝은 마지막 구간에 붙인다 */
function findSegment<Id extends string>(
  track: CameraTrack<Id>,
  scrollY: number,
): CameraSegment<Id> | undefined {
  const position = clamp(scrollY, 0, track.length);
  let found: CameraSegment<Id> | undefined;

  for (const segment of track.segments) {
    if (segment.length === 0) {
      found ??= segment;
      continue;
    }
    if (position < segment.start) break;
    found = segment;
    if (position < segment.start + segment.length) break;
  }

  return found;
}

export function cameraAt<Id extends string>(
  track: CameraTrack<Id>,
  scrollY: number,
): CameraState<Id> | undefined {
  const segment = findSegment(track, scrollY);
  if (!segment) return undefined;

  const progress =
    segment.length === 0
      ? 0
      : clamp((scrollY - segment.start) / segment.length, 0, 1);
  const x = segment.from.x + (segment.to.x - segment.from.x) * progress;
  const y = segment.from.y + (segment.to.y - segment.from.y) * progress;
  const frameId =
    segment.phase === 'move' && progress >= 0.5 && segment.nextFrameId
      ? segment.nextFrameId
      : segment.frameId;

  return {
    x,
    y,
    frameId,
    phase: segment.phase,
    progress,
    nextFrameId: segment.nextFrameId,
    nextDirection: segment.nextDirection,
  };
}

export function cameraAnchorAt<Id extends string>(
  track: CameraTrack<Id>,
  scrollY: number,
): CameraAnchor<Id> | undefined {
  const segment = findSegment(track, scrollY);
  if (!segment) return undefined;

  return {
    frameId: segment.frameId,
    phase: segment.phase,
    progress:
      segment.length === 0
        ? 0
        : clamp((scrollY - segment.start) / segment.length, 0, 1),
  };
}

/** 위치 표시를 새 경로의 스크롤 위치로. 같은 구간이 없어졌으면 그 프레임의 시작 */
export function scrollForAnchor<Id extends string>(
  track: CameraTrack<Id>,
  anchor: CameraAnchor<Id>,
): number {
  const segment = track.segments.find(
    (item) => item.frameId === anchor.frameId && item.phase === anchor.phase,
  );
  if (!segment || segment.length === 0) {
    return track.frameStarts[anchor.frameId] ?? 0;
  }
  return segment.start + segment.length * anchor.progress;
}

export function scrollForFrame<Id extends string>(
  track: CameraTrack<Id>,
  frameId: Id,
): number {
  return track.frameStarts[frameId] ?? 0;
}

/** 캔버스 좌표가 들어 있는 프레임. 어디에도 없으면 가장 가까운 프레임 */
export function frameAtPoint<Id extends string>(
  rects: readonly FrameRect<Id>[],
  point: CameraPoint,
): Id | undefined {
  let nearestId: Id | undefined;
  let nearestDistance = Infinity;

  for (const rect of rects) {
    const dx = Math.max(rect.x - point.x, 0, point.x - (rect.x + rect.width));
    const dy = Math.max(rect.y - point.y, 0, point.y - (rect.y + rect.height));
    const distance = Math.hypot(dx, dy);
    if (distance < nearestDistance) {
      nearestId = rect.id;
      nearestDistance = distance;
    }
  }

  return nearestId;
}

export interface RevealOptions {
  /** 화면 위아래에서 플로팅 UI가 가리는 높이 */
  insetTop?: number;
  insetBottom?: number;
}

/**
 * 프레임 안 세로 구간(프레임 맨 위 기준 top·bottom)이 보이는 스크롤 위치.
 * 이미 그 프레임을 따라가는 중이고 구간이 보이면 지금 위치를 그대로 둔다.
 * 아니면 구간이 화면 가운데에 오도록 하되, 프레임 밖으로는 나가지 않는다.
 */
export function scrollToReveal<Id extends string>(
  track: CameraTrack<Id>,
  frameId: Id,
  span: { top: number; bottom: number },
  viewportHeight: number,
  currentScroll: number,
  { insetTop = 0, insetBottom = 0 }: RevealOptions = {},
): number {
  const start = track.frameStarts[frameId] ?? 0;
  const followLength = track.followLengths[frameId] ?? 0;
  const offset = currentScroll - start;

  if (offset >= 0 && offset <= followLength) {
    const visibleTop = offset + insetTop;
    const visibleBottom = offset + viewportHeight - insetBottom;
    if (span.top >= visibleTop && span.bottom <= visibleBottom) {
      return currentScroll;
    }
  }

  const spanHeight = span.bottom - span.top;
  const centered = span.top - (viewportHeight - spanHeight) / 2;
  return start + clamp(centered, 0, followLength);
}
