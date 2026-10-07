'use client';

import { useSyncExternalStore } from 'react';
import { getFloatingGuide, subscribeFloatingGuide } from './floatingGuideState';
import styles from './FloatingGuide.module.css';

const MENU_ITEMS = [
  '첫 화면',
  '소개',
  '경력',
  '프로젝트',
  '기술',
  '학력·자격',
  '연락처',
];

/**
 * 개발 모드 전용: Phase 3 플로팅 UI가 차지할 자리를 점선 상자로 표시한다.
 * 위치·높이는 --layout-floating-* 토큰 계산식과 같다.
 * 마우스 기기: 왼쪽 위 / 오른쪽 위 / 하단 가운데, 터치 기기: 위쪽 한 줄 바 + 하단 메뉴 바.
 */
export function FloatingGuide() {
  const on = useSyncExternalStore(
    subscribeFloatingGuide,
    getFloatingGuide,
    () => false,
  );

  if (!on) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.top}>
        <div className={styles.box} data-slot="location">
          Myu · 포트폴리오 / 현재 프레임
        </div>
        <div className={styles.box} data-slot="actions">
          물어보기 ⌘K · 테마
        </div>
      </div>
      <div className={styles.box} data-slot="menu">
        {MENU_ITEMS.map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
