'use client';

import type { FocusEvent, PointerEvent } from 'react';

interface TimelineRowsProps {
  className?: string;
  children: React.ReactNode;
}

/** 이벤트 대상이 속한 회사 칸의 회사 id들 (겹친 회사가 있으면 여럿) */
function companiesOf(target: EventTarget | null) {
  if (!(target instanceof Element)) return [];
  const cell = target.closest<HTMLElement>('[data-company]');
  return cell?.dataset.company?.split(' ') ?? [];
}

function setHighlight(root: HTMLElement, ids: string[]) {
  root.querySelectorAll<HTMLElement>('[data-company]').forEach((cell) => {
    const cellIds = cell.dataset.company?.split(' ') ?? [];
    if (cellIds.some((id) => ids.includes(id))) cell.dataset.highlight = '';
    else delete cell.dataset.highlight;
  });
}

/**
 * 경력 연도 행 목록. 회사 막대는 여러 해(행)에 걸쳐 이어지므로, 한 칸에 마우스를 올리거나
 * 칸 안 링크에 포커스가 가면 같은 회사의 모든 칸에 data-highlight를 붙여 막대 전체를 강조한다.
 * 마우스 강조는 hover가 되는 포인터(마우스·펜)만 (터치는 hover가 없다).
 */
export function TimelineRows({ className, children }: TimelineRowsProps) {
  const handlePointerOver = (event: PointerEvent<HTMLOListElement>) => {
    if (event.pointerType === 'touch') return;
    setHighlight(event.currentTarget, companiesOf(event.target));
  };

  const handlePointerLeave = (event: PointerEvent<HTMLOListElement>) => {
    const focused = companiesOf(document.activeElement);
    setHighlight(event.currentTarget, focused);
  };

  const handleFocus = (event: FocusEvent<HTMLOListElement>) => {
    setHighlight(event.currentTarget, companiesOf(event.target));
  };

  const handleBlur = (event: FocusEvent<HTMLOListElement>) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setHighlight(event.currentTarget, []);
  };

  return (
    // 강조 표시만 바꾸는 이벤트 위임이라 동작·역할이 없다 (안쪽 링크가 실제 상호작용)
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ol
      className={className}
      onPointerOver={handlePointerOver}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </ol>
  );
}
