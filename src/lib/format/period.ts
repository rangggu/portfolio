interface Period {
  /** YYYY-MM */
  start: string;
  /** YYYY-MM. 없으면 진행 중 */
  end?: string;
}

/** '2023-09' → '2023.09' */
export function formatYearMonth(yearMonth: string): string {
  return yearMonth.replace('-', '.');
}

/**
 * { start: '2024-03', end: '2024-08' } → '2024.03 – 2024.08', end가 없으면 '2024.03 – 진행 중',
 * 시작과 끝이 같은 달이면 '2024.03'
 */
export function formatPeriod({ start, end }: Period): string {
  if (end === start) return formatYearMonth(start);
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : '진행 중'}`;
}
