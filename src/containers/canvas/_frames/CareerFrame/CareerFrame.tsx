import { Text } from '@/components/ui/Text/Text';
import { getTimelineEntries } from '@/lib/resume/timeline';
import { buildTimelineRows } from '@/lib/resume/timelineRows';
import {
  DevPlaceholder,
  shouldRenderSlot,
} from '../../_shared/DevPlaceholder/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading/FrameHeading';
import { TimelineRows } from './_components/TimelineRows/TimelineRows';
import { YearRow } from './_components/YearRow/YearRow';
import { LANE_LABEL } from './_lib/career';
import styles from './CareerFrame.module.css';

interface CareerFrameProps {
  headingId: string;
  number: string;
  title: string;
}

/**
 * 경력 프레임: 두 갈래 타임라인 (product.md 「경력 섹션」).
 * 연도 행마다 회사(굵은 막대) · 사이드(얇은 선) 칸을 두고, 안쪽 폭 768px 미만이면 한 열로 접는다.
 */
export async function CareerFrame({
  headingId,
  number,
  title,
}: CareerFrameProps) {
  const entries = await getTimelineEntries();
  const { rows, undated } = buildTimelineRows(
    entries,
    new Date().getFullYear(),
  );
  const showUndated = undated.length > 0 && shouldRenderSlot(false);

  return (
    <div className={styles.root}>
      <FrameHeading number={number} title={title} id={headingId} />
      {(rows.length > 0 || showUndated) && (
        <div className={styles.timeline}>
          {/* 레인 머리줄. 각 칸 그룹 이름과 겹쳐 보조기기에서는 숨긴다 */}
          <div className={styles.legend} aria-hidden="true">
            {(['company', 'side'] as const).map((lane) => (
              <Text
                key={lane}
                as="span"
                variant="monoSm"
                tone="secondary"
                className={styles.legendItem}
                data-lane={lane}
              >
                <span className={styles.legendMarker} />
                {LANE_LABEL[lane]}
              </Text>
            ))}
          </div>
          <TimelineRows className={styles.rows}>
            {rows.map((row) => (
              <YearRow key={row.year} label={row.year} row={row} />
            ))}
            {showUndated && (
              <YearRow
                label={<DevPlaceholder>날짜 미정</DevPlaceholder>}
                row={{
                  company: undated
                    .filter((entry) => entry.item.lane === 'company')
                    .map((entry) => ({ entry, isStart: true })),
                  side: undated.filter((entry) => entry.item.lane === 'side'),
                }}
              />
            )}
          </TimelineRows>
        </div>
      )}
    </div>
  );
}
