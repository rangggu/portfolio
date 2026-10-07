/**
 * 스프링 파라미터로 CSS `linear()` easing 문자열을 생성한다.
 * 감쇠 스프링(damped spring)을 시간 단계별로 시뮬레이션하고,
 * 결과 곡선을 linear() 포맷의 점 목록으로 변환한다.
 */

interface SpringParams {
  /** 강성 (기본 100) */
  stiffness?: number;
  /** 감쇠 (기본 10) */
  damping?: number;
  /** 질량 (기본 1) */
  mass?: number;
  /** 시뮬레이션 단계 수 (기본 100) */
  steps?: number;
  /** 정착 판정 임계값 (기본 0.001) */
  restThreshold?: number;
}

interface SpringPoint {
  /** 0–1 사이의 시간 비율 */
  t: number;
  /** 스프링 값 (0에서 시작, 1 근처로 수렴) */
  value: number;
}

/**
 * 감쇠 스프링을 시뮬레이션하여 시간–값 점 배열을 반환한다.
 * 0 → 1 이동, 정착(rest)되면 조기 종료.
 */
export function simulateSpring(params: SpringParams = {}): SpringPoint[] {
  const {
    stiffness = 100,
    damping = 10,
    mass = 1,
    steps = 100,
    restThreshold = 0.001,
  } = params;

  const dt = 1 / steps;
  const points: SpringPoint[] = [{ t: 0, value: 0 }];

  let position = 0;
  let velocity = 0;
  let settled = false;

  for (let i = 1; i <= steps * 10 && !settled; i++) {
    const springForce = -stiffness * (position - 1);
    const dampingForce = -damping * velocity;
    const acceleration = (springForce + dampingForce) / mass;

    velocity += acceleration * dt;
    position += velocity * dt;

    const time = i * dt;
    points.push({ t: time, value: position });

    if (
      Math.abs(position - 1) < restThreshold &&
      Math.abs(velocity) < restThreshold
    ) {
      settled = true;
    }
  }

  return points;
}

/**
 * 스프링 시뮬레이션 결과를 0–1 시간 범위로 정규화하고
 * 균등 간격으로 리샘플링한다.
 */
function normalizePoints(points: SpringPoint[], outputSteps: number): number[] {
  const totalTime = points[points.length - 1]?.t ?? 1;
  const result: number[] = [];

  for (let i = 0; i <= outputSteps; i++) {
    const targetTime = (i / outputSteps) * totalTime;

    let lo = 0;
    let hi = points.length - 1;
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1;
      if ((points[mid]?.t ?? 0) <= targetTime) lo = mid;
      else hi = mid;
    }

    const p0 = points[lo];
    const p1 = points[hi];
    if (!p0 || !p1) {
      result.push(i === 0 ? 0 : 1);
      continue;
    }

    const segmentDuration = p1.t - p0.t;
    const ratio =
      segmentDuration > 0 ? (targetTime - p0.t) / segmentDuration : 0;
    const value = p0.value + (p1.value - p0.value) * ratio;

    result.push(value);
  }

  return result;
}

/**
 * 스프링 파라미터로 CSS `linear()` easing 문자열을 생성한다.
 *
 * @example
 * ```ts
 * springToLinear({ stiffness: 120, damping: 14 })
 * // → "linear(0, 0.19 4%, 0.54 10%, ...)"
 * ```
 */
export function springToLinear(
  params: SpringParams = {},
  /** linear() 출력 점 수 (기본 25) */
  outputSteps = 25,
  /** 소수점 자릿수 (기본 3) */
  precision = 3,
): string {
  const raw = simulateSpring(params);
  const values = normalizePoints(raw, outputSteps);

  const entries = values.map((v, i) => {
    const rounded = Number(v.toFixed(precision));
    if (i === 0) return String(rounded);
    if (i === values.length - 1) return String(rounded);

    const percent = Number(((i / outputSteps) * 100).toFixed(1));
    return `${rounded} ${percent}%`;
  });

  return `linear(${entries.join(', ')})`;
}
