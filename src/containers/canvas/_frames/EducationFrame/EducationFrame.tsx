import { formatPeriod, formatYearMonth } from '@/lib/format/period';
import { filled, isTodo, RESUME } from '@/lib/resume';
import { shouldRenderSlot } from '../../_shared/DevPlaceholder/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading/FrameHeading';
import { Group, type EducationRow } from './_components/Group/Group';
import styles from './EducationFrame.module.css';

interface EducationFrameProps {
  headingId: string;
  number: string;
  title: string;
}

const { education, certifications } = RESUME;

const EDUCATION_ROWS: EducationRow[] = education.map((item) => ({
  key: `${item.school}-${item.period.start}`,
  name: filled(item.school),
  details: [filled(item.major), filled(item.degree)],
  date: isTodo(item.period.start) ? undefined : formatPeriod(item.period),
}));

const CERTIFICATION_ROWS: EducationRow[] = certifications.map((item) => ({
  key: `${item.name}-${item.date}`,
  name: filled(item.name),
  details: [filled(item.issuer)],
  date: isTodo(item.date) ? undefined : formatYearMonth(item.date),
}));

const hasName = (row: EducationRow) => row.name !== undefined;

/**
 * 학력·자격 프레임: 학력 / 자격 두 열 (mockup-spec.md 「학력·자격」). 안쪽 폭 768px 미만이면 한 열.
 * 행은 왼쪽 날짜 열 | 이름·세부 (경력 타임라인의 연도 열처럼, 날짜와 이름이 멀어지지 않게)
 */
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
            dateKind="range"
            rows={EDUCATION_ROWS}
            source="content/resume/education.ts"
          />
          <Group
            id="education-certification"
            label="자격"
            dateKind="month"
            rows={CERTIFICATION_ROWS}
            source="content/resume/education.ts"
          />
        </div>
      )}
    </div>
  );
}
