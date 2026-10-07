'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './MarginNote.module.css';

interface MarginNoteContextValue {
  /** 넓은 프레임(메모가 본문 오른쪽에 항상 보임)인지. CSS 컨테이너 쿼리 결과를 읽는다 */
  wide: boolean;
  getNoteId: (id: string) => string;
  isOpen: (id: string) => boolean;
  toggle: (id: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

const MarginNoteContext = createContext<MarginNoteContextValue | null>(null);

export function useMarginNote(): MarginNoteContextValue {
  const context = useContext(MarginNoteContext);
  if (!context) {
    throw new Error(
      'MarginNoteAnchor와 MarginNote는 MarginNoteGroup 안에서 써야 합니다',
    );
  }
  return context;
}

interface MarginNoteProviderProps {
  text: React.ReactNode;
  notes: React.ReactNode;
}

/**
 * 레이아웃(넓음/좁음)은 CSS 컨테이너 쿼리가 정하고, JS는 그 결과(--margin-note-mode)만 읽어
 * aria-expanded를 맞춘다. 기준 값을 JS에 중복해서 두지 않는다.
 */
export function MarginNoteProvider({ text, notes }: MarginNoteProviderProps) {
  const groupId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(false);
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const readMode = () =>
      setWide(
        getComputedStyle(root).getPropertyValue('--margin-note-mode').trim() ===
          'wide',
      );
    readMode();
    const observer = new ResizeObserver(readMode);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback((id: string) => {
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo<MarginNoteContextValue>(
    () => ({
      wide,
      getNoteId: (id) => `${groupId}-${id}`,
      isOpen: (id) => openIds.has(id),
      toggle,
      activeId,
      setActiveId,
    }),
    [wide, groupId, openIds, toggle, activeId],
  );

  return (
    <MarginNoteContext value={value}>
      <div ref={rootRef} className={styles.group} data-margin-note-group="">
        <div className={styles.text}>{text}</div>
        <div className={styles.notes}>{notes}</div>
      </div>
    </MarginNoteContext>
  );
}
