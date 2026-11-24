import { Fragment } from 'react';

import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { formatPeriod } from '@/lib/format/period';
import { filled, isTodo, type TimelineItem } from '@/lib/resume';
import { getTimelineEntries, type TimelineEntry } from '@/lib/resume/timeline';
import { buildTimelineRows, type TimelineRow } from '@/lib/resume/timelineRows';
import { DevPlaceholder, shouldRenderSlot } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import styles from './CareerFrame.module.css';

interface CareerFrameProps {
  headingId: string;
  number: string;
  title: string;
}

const LANE_LABEL = { company: '회사', side: '사이드 · 개인' } as const;

/** 사이드 레인 마지막 항목(content/resume/timeline.ts). 「지금 보는 중」을 붙인다 */
const CURRENT_SITE_TIMELINE_ID = 'portfolio';

const PLACEHOLDER_SOURCE = 'content/resume/timeline.ts';

/** 역할 · 기간 (회사) 또는 기간 · 교육 과정 (사이드). 빈 값은 개발 모드에서만 자리표시 */
function ItemMeta({ item }: { item: TimelineItem }) {
  const isDev = shouldRenderSlot(false);
  const parts: React.ReactNode[] = [];

  if (item.lane === 'company') {
    const role = filled(item.role);
    if (role) parts.push(role);
    else if (isDev)
      parts.push(<DevPlaceholder key="role">역할</DevPlaceholder>);
  }
  if (!isTodo(item.period.start)) parts.push(formatPeriod(item.period));
  else if (isDev)
    parts.push(<DevPlaceholder key="period">기간</DevPlaceholder>);
  if (item.dimmed) parts.push('교육 과정');

  if (parts.length === 0) return null;

  return (
    <Text variant="monoSm" tone={item.dimmed ? 'tertiary' : 'secondary'}>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && ' · '}
          {part}
        </Fragment>
      ))}
    </Text>
  );
}

function ItemSummary({ item }: { item: TimelineItem }) {
  const summary = filled(item.summary);
  if (!shouldRenderSlot(Boolean(summary))) return null;
  return (
    <Text variant="bodySm" tone="secondary">
      {summary ?? (
        <DevPlaceholder>한 줄 설명 ({PLACEHOLDER_SOURCE})</DevPlaceholder>
      )}
    </Text>
  );
}

/** 항목 링크 + 연결된 케이스 스터디 글 */
function ItemLinks({ entry }: { entry: TimelineEntry }) {
  const { item, projects } = entry;
  if (item.links.length === 0 && projects.length === 0) return null;

  return (
    <ul className={styles.links}>
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={`/projects/${project.slug}`}>{project.title} →</Link>
        </li>
      ))}
      {item.links.map((link) => (
        <li key={link.url}>
          <Link href={link.url}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

function CompanyItem({ entry }: { entry: TimelineEntry }) {
  const { item } = entry;
  const achievements = item.lane === 'company' ? item.achievements : [];

  return (
    <div className={styles.company}>
      <Heading level={3} variant="headingSm">
        {item.name}
      </Heading>
      <ItemMeta item={item} />
      {achievements.length > 0 ? (
        <ul className={styles.achievements}>
          {achievements.map((achievement) => (
            <li key={achievement}>
              <Text variant="bodyMd">{achievement}</Text>
            </li>
          ))}
        </ul>
      ) : (
        <DevPlaceholder>성과 요약 ({PLACEHOLDER_SOURCE})</DevPlaceholder>
      )}
      <ItemLinks entry={entry} />
    </div>
  );
}

function SideItem({ entry }: { entry: TimelineEntry }) {
  const { item } = entry;

  return (
    <li className={styles.side}>
      <div className={styles.sideName}>
        <Heading
          level={3}
          variant="labelMd"
          tone={item.dimmed ? 'tertiary' : 'primary'}
        >
          {item.name}
        </Heading>
        {item.id === CURRENT_SITE_TIMELINE_ID && (
          <Text as="span" variant="caption" tone="accent">
            지금 보는 중
          </Text>
        )}
      </div>
      <ItemMeta item={item} />
      <ItemSummary item={item} />
      <ItemLinks entry={entry} />
    </li>
  );
}

interface YearRowProps {
  label: React.ReactNode;
  row: Omit<TimelineRow<TimelineEntry>, 'year'>;
}

/** 연도 행 하나: 연도 | 회사 칸 | 사이드 칸. 칸마다 레인 이름이 붙은 그룹이라 한 열로 접혀도 레인이 구분된다 */
function YearRow({ label, row }: YearRowProps) {
  const companyStarts = row.company.filter((cell) => cell.isStart);
  const hasCompany = row.company.length > 0;

  return (
    <li className={styles.row}>
      <Text as="span" variant="monoMd" tone="tertiary" className={styles.year}>
        {label}
      </Text>
      <div
        className={styles.cell}
        data-lane="company"
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
          <ol className={styles.rows}>
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
          </ol>
        </div>
      )}
    </div>
  );
}
