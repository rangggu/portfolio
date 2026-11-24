import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { formatYearMonth } from '@/lib/format/period';
import { filled, RESUME } from '@/lib/resume';
import { getCareerStart } from '@/lib/resume/careerStart';
import { DevPlaceholder, shouldRenderSlot } from '../../_shared/DevPlaceholder';
import styles from './HeroFrame.module.css';

interface HeroFrameProps {
  headingId: string;
}

const { profile, timeline } = RESUME;

interface ContactRow {
  label: string;
  value: React.ReactNode;
  /** 값이 비었을 때 개발 모드에서 보일 자리표시 */
  placeholder: string;
  hasValue: boolean;
}

/** 첫 화면: 왼쪽 이름·소개, 오른쪽 연락처 블록 (안쪽 폭 768px 미만이면 연락처가 아래로) */
export function HeroFrame({ headingId }: HeroFrameProps) {
  const email = filled(profile.email);
  const github = profile.links.find((link) => link.type === 'github');
  const careerStart = getCareerStart(timeline);

  const rows: ContactRow[] = [
    {
      label: '이메일',
      value: email && <Link href={`mailto:${email}`}>{email}</Link>,
      placeholder: '이메일 (content/resume/profile.ts)',
      hasValue: Boolean(email),
    },
    {
      label: 'GitHub',
      value: github && (
        <Link href={github.url}>{github.url.replace(/^https?:\/\//, '')}</Link>
      ),
      placeholder: 'GitHub 링크 (content/resume/profile.ts)',
      hasValue: Boolean(github),
    },
    {
      label: '개발 시작',
      value: careerStart && `${formatYearMonth(careerStart)} –`,
      placeholder: '회사 시작월 (content/resume/timeline.ts)',
      hasValue: Boolean(careerStart),
    },
  ];
  const visibleRows = rows.filter((row) => shouldRenderSlot(row.hasValue));

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.nameRow}>
          <Heading level={1} variant="display" id={headingId}>
            {profile.name}
          </Heading>
          <Text as="span" variant="headingMd" tone="secondary">
            {profile.jobTitle}
          </Text>
        </div>
        <Text variant="headingXl">{profile.tagline}</Text>
        <Text variant="bodyLg" tone="secondary">
          {profile.subline}
        </Text>
      </div>
      {visibleRows.length > 0 && (
        <dl className={styles.contact}>
          {visibleRows.map((row) => (
            <div key={row.label} className={styles.contactRow}>
              <dt className={styles.contactLabel}>{row.label}</dt>
              <dd className={styles.contactValue}>
                {row.hasValue ? (
                  row.value
                ) : (
                  <DevPlaceholder>{row.placeholder}</DevPlaceholder>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
