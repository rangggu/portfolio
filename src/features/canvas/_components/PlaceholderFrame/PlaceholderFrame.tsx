import { Heading } from '@/components/ui/Heading';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import styles from './PlaceholderFrame.module.css';

interface PlaceholderFrameProps {
  headingId: string;
  title: string;
}

export function PlaceholderFrame({ headingId, title }: PlaceholderFrameProps) {
  return (
    <Stack gap="32">
      <Heading level={2} id={headingId}>
        {title}
      </Heading>
      <div className={styles.slot}>
        <Text variant="caption" tone="tertiary">
          {title} 내용 자리
        </Text>
      </div>
    </Stack>
  );
}
