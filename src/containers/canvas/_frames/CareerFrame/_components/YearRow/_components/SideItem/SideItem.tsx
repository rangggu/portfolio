import { Heading } from '@/components/ui/Heading/Heading';
import { Text } from '@/components/ui/Text/Text';
import type { TimelineEntry } from '@/lib/resume/timeline';
import { ItemLinks } from '../ItemLinks/ItemLinks';
import { ItemMeta } from '../ItemMeta/ItemMeta';
import { ItemSummary } from './_components/ItemSummary/ItemSummary';
import styles from './SideItem.module.css';

/** 사이드 레인 마지막 항목(content/resume/timeline.ts). 「지금 보는 중」을 붙인다 */
const CURRENT_SITE_TIMELINE_ID = 'portfolio';

/** 사이드 레인 항목: 이름(+ 지금 보는 중) · 기간 · 한 줄 설명 · 링크 */
export function SideItem({ entry }: { entry: TimelineEntry }) {
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
