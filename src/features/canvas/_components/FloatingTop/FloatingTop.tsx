import { Text } from '@/components/ui/Text';
import { ThemeButton } from '@/features/theme';
import { RESUME } from '@/lib/resume';
import { AskButton } from './_components/AskButton';
import { CatIcon } from './_components/CatIcon';
import { CurrentFrameName } from './_components/CurrentFrameName';
import styles from './FloatingTop.module.css';

/**
 * 위쪽 플로팅 UI. 마우스 기기는 왼쪽 위(위치 표시)·오른쪽 위(물어보기·테마) 상자 따로,
 * 터치 기기는 한 줄 바 하나로 묶는다 (mockup-spec.md 플로팅 UI).
 */
export function FloatingTop() {
  return (
    <div className={styles.root}>
      <header className={styles.location}>
        <CatIcon />
        <Text as="span" variant="labelMd" className={styles.brand}>
          {RESUME.profile.nickname}
        </Text>
        <span className={styles.divider} aria-hidden="true" />
        <Text
          as="span"
          variant="bodySm"
          tone="secondary"
          className={styles.path}
        >
          <span className={styles.site}>포트폴리오 </span>/{' '}
          <span className={styles.current}>
            <CurrentFrameName />
          </span>
        </Text>
      </header>
      <div className={styles.actions}>
        <div className={styles.surface}>
          <AskButton />
        </div>
        <div className={styles.surface}>
          <ThemeButton />
        </div>
      </div>
    </div>
  );
}
