'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
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
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
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

  // 연결선: 연결 텍스트의 마지막 줄 높이에서 본문 열 오른쪽 끝 → 간격 가운데에서 꺾어 → 메모 아이콘 높이로.
  // 선이 본문 글자를 가로지르지 않도록 본문 열과 메모 열 사이 간격 안에서만 그린다. 보이고 숨기는 건 CSS가 맡는다
  useLayoutEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    const line = lineRef.current;
    const dot = dotRef.current;
    if (!wide || !activeId || !root || !text || !line || !dot) return;
    const noteId = `${groupId}-${activeId}`;
    const note = document.getElementById(noteId);
    const anchor = root.querySelector(`[aria-controls="${noteId}"]`);
    if (!note || !anchor) return;

    const rootBox = root.getBoundingClientRect();
    const anchorLines = anchor.getClientRects();
    const anchorLine = anchorLines[anchorLines.length - 1];
    const noteBox = note.getBoundingClientRect();
    const label = note.firstElementChild?.getBoundingClientRect() ?? noteBox;
    if (!anchorLine) return;

    const startX = text.getBoundingClientRect().right - rootBox.left;
    const startY = anchorLine.top + anchorLine.height / 2 - rootBox.top;
    const endX = noteBox.left - rootBox.left;
    const endY = label.top + label.height / 2 - rootBox.top;
    const bendX = (startX + endX) / 2;
    line.setAttribute(
      'd',
      `M ${startX} ${startY} H ${bendX} V ${endY} H ${endX}`,
    );
    dot.setAttribute('cx', String(startX));
    dot.setAttribute('cy', String(startY));
  }, [wide, activeId, groupId]);

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
        <div ref={textRef} className={styles.text}>
          {text}
        </div>
        <div className={styles.notes}>{notes}</div>
        <svg className={styles.connector} aria-hidden="true">
          <path ref={lineRef} className={styles.connectorLine} />
          <circle ref={dotRef} className={styles.connectorDot} />
        </svg>
      </div>
    </MarginNoteContext>
  );
}
