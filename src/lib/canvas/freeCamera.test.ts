import { describe, expect, it } from 'vitest';

import {
  boundsOf,
  centerPoint,
  fitBounds,
  frameCamera,
  panBy,
  revealBox,
  scaleAt,
  zoomAt,
  type FreeCamera,
} from './freeCamera';

const VIEWPORT = { width: 1000, height: 800 };
const ORIGIN: FreeCamera = { x: 0, y: 0, scale: 1 };

describe('panBy', () => {
  it('화면 이동만큼 world를 옮기고, 배율이 작으면 더 멀리 간다', () => {
    expect(panBy(ORIGIN, 100, -50)).toEqual({ x: 100, y: -50, scale: 1 });
    expect(panBy({ x: 0, y: 0, scale: 0.5 }, 100, 0).x).toBe(200);
  });
});

describe('scaleAt · zoomAt', () => {
  it('마우스 아래 world 좌표가 그대로다', () => {
    const point = { x: 300, y: 200 };
    const before = { x: 50, y: 80, scale: 1 };
    const after = zoomAt(before, 2, point);
    const worldBefore = before.x + point.x / before.scale;
    const worldAfter = after.x + point.x / after.scale;
    expect(after.scale).toBe(2);
    expect(worldAfter).toBeCloseTo(worldBefore);
    expect(after.y + point.y / after.scale).toBeCloseTo(
      before.y + point.y / before.scale,
    );
  });

  it('범위(10%~200%) 밖으로 나가지 않는다', () => {
    expect(zoomAt(ORIGIN, 10, { x: 0, y: 0 }).scale).toBe(2);
    expect(scaleAt(ORIGIN, 0.01, { x: 0, y: 0 }).scale).toBe(0.1);
  });
});

describe('boundsOf · fitBounds', () => {
  const frames = [
    { x: 0, y: 0, width: 1000, height: 800 },
    { x: 1100, y: 900, width: 1000, height: 2000 },
  ];

  it('상자들을 모두 감싼다', () => {
    expect(boundsOf(frames)).toEqual({ x: 0, y: 0, width: 2100, height: 2900 });
    expect(boundsOf([])).toBeUndefined();
  });

  it('전체가 여백 안에 들어오고 가운데에 맞는다', () => {
    const bounds = { x: 0, y: 0, width: 2100, height: 2900 };
    const camera = fitBounds(bounds, VIEWPORT, 50);
    expect(camera.scale).toBeCloseTo(700 / 2900);
    const center = centerPoint(camera, VIEWPORT);
    expect(center.x).toBeCloseTo(1050);
    expect(center.y).toBeCloseTo(1450);
  });

  it('작은 상자도 200%를 넘게 키우지 않는다', () => {
    const camera = fitBounds(
      { x: 0, y: 0, width: 10, height: 10 },
      VIEWPORT,
      0,
    );
    expect(camera.scale).toBe(2);
  });
});

describe('frameCamera', () => {
  it('프레임을 100%로 가로 가운데·맨 위에 맞춘다', () => {
    expect(
      frameCamera({ x: 1100, y: 900, width: 800, height: 2000 }, VIEWPORT),
    ).toEqual({
      x: 1000,
      y: 900,
      scale: 1,
    });
  });
});

describe('revealBox', () => {
  it('이미 보이면 그대로', () => {
    const camera = { x: 0, y: 0, scale: 1 };
    expect(
      revealBox(camera, { x: 100, y: 100, width: 50, height: 20 }, VIEWPORT),
    ).toEqual(camera);
  });

  it('아래에 가려지면 아래 끝이 보이게, 위면 위 끝이 보이게', () => {
    const camera = { x: 0, y: 0, scale: 1 };
    expect(
      revealBox(camera, { x: 0, y: 900, width: 10, height: 20 }, VIEWPORT).y,
    ).toBe(120);
    expect(
      revealBox(
        { x: 0, y: 500, scale: 1 },
        { x: 0, y: 100, width: 10, height: 20 },
        VIEWPORT,
      ).y,
    ).toBe(100);
  });

  it('위아래 inset(플로팅 UI)을 피한다', () => {
    const camera = { x: 0, y: 0, scale: 1 };
    const result = revealBox(
      camera,
      { x: 0, y: 10, width: 10, height: 20 },
      VIEWPORT,
      { top: 60, bottom: 70 },
    );
    expect(result.y).toBe(-50);
  });

  it('왼쪽·오른쪽 밖이면 가로로 옮긴다', () => {
    const camera = { x: 0, y: 0, scale: 1 };
    expect(
      revealBox(camera, { x: 1200, y: 10, width: 100, height: 10 }, VIEWPORT).x,
    ).toBe(300);
    expect(
      revealBox(
        { x: 500, y: 0, scale: 1 },
        { x: 100, y: 10, width: 50, height: 10 },
        VIEWPORT,
      ).x,
    ).toBe(100);
  });
});
