import { describe, expect, it } from 'vitest';

import { placeTooltip } from './placeTooltip';

const VIEWPORT = { width: 400, height: 800 };
const TOOLTIP = { width: 120, height: 32 };
const OPTIONS = { offset: 8, padding: 8 };

describe('placeTooltip', () => {
  it('원하는 쪽에 공간이 있으면 그쪽, 가로는 가운데', () => {
    const anchor = { top: 400, left: 140, width: 120, height: 40 };
    expect(
      placeTooltip(anchor, TOOLTIP, VIEWPORT, { ...OPTIONS, placement: 'top' }),
    ).toEqual({ top: 360, left: 140, placement: 'top' });
    expect(
      placeTooltip(anchor, TOOLTIP, VIEWPORT, {
        ...OPTIONS,
        placement: 'bottom',
      }),
    ).toEqual({ top: 448, left: 140, placement: 'bottom' });
  });

  it('위에 공간이 없으면 아래로 뒤집는다', () => {
    const anchor = { top: 10, left: 140, width: 120, height: 40 };
    const result = placeTooltip(anchor, TOOLTIP, VIEWPORT, {
      ...OPTIONS,
      placement: 'top',
    });
    expect(result).toMatchObject({ top: 58, placement: 'bottom' });
  });

  it('아래에 공간이 없으면 위로 뒤집는다', () => {
    const anchor = { top: 760, left: 140, width: 120, height: 36 };
    const result = placeTooltip(anchor, TOOLTIP, VIEWPORT, {
      ...OPTIONS,
      placement: 'bottom',
    });
    expect(result).toMatchObject({ top: 720, placement: 'top' });
  });

  it('양쪽 다 공간이 없으면 원하는 쪽을 유지한다', () => {
    const anchor = { top: 0, left: 140, width: 120, height: 790 };
    const result = placeTooltip(anchor, TOOLTIP, VIEWPORT, {
      ...OPTIONS,
      placement: 'top',
    });
    expect(result.placement).toBe('top');
  });

  it('화면 왼쪽·오른쪽 끝에서는 여백 안으로 밀어 넣는다', () => {
    const left = placeTooltip(
      { top: 400, left: 0, width: 40, height: 40 },
      TOOLTIP,
      VIEWPORT,
      { ...OPTIONS, placement: 'top' },
    );
    expect(left.left).toBe(8);

    const right = placeTooltip(
      { top: 400, left: 370, width: 30, height: 40 },
      TOOLTIP,
      VIEWPORT,
      { ...OPTIONS, placement: 'top' },
    );
    expect(right.left).toBe(400 - 8 - 120);
  });

  it('툴팁이 화면보다 넓으면 왼쪽 여백에 붙인다', () => {
    const result = placeTooltip(
      { top: 400, left: 100, width: 40, height: 40 },
      { width: 500, height: 32 },
      VIEWPORT,
      { ...OPTIONS, placement: 'top' },
    );
    expect(result.left).toBe(8);
  });
});
