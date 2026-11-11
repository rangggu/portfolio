import { Fragment } from 'react';

import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { formatPeriod, formatYearMonth } from '@/lib/format/period';
import { filled, isTodo, RESUME } from '@/lib/resume';
import { DevPlaceholder, shouldRenderSlot } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import styles from './EducationFrame.module.css';

interface EducationFrameProps {
  headingId: string;
  number: string;
  title: string;
}

const { education, certifications } = RESUME;

interface Row {
  key: string;
  /** TODO면 undefined (프로덕션에서는 행을 그리지 않는다) */
  name?: string;
  /** 보조 줄 조각 (TODO인 값은 undefined) */
  details: (string | undefined)[];
  /** 오른쪽 날짜. TODO면 undefined */
  date?: string;
}

const EDUCATION_ROWS: Row[] = education.map((item) => ({
  key: `${item.school}-${item.period.start}`,
  name: filled(item.school),
  details: [filled(item.major), filled(item.degree)],
  date: isTodo(item.period.start) ? undefined : formatPeriod(item.period),
}));

const CERTIFICATION_ROWS: Row[] = certifications.map((item) => ({
  key: `${item.name}-${item.date}`,
  name: filled(item.name),
  details: [filled(item.issuer)],
  date: isTodo(item.date) ? undefined : formatYearMonth(item.date),
}));

function ItemRow({ row }: { row: Row }) {
  if (!shouldRenderSlot(row.name !== undefined)) return null;
  const details = row.details.filter((detail) => detail !== undefined);
  const hasMissingDetail = details.length < row.details.length;

  return (
    <li className={styles.row}>
      <div className={styles.main}>
        <Text variant="bodyLg">
          {row.name ?? <DevPlaceholder>이름</DevPlaceholder>}
        </Text>
        {shouldRenderSlot(!hasMissingDetail && details.length > 0) && (
          <Text variant="bodySm" tone="secondary">
            {details.map((detail, index) => (
              <Fragment key={index}>
                {index > 0 && ' · '}
                {detail}
              </Fragment>
            ))}
            {hasMissingDetail && (
              <>
                {details.length > 0 && ' · '}
                <DevPlaceholder>빈 값 있음</DevPlaceholder>
              </>
            )}
          </Text>
        )}
      </div>
      {row.date ? (
        <Text
          as="span"
          variant="monoSm"
          tone="tertiary"
          className={styles.date}
        >
          {row.date}
        </Text>
      ) : (
        <DevPlaceholder>날짜</DevPlaceholder>
      )}
    </li>
  );
}

interface GroupProps {
  id: string;
  label: string;
  rows: Row[];
  source: string;
}

const hasName = (row: Row) => row.name !== undefined;

function Group({ id, label, rows, source }: GroupProps) {
  if (!shouldRenderSlot(rows.some(hasName))) return null;

  return (
    <section className={styles.group} aria-labelledby={id}>
      <Heading level={3} variant="monoSm" tone="secondary" id={id}>
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

/** 학력·자격 프레임: 학력 / 자격 두 열 (mockup-spec.md 「학력·자격」). 안쪽 폭 768px 미만이면 한 열 */
export function EducationFrame({
  headingId,
  number,
  title,
}: EducationFrameProps) {
  return (
    <div className={styles.root}>
      <FrameHeading number={number} title={title} id={headingId} />
      {shouldRenderSlot(
        EDUCATION_ROWS.some(hasName) || CERTIFICATION_ROWS.some(hasName),
      ) && (
        <div className={styles.columns}>
          <Group
            id="education-school"
            label="학력"
            rows={EDUCATION_ROWS}
            source="content/resume/education.ts"
          />
          <Group
            id="education-certification"
            label="자격"
            rows={CERTIFICATION_ROWS}
            source="content/resume/education.ts"
          />
        </div>
      )}
    </div>
  );
}
