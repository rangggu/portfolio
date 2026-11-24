/**
 * 캔버스 카메라가 한 곳에서 다른 곳으로 미끄러지는 이동의 시간과 곡선.
 * 읽기 모드는 스크롤 위치를, 자유 모드는 카메라 좌표를 이 값으로 옮긴다 (움직임 줄이기면 쓰지 않고 바로 이동).
 */

/** 이 배수(화면 높이 대비 거리)부터 최대 시간 */
const FAR_RATIO = 6;

/**
 * 이동 시간. 화면 높이 한 배 이하는 최소, 멀수록 √ 비례로 늘어 FAR_RATIO 배에서 최대.
 * (먼 이동이 지나치게 길어지지 않게 √를 쓴다)
 */
export function travelDuration(
  distance: number,
  viewportHeight: number,
  { min, max }: { min: number; max: number },
): number {
  if (viewportHeight <= 0) return min;
  const ratio = Math.abs(distance) / viewportHeight;
  if (ratio <= 1) return min;
  const progress = Math.min(
    (Math.sqrt(ratio) - 1) / (Math.sqrt(FAR_RATIO) - 1),
    1,
  );
  return Math.round(min + (max - min) * progress);
}

/** 시작과 끝이 부드러운 곡선 (cubic in-out). t: 0~1 */
export function easeInOut(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped < 0.5 ? 4 * clamped ** 3 : 1 - (-2 * clamped + 2) ** 3 / 2;
}

/** from → to 사이 진행 t(0~1)의 값 */
export function interpolate(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}
