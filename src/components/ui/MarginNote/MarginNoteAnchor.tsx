'use client';

import { useMarginNote } from './MarginNoteContext';

import styles from './MarginNote.module.css';

interface MarginNoteAnchorProps {
  /** 연결할 MarginNote의 id (그룹 안에서만 유일하면 된다) */
  note: string;
  children: React.ReactNode;
}

/** 본문 속 연결 텍스트. 좁은 프레임에서는 눌러서 메모를 문단 아래에 펼친다 */
export function MarginNoteAnchor({ note, children }: MarginNoteAnchorProps) {
  const { wide, getNoteId, isOpen, toggle, activeId, setActiveId } =
    useMarginNote();
  const expanded = wide || isOpen(note);

  return (
    <button
      type="button"
      className={styles.anchor}
      aria-expanded={expanded}
      aria-controls={getNoteId(note)}
      data-active={activeId === note || undefined}
      onClick={() => {
        if (!wide) toggle(note);
      }}
      onMouseEnter={() => setActiveId(note)}
      onMouseLeave={() => setActiveId(null)}
      onFocus={() => setActiveId(note)}
      onBlur={() => setActiveId(null)}
    >
      {children}
    </button>
  );
}
