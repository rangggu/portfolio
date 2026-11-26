import { Heading } from '@/components/ui/Heading/Heading';
import { Text } from '@/components/ui/Text/Text';
import type { TimelineEntry } from '@/lib/resume/timeline';
import { DevPlaceholder } from '../../../../../../_shared/DevPlaceholder/DevPlaceholder';
import { PLACEHOLDER_SOURCE } from '../../../../_lib/career';
import { ItemLinks } from '../ItemLinks/ItemLinks';
import { ItemMeta } from '../ItemMeta/ItemMeta';
import styles from './CompanyItem.module.css';

/** 회사 레인 항목: 회사 이름 · 역할·기간 · 성과 목록 · 링크 */
export function CompanyItem({ entry }: { entry: TimelineEntry }) {
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
