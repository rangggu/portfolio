import { describe, it, expect } from 'vitest';
import { simulateSpring, springToLinear } from './spring';

describe('simulateSpring', () => {
  it('0에서 시작한다', () => {
    const points = simulateSpring();
    expect(points[0]?.value).toBe(0);
  });

  it('1 근처로 수렴한다', () => {
    const points = simulateSpring();
    const last = points[points.length - 1];
    expect(last?.value).toBeCloseTo(1, 2);
  });

  it('감쇠가 약하면 오버슈트가 발생한다', () => {
    const points = simulateSpring({ stiffness: 200, damping: 10 });
    const max = Math.max(...points.map((p) => p.value));
    expect(max).toBeGreaterThan(1);
  });

  it('감쇠가 강하면 오버슈트 없이 수렴한다', () => {
    const points = simulateSpring({ stiffness: 100, damping: 30 });
    const max = Math.max(...points.map((p) => p.value));
    expect(max).toBeLessThanOrEqual(1.01);
  });
});

describe('springToLinear', () => {
  it('linear(...) 형태의 문자열을 반환한다', () => {
    const result = springToLinear();
    expect(result).toMatch(/^linear\(.+\)$/);
  });

  it('첫 값이 0, 마지막 값이 1 근처이다', () => {
    const result = springToLinear();
    const inner = result.slice('linear('.length, -1);
    const parts = inner.split(',').map((s) => s.trim());

    const first = parseFloat(parts[0] ?? '');
    const last = parseFloat(parts[parts.length - 1] ?? '');

    expect(first).toBe(0);
    expect(last).toBeCloseTo(1, 2);
  });

  it('outputSteps 수만큼 점이 생성된다', () => {
    const steps = 15;
    const result = springToLinear({}, steps);
    const inner = result.slice('linear('.length, -1);
    const parts = inner.split(',');
    expect(parts.length).toBe(steps + 1);
  });
});
