import { Text } from '@/components/ui/Text/Text';
import type { TimelineEntry } from '@/lib/resume/timeline';
import type { TimelineRow } from '@/lib/resume/timelineRows';
import { LANE_LABEL } from '../../_lib/career';
import { CompanyItem } from './_components/CompanyItem/CompanyItem';
import { SideItem } from './_components/SideItem/SideItem';
import styles from './YearRow.module.css';

interface YearRowProps {
  label: React.ReactNode;
  row: Omit<TimelineRow<TimelineEntry>, 'year'>;
}

/** 연도 행 하나: 연도 | 회사 칸 | 사이드 칸. 칸마다 레인 이름이 붙은 그룹이라 한 열로 접혀도 레인이 구분된다 */
export function YearRow({ label, row }: YearRowProps) {
  const companyStarts = row.company.filter((cell) => cell.isStart);
  const hasCompany = row.company.length > 0;
  // 이 행의 막대가 누구 것인지: 이 해에 시작한 회사가 있으면 그 회사, 없으면 이어지는 회사 (강조 단위)
  const barOwners = (
    companyStarts.length > 0 ? companyStarts : row.company
  ).map((cell) => cell.entry.item.id);

  return (
    <li className={styles.row}>
      <Text as="span" variant="monoMd" tone="tertiary" className={styles.year}>
        {label}
      </Text>
      <div
        className={styles.cell}
        data-lane="company"
        data-company={hasCompany ? barOwners.join(' ') : undefined}
        data-empty={companyStarts.length === 0 || undefined}
        role={companyStarts.length > 0 ? 'group' : undefined}
        aria-label={companyStarts.length > 0 ? LANE_LABEL.company : undefined}
      >
        {hasCompany && (
          <span
            className={styles.marker}
            data-start={row.company.some((cell) => cell.isStart) || undefined}
            aria-hidden="true"
          />
        )}
        {companyStarts.length > 0 && (
          <div className={styles.cellBody}>
            {companyStarts.map((cell) => (
              <CompanyItem key={cell.entry.item.id} entry={cell.entry} />
            ))}
          </div>
        )}
      </div>
      <div
        className={styles.cell}
        data-lane="side"
        data-empty={row.side.length === 0 || undefined}
        role={row.side.length > 0 ? 'group' : undefined}
        aria-label={row.side.length > 0 ? LANE_LABEL.side : undefined}
      >
        <span className={styles.marker} aria-hidden="true" />
        {row.side.length > 0 && (
          <ul className={styles.cellBody}>
            {row.side.map((entry) => (
              <SideItem key={entry.item.id} entry={entry} />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
