'use client';

import { useMarginNote } from './MarginNoteContext';

import styles from './MarginNote.module.css';

interface MarginNoteProps {
  /** MarginNoteAnchor의 note와 같은 값 */
  id: string;
  children: React.ReactNode;
}

/** 여백 메모 내용. 넓은 프레임에서는 본문 오른쪽, 좁은 프레임에서는 펼쳤을 때만 문단 아래에 보인다 */
export function MarginNote({ id, children }: MarginNoteProps) {
  const { getNoteId, isOpen, activeId, setActiveId } = useMarginNote();

  return (
    // hover·focus는 연결 텍스트를 함께 강조하는 시각 효과일 뿐 조작이 아니다
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      id={getNoteId(id)}
      role="note"
      className={styles.note}
      data-open={isOpen(id)}
      data-active={activeId === id || undefined}
      onMouseEnter={() => setActiveId(id)}
      onMouseLeave={() => setActiveId(null)}
      onFocus={() => setActiveId(id)}
      onBlur={() => setActiveId(null)}
    >
      {children}
    </div>
  );
}
