import { Text } from '@/components/ui/Text/Text';
import { filled, type TimelineItem } from '@/lib/resume';
import {
  DevPlaceholder,
  shouldRenderSlot,
} from '../../../../../../../../_shared/DevPlaceholder/DevPlaceholder';
import { PLACEHOLDER_SOURCE } from '../../../../../../_lib/career';

/** 사이드 항목의 한 줄 설명. 비어 있으면 개발 모드에서만 자리표시 */
export function ItemSummary({ item }: { item: TimelineItem }) {
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
