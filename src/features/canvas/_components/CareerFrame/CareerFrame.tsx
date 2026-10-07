import { Heading } from '@/components/ui/Heading';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import styles from './CareerFrame.module.css';

interface CareerFrameProps {
  headingId: string;
  title: string;
}

const LANES = [
  { id: 'company', label: '회사', items: ['회사 자리 A', '회사 자리 B'] },
  {
    id: 'side',
    label: '사이드·개인',
    items: ['사이드 자리 A', '사이드 자리 B', '이 포트폴리오'],
  },
] as const;

export function CareerFrame({ headingId, title }: CareerFrameProps) {
  return (
    <Stack gap="32">
      <Heading level={2} id={headingId}>
        {title}
      </Heading>
      <div className={styles.timeline}>
        {/* 한 레인으로 접혔을 때 상단 레인 라벨. 레인 제목과 중복이라 보조기기에서는 숨긴다 */}
        <Stack
          direction="row"
          gap="16"
          className={styles.legend}
          aria-hidden="true"
        >
          {LANES.map((lane) => (
            <Text
              key={lane.id}
              as="span"
              variant="labelSm"
              tone="secondary"
              className={styles.legendItem}
              data-lane={lane.id}
            >
              {lane.label}
            </Text>
          ))}
        </Stack>
        <div className={styles.lanes}>
          {LANES.map((lane) => (
            <div
              key={lane.id}
              className={styles.lane}
              data-lane={lane.id}
              aria-labelledby={`career-lane-${lane.id}`}
              role="group"
            >
              <Heading
                level={3}
                variant="labelSm"
                tone="secondary"
                id={`career-lane-${lane.id}`}
                className={styles.laneTitle}
              >
                {lane.label}
              </Heading>
              <Stack as="ul" gap="16">
                {lane.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <Text as="span" variant="monoSm" tone="tertiary">
                      YYYY.MM — YYYY.MM
                    </Text>
                    <Text variant="headingSm">{item}</Text>
                  </li>
                ))}
              </Stack>
            </div>
          ))}
        </div>
      </div>
    </Stack>
  );
}
