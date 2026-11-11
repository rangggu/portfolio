import { describe, expect, it } from 'vitest';

import { formatPeriod, formatYearMonth } from './period';

describe('formatPeriod', () => {
  it('시작과 끝을 점 형식으로 잇는다', () => {
    expect(formatPeriod({ start: '2024-03', end: '2024-08' })).toBe(
      '2024.03 – 2024.08',
    );
  });

  it('끝이 없으면 진행 중으로 표시한다', () => {
    expect(formatPeriod({ start: '2025-01' })).toBe('2025.01 – 진행 중');
  });

  it('시작과 끝이 같은 달이면 한 번만 쓴다', () => {
    expect(formatPeriod({ start: '2024-10', end: '2024-10' })).toBe('2024.10');
  });
});

describe('formatYearMonth', () => {
  it('연월을 점 형식으로 바꾼다', () => {
    expect(formatYearMonth('2023-09')).toBe('2023.09');
  });
});
