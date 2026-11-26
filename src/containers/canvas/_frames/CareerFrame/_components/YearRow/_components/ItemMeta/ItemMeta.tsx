import { Fragment } from 'react';

import { Text } from '@/components/ui/Text/Text';
import { formatPeriod } from '@/lib/format/period';
import { filled, isTodo, type TimelineItem } from '@/lib/resume';
import {
  DevPlaceholder,
  shouldRenderSlot,
} from '../../../../../../_shared/DevPlaceholder/DevPlaceholder';

/** 역할 · 기간 (회사) 또는 기간 · 교육 과정 (사이드). 빈 값은 개발 모드에서만 자리표시 */
export function ItemMeta({ item }: { item: TimelineItem }) {
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
