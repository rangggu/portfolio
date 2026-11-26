import { Heading } from '@/components/ui/Heading/Heading';
import {
  DevPlaceholder,
  shouldRenderSlot,
} from '../../../../_shared/DevPlaceholder/DevPlaceholder';
import { ItemRow } from './_components/ItemRow/ItemRow';
import styles from './Group.module.css';

/** 학력·자격 한 행의 데이터 (EducationFrame이 이력서 데이터에서 만든다) */
export interface EducationRow {
  key: string;
  /** TODO면 undefined (프로덕션에서는 행을 그리지 않는다) */
  name?: string;
  /** 보조 줄 조각 (TODO인 값은 undefined) */
  details: (string | undefined)[];
  /** 왼쪽 날짜 열. TODO면 undefined */
  date?: string;
}

interface GroupProps {
  id: string;
  label: string;
  /** 날짜 열 폭: range(기간 「2019.03 – 2023.08」) · month(연월 「2022.03」) */
  dateKind: 'range' | 'month';
  rows: EducationRow[];
  source: string;
}

/** 학력 또는 자격 묶음: 굵은 묶음 이름 + 행 목록. 이름이 있는 행이 없으면 그리지 않는다 (개발 모드는 자리표시) */
export function Group({ id, label, dateKind, rows, source }: GroupProps) {
  if (!shouldRenderSlot(rows.some((row) => row.name !== undefined)))
    return null;

  return (
    <section className={styles.group} data-date={dateKind} aria-labelledby={id}>
      <Heading level={3} variant="headingSm" id={id} className={styles.label}>
        {label}
      </Heading>
      {rows.length > 0 ? (
        <ul className={styles.rows}>
          {rows.map((row) => (
            <ItemRow key={row.key} row={row} />
          ))}
        </ul>
      ) : (
        <DevPlaceholder variant="block">
          {label} ({source})
        </DevPlaceholder>
      )}
    </section>
  );
}
