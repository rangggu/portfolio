import { describe, expect, it } from 'vitest';

import { formatPeriod } from './period';

describe('formatPeriod', () => {
  it('시작과 끝을 점 형식으로 잇는다', () => {
    expect(formatPeriod({ start: '2024-03', end: '2024-08' })).toBe(
      '2024.03 – 2024.08',
    );
  });

  it('끝이 없으면 진행 중으로 표시한다', () => {
    expect(formatPeriod({ start: '2025-01' })).toBe('2025.01 – 진행 중');
  });
});
