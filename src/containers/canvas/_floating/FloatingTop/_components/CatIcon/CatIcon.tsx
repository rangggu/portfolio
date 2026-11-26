import styles from './CatIcon.module.css';

/** Myu 고양이 아이콘 (시안 CanvasHero). 색은 토큰이라 다크 모드에서 반전된다. 장식이라 숨긴다 */
export function CatIcon() {
  return (
    <svg className={styles.root} viewBox="0 0 32 32" aria-hidden="true">
      <rect className={styles.tile} width="32" height="32" rx="7.5" />
      <path
        className={styles.face}
        d="M6.2 13.2 L6.9 5.7 Q7.1 4.7 8 5.2 L13.1 9.4 Q16 8.5 18.9 9.4 L24 5.2 Q24.9 4.7 25.1 5.7 L25.8 13.2 Q27.4 16.2 27 19.4 Q26 26.4 16 26.8 Q6 26.4 5 19.4 Q4.6 16.2 6.2 13.2 Z"
      />
      <path className={styles.eye} d="M9.7 17.6 Q11.9 19.9 14.1 17.6" />
      <path className={styles.eye} d="M17.9 17.6 Q20.1 19.9 22.3 17.6" />
      <path className={styles.nose} d="M14.9 21.2 H17.1 L16 22.5 Z" />
    </svg>
  );
}
