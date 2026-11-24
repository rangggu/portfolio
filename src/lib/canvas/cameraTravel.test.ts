import { describe, expect, it } from 'vitest';

import { easeInOut, interpolate, travelDuration } from './cameraTravel';

const RANGE = { min: 400, max: 600 };

describe('travelDuration', () => {
  it('화면 높이 한 배 이하는 최소', () => {
    expect(travelDuration(0, 800, RANGE)).toBe(400);
    expect(travelDuration(800, 800, RANGE)).toBe(400);
    expect(travelDuration(-500, 800, RANGE)).toBe(400);
  });

  it('멀수록 늘어나고 최대에서 멈춘다', () => {
    const near = travelDuration(1600, 800, RANGE);
    const far = travelDuration(4000, 800, RANGE);
    expect(near).toBeGreaterThan(400);
    expect(far).toBeGreaterThan(near);
    expect(travelDuration(4800, 800, RANGE)).toBe(600);
    expect(travelDuration(40000, 800, RANGE)).toBe(600);
  });

  it('화면 높이가 0이면 최소', () => {
    expect(travelDuration(1000, 0, RANGE)).toBe(400);
  });
});

describe('easeInOut', () => {
  it('0에서 시작해 1에서 끝나고 가운데는 0.5', () => {
    expect(easeInOut(0)).toBe(0);
    expect(easeInOut(1)).toBe(1);
    expect(easeInOut(0.5)).toBe(0.5);
  });

  it('시작과 끝은 느리다', () => {
    expect(easeInOut(0.1)).toBeLessThan(0.1);
    expect(easeInOut(0.9)).toBeGreaterThan(0.9);
  });

  it('범위를 벗어나면 자른다', () => {
    expect(easeInOut(-1)).toBe(0);
    expect(easeInOut(2)).toBe(1);
  });
});

describe('interpolate', () => {
  it('진행 비율만큼 옮긴다', () => {
    expect(interpolate(100, 300, 0)).toBe(100);
    expect(interpolate(100, 300, 0.25)).toBe(150);
    expect(interpolate(100, 300, 1)).toBe(300);
  });
});
