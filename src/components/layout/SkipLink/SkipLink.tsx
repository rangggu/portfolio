import styles from './SkipLink.module.css';

/** 첫 Tab에서 나타나는 본문 바로가기. 대상 main은 id="main", tabIndex={-1}이어야 포커스가 옮겨진다 */
export function SkipLink() {
  return (
    <a href="#main" className={styles.root}>
      본문 바로가기
    </a>
  );
}
