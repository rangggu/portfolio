import { Text } from '@/components/ui/Text/Text';
import { ThemeButton } from '@/components/theme/ThemeButton';
import { RESUME } from '@/lib/resume';
import { CanvasModeButton } from './_components/CanvasModeButton/CanvasModeButton';
import { CatIcon } from './_components/CatIcon/CatIcon';
import { MoreMenu } from './_components/MoreMenu/MoreMenu';
import styles from './FloatingTop.module.css';

/**
 * 위쪽 플로팅 UI (mockup-spec.md 플로팅 UI).
 * 왼쪽 위: 「고양이 + Myu의 포트폴리오」 (누구의 사이트인지만, 현재 프레임은 하단 메뉴 바가 보여 준다).
 * 오른쪽 위: 테마 · 읽기/자유 모드(마우스 기기 캔버스에서만) · 더보기(이메일 복사 · GitHub 주소 복사 · 이력서 인쇄).
 */
export function FloatingTop() {
  return (
    <header className={styles.root}>
      <div className={styles.location}>
        <CatIcon />
        <Text as="span" variant="labelMd" className={styles.brand}>
          {RESUME.profile.nickname}의 포트폴리오
        </Text>
      </div>
      <div className={styles.actions}>
        <ThemeButton />
        <span className={styles.modeButton}>
          <CanvasModeButton />
        </span>
        <MoreMenu />
      </div>
    </header>
  );
}
