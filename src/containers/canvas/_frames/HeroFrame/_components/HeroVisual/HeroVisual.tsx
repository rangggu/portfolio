import styles from './HeroVisual.module.css';

/** 선택 핸들 네 모서리 */
const HANDLES = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;

/**
 * 첫 화면 오른쪽 그림: 「마지막 1px까지 봅니다」를 장면으로.
 * 선택된 카드(캔버스 선택 표시와 같은 모양) 위에 간격 측정을 얹고, 돋보기로 왼쪽 모서리를 키워
 * 제목 줄과 버튼의 왼쪽 끝이 1px 어긋난 것을 보여 준다. 장식이라 보조기기에서는 숨긴다.
 */
export function HeroVisual() {
  return (
    <div className={styles.root} aria-hidden="true">
      <span className={styles.nameTag}>Card · 400 × 352</span>
      <div className={styles.card}>
        <div className={styles.thumb} />
        <div className={styles.title} />
        <div className={styles.desc} />
        <div className={styles.button} />
        <span className={styles.gapTop} />
        <span className={`${styles.badge} ${styles.badgeTop}`}>24</span>
        <span className={styles.gapRight} />
        <span className={`${styles.badge} ${styles.badgeRight}`}>24</span>
      </div>
      <span className={styles.selection} />
      {HANDLES.map((corner) => (
        <span key={corner} className={styles.handle} data-corner={corner} />
      ))}
      <span className={styles.marker} />
      <div className={styles.loupe}>
        <span className={styles.pixelTitle} />
        <span className={styles.pixelButton} />
        <span className={styles.guide} data-edge="title" />
        <span className={styles.guide} data-edge="button" />
        <span className={styles.gapLine} />
        <span className={`${styles.badge} ${styles.badgeAccent}`}>1px</span>
      </div>
    </div>
  );
}
