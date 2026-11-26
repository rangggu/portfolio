import styles from './HeroVisual.module.css';

/** 선택 핸들 네 모서리 */
const HANDLES = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;

/**
 * 첫 화면 오른쪽 그림: 「마지막 1px까지 봅니다」를 그대로.
 * 가장자리로 갈수록 흐려지는 픽셀 격자 한가운데, 포인트색 한 칸(1px)이 캔버스 프레임과 같은
 * 선택 표시(테두리 + 네 모서리 핸들)로 골라져 있고 아래에 크기 배지 「1 × 1」. 장식이라 보조기기에서는 숨긴다.
 */
export function HeroVisual() {
  return (
    <div className={styles.root} aria-hidden="true">
      <span className={styles.pixel} />
      <span className={styles.selection} />
      {HANDLES.map((corner) => (
        <span key={corner} className={styles.handle} data-corner={corner} />
      ))}
      <span className={styles.badge}>1 × 1</span>
    </div>
  );
}
