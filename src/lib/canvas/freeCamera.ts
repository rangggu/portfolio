/**
 * 자유 모드 카메라 계산 (docs/product.md 「자유 모드」).
 * 카메라 = 화면 왼쪽 위가 가리키는 캔버스(world) 좌표 x·y와 배율 scale.
 * 화면 좌표(px)와 world 좌표의 관계: screen = (world - camera) × scale
 */

export interface FreeCamera {
  x: number;
  y: number;
  scale: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Box extends Point, Size {}

export interface ScaleRange {
  min: number;
  max: number;
}

/** 자유 모드 확대·축소 범위 (10% ~ 200%) */
export const FREE_SCALE_RANGE: ScaleRange = { min: 0.1, max: 2 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** 화면에서 dx·dy만큼 끌거나 스크롤한 만큼 옮긴다 (배율이 작으면 world에서는 더 멀리 간다) */
export function panBy(camera: FreeCamera, dx: number, dy: number): FreeCamera {
  return {
    ...camera,
    x: camera.x + dx / camera.scale,
    y: camera.y + dy / camera.scale,
  };
}

/** 화면 점 point 아래 world 좌표를 그대로 둔 채 배율을 scale로 바꾼다 */
export function scaleAt(
  camera: FreeCamera,
  scale: number,
  point: Point,
  range: ScaleRange = FREE_SCALE_RANGE,
): FreeCamera {
  const next = clamp(scale, range.min, range.max);
  const worldX = camera.x + point.x / camera.scale;
  const worldY = camera.y + point.y / camera.scale;
  return {
    x: worldX - point.x / next,
    y: worldY - point.y / next,
    scale: next,
  };
}

/** 지금 배율에 factor를 곱한다 (휠·핀치·버튼) */
export function zoomAt(
  camera: FreeCamera,
  factor: number,
  point: Point,
  range: ScaleRange = FREE_SCALE_RANGE,
): FreeCamera {
  return scaleAt(camera, camera.scale * factor, point, range);
}

/** 상자들을 모두 감싸는 상자 */
export function boundsOf(boxes: readonly Box[]): Box | undefined {
  if (boxes.length === 0) return undefined;
  const left = Math.min(...boxes.map((box) => box.x));
  const top = Math.min(...boxes.map((box) => box.y));
  const right = Math.max(...boxes.map((box) => box.x + box.width));
  const bottom = Math.max(...boxes.map((box) => box.y + box.height));
  return { x: left, y: top, width: right - left, height: bottom - top };
}

/** bounds 전체가 화면 안에 들어오는 카메라 (전체 보기). 여백 padding을 두고 가운데 맞춘다 */
export function fitBounds(
  bounds: Box,
  viewport: Size,
  padding: number,
  range: ScaleRange = FREE_SCALE_RANGE,
): FreeCamera {
  const availableWidth = Math.max(viewport.width - padding * 2, 1);
  const availableHeight = Math.max(viewport.height - padding * 2, 1);
  const scale = clamp(
    Math.min(availableWidth / bounds.width, availableHeight / bounds.height),
    range.min,
    range.max,
  );
  return {
    x: bounds.x + bounds.width / 2 - viewport.width / 2 / scale,
    y: bounds.y + bounds.height / 2 - viewport.height / 2 / scale,
    scale,
  };
}

/** 프레임을 100%로 가로 가운데·맨 위에 맞춘 카메라 (메뉴로 이동, 읽기 모드 프레임 시작 위치와 같다) */
export function frameCamera(frame: Box, viewport: Size): FreeCamera {
  return {
    x: frame.x + frame.width / 2 - viewport.width / 2,
    y: frame.y,
    scale: 1,
  };
}

/** 화면 가운데가 가리키는 world 좌표 (현재 프레임 판정) */
export function centerPoint(camera: FreeCamera, viewport: Size): Point {
  return {
    x: camera.x + viewport.width / 2 / camera.scale,
    y: camera.y + viewport.height / 2 / camera.scale,
  };
}

/**
 * world 상자가 화면 안(위아래 inset 제외)에 보이도록 최소한으로 옮긴다 (포커스·검색 결과).
 * 이미 보이면 그대로, 화면보다 크면 위쪽에 맞춘다
 */
export function revealBox(
  camera: FreeCamera,
  box: Box,
  viewport: Size,
  inset: { top: number; bottom: number } = { top: 0, bottom: 0 },
): FreeCamera {
  const { scale } = camera;
  const viewWidth = viewport.width / scale;
  const viewTop = camera.y + inset.top / scale;
  const viewHeight = (viewport.height - inset.top - inset.bottom) / scale;

  let { x, y } = camera;
  if (box.x < x) x = box.x;
  else if (box.x + box.width > x + viewWidth)
    x = Math.min(box.x, box.x + box.width - viewWidth);

  if (box.y < viewTop || box.height > viewHeight) {
    y = box.y - inset.top / scale;
  } else if (box.y + box.height > viewTop + viewHeight) {
    y = box.y + box.height - viewHeight - inset.top / scale;
  }
  return { x, y, scale };
}
