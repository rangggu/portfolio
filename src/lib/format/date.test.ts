import { describe, it, expect } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('should format a date in Korean locale', () => {
    const date = new Date('2026-01-15');
    const result = formatDate(date);
    expect(result).toContain('2026');
    expect(result).toContain('15');
  });
});
