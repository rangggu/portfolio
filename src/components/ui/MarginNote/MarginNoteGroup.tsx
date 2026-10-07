import { Children, isValidElement } from 'react';

import { MarginNote } from './MarginNote';
import { MarginNoteProvider } from './MarginNoteContext';

interface MarginNoteGroupProps {
  /** 본문 문단(연결 텍스트 포함)과 그 문단의 MarginNote들 */
  children: React.ReactNode;
}

/**
 * 문단 하나와 그 문단의 여백 메모를 묶는다. MDX 글과 일반 컴포넌트에서 같은 모양으로 쓴다.
 *
 * <MarginNoteGroup>
 *   <p>… <MarginNoteAnchor note="why">연결 텍스트</MarginNoteAnchor> …</p>
 *   <MarginNote id="why">메모 내용</MarginNote>
 * </MarginNoteGroup>
 *
 * 서버에서 자식을 본문과 메모로 나눠, 메모가 항상 문단 뒤(넓으면 오른쪽 열)에 오게 한다.
 */
export function MarginNoteGroup({ children }: MarginNoteGroupProps) {
  const items = Children.toArray(children);
  const isNote = (child: React.ReactNode) =>
    isValidElement(child) && child.type === MarginNote;

  return (
    <MarginNoteProvider
      text={items.filter((child) => !isNote(child))}
      notes={items.filter(isNote)}
    />
  );
}
