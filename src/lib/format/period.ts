interface Period {
  /** YYYY-MM */
  start: string;
  /** YYYY-MM. 없으면 진행 중 */
  end?: string;
}

function toDotted(yearMonth: string): string {
  return yearMonth.replace('-', '.');
}

/** { start: '2024-03', end: '2024-08' } → '2024.03 – 2024.08', end가 없으면 '2024.03 – 진행 중' */
export function formatPeriod({ start, end }: Period): string {
  return `${toDotted(start)} – ${end ? toDotted(end) : '진행 중'}`;
}
