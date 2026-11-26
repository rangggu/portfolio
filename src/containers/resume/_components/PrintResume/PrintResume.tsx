import { ResumeDocument } from '../../ResumeDocument';
import styles from './PrintResume.module.css';

/**
 * 인쇄 전용 이력서. 화면에서는 없고, 캔버스 페이지를 인쇄하면 캔버스 대신 이것이 찍힌다
 * (어느 프레임 주소에서 인쇄해도, 「이력서 인쇄」 버튼을 눌러도 같다). 케이스 스터디 모달이 열려 있으면 글이 찍힌다.
 */
export function PrintResume() {
  return (
    <div className={styles.root}>
      <ResumeDocument />
    </div>
  );
}
