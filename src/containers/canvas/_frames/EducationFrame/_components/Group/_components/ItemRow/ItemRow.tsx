import { Fragment } from 'react';

import { Text } from '@/components/ui/Text/Text';
import {
  DevPlaceholder,
  shouldRenderSlot,
} from '../../../../../../_shared/DevPlaceholder/DevPlaceholder';
import type { EducationRow } from '../../Group';
import styles from './ItemRow.module.css';

/** 학력·자격 한 행: 왼쪽 날짜 열 | 이름·세부. 이름이 TODO면 그리지 않는다 (개발 모드는 자리표시) */
export function ItemRow({ row }: { row: EducationRow }) {
  if (!shouldRenderSlot(row.name !== undefined)) return null;
  const details = row.details.filter((detail) => detail !== undefined);
  const hasMissingDetail = details.length < row.details.length;

  return (
    <li className={styles.row}>
      {row.date ? (
        <Text
          as="span"
          variant="monoSm"
          tone="tertiary"
          className={styles.date}
        >
          {row.date}
        </Text>
      ) : (
        <DevPlaceholder>날짜</DevPlaceholder>
      )}
      <div className={styles.main}>
        <Text variant="bodyLg">
          {row.name ?? <DevPlaceholder>이름</DevPlaceholder>}
        </Text>
        {shouldRenderSlot(!hasMissingDetail && details.length > 0) && (
          <Text variant="bodySm" tone="secondary">
            {details.map((detail, index) => (
              <Fragment key={index}>
                {index > 0 && ' · '}
                {detail}
              </Fragment>
            ))}
            {hasMissingDetail && (
              <>
                {details.length > 0 && ' · '}
                <DevPlaceholder>빈 값 있음</DevPlaceholder>
              </>
            )}
          </Text>
        )}
      </div>
    </li>
  );
}
