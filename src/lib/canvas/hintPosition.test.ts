import { describe, expect, it } from 'vitest';

import { hintPosition } from './hintPosition';

const base = {
  barLeft: 400,
  barRight: 1100,
  hintWidth: 200,
  viewportWidth: 1512,
  edge: 16,
  tailInset: 20,
};

describe('hintPosition', () => {
  it('항목 가운데 위에 두고 꼬리는 말풍선 가운데', () => {
    expect(hintPosition({ ...base, targetCenter: 800 })).toEqual({
      left: 700,
      tailX: 100,
    });
  });

  it('화면 오른쪽 끝을 넘지 않게 막고 꼬리를 항목 쪽으로 옮긴다', () => {
    const result = hintPosition({
      ...base,
      barRight: 1500,
      targetCenter: 1450,
    });
    expect(result.left).toBe(1512 - 16 - 200);
    expect(result.tailX).toBe(1450 - result.left);
  });

  it('화면 왼쪽 끝을 넘지 않게 막고, 꼬리는 둥근 모서리 안쪽에서 멈춘다', () => {
    const result = hintPosition({
      ...base,
      barLeft: 0,
      targetCenter: 10,
    });
    expect(result.left).toBe(16);
    expect(result.tailX).toBe(20);
  });

  it('항목이 바 밖으로 밀려 안 보이면 꼬리 없이 바 가운데 위', () => {
    expect(hintPosition({ ...base, targetCenter: 1300 })).toEqual({
      left: 650,
      tailX: null,
    });
  });

  it('화면이 말풍선보다 좁으면 왼쪽 여백에 붙인다', () => {
    const result = hintPosition({
      ...base,
      viewportWidth: 150,
      barLeft: 0,
      barRight: 150,
      targetCenter: 75,
    });
    expect(result.left).toBe(16);
  });
});
