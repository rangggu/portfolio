import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import styles from './AskButton.module.css';

/**
 * 물어보기 자리 (Phase 4에서 커맨드 팔레트·AI로 연결).
 * 지금은 aria-disabled로 포커스는 받되 동작하지 않고, 「준비 중」을 화면과 보조기기에 함께 알린다.
 * 터치 기기에서는 시안대로 아이콘 버튼으로 보이고, 글자는 보조기기에만 남긴다.
 */
export function AskButton() {
  return (
    <Button variant="ghost" type="button" aria-disabled="true">
      <Icon className={styles.icon}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        >
          <path d="M4 5.5h16v10H9.5L5.5 19v-3.5H4z" />
        </svg>
      </Icon>
      <span className={styles.label}>
        물어보기{' '}
        <Text as="span" variant="caption" tone="secondary">
          준비 중
        </Text>
      </span>
    </Button>
  );
}
