import { Text } from '@/components/ui/Text';
import styles from './DevPlaceholder.module.css';

interface DevPlaceholderProps {
  /** inline: 한 줄 회색 글자. block: 점선 상자 */
  variant?: 'inline' | 'block';
  children: React.ReactNode;
}

/**
 * 아직 채우지 않은 값(content/resume의 TODO) 자리. 개발 모드에서만 그리고,
 * 프로덕션 빌드에서는 아무것도 그리지 않는다 (HTML에도 남지 않는다).
 */
export function DevPlaceholder({
  variant = 'inline',
  children,
}: DevPlaceholderProps) {
  if (process.env.NODE_ENV !== 'development') return null;

  if (variant === 'block') {
    return (
      <div className={styles.block}>
        <Text variant="caption" tone="tertiary">
          {children}
        </Text>
      </div>
    );
  }

  return (
    <Text as="span" variant="caption" tone="tertiary">
      {children}
    </Text>
  );
}

/** 값이 없을 때 행·문단을 통째로 그릴지 (값이 있거나 개발 모드면 그린다) */
export function shouldRenderSlot(hasValue: boolean): boolean {
  return hasValue || process.env.NODE_ENV === 'development';
}
