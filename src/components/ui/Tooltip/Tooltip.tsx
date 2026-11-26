'use client';

import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { DURATION } from '@/lib/motion/tokens';
import { placeTooltip, type TooltipPlacement } from '@/lib/ui/placeTooltip';
import styles from './Tooltip.module.css';

/** 마우스를 올린 뒤 보이기까지 (지나가는 마우스에 깜빡이지 않게) */
const SHOW_DELAY = DURATION.normal;
/** 마우스가 기준 요소에서 툴팁으로 옮겨 갈 틈 (WCAG 1.4.13: 툴팁 위로 마우스를 옮길 수 있어야 한다) */
const HIDE_DELAY = DURATION.instant;
/** 터치에서 길게 누르기로 보는 시간 (짧게 누르면 원래 동작) */
const LONG_PRESS = 500;
/** 길게 누르는 동안 손가락이 이만큼 움직이면 스크롤로 본다 */
const LONG_PRESS_MOVE = 10;
/** 기준 요소와의 간격, 화면 가장자리 여백 (px, --spacing-8과 같다) */
const OFFSET = 8;
const PADDING = 8;

interface TooltipProps {
  /** 짧은 보조 설명. 꼭 필요한 정보는 툴팁에만 두지 않는다 */
  content: React.ReactNode;
  placement?: TooltipPlacement;
  /** 포커스할 수 있는 요소 하나 (button, a 등). aria-describedby가 붙는다 */
  children: ReactElement<{ 'aria-describedby'?: string }>;
}

/**
 * 툴팁. 마우스 hover·키보드 포커스(:focus-visible)·터치 길게 누르기로 보이고, Esc·떠나기·다음 터치·스크롤로 닫힌다.
 * Popover API로 맨 위 레이어(<dialog> 위 포함)에 띄우고, 위치는 placeTooltip으로 화면 안에 맞춘다.
 * 이벤트는 자식을 감싼 기준 상자에서 받는다 (focusin·focusout·pointer 이벤트가 자식에서 올라온다).
 */
export function Tooltip({
  content,
  placement = 'top',
  children,
}: TooltipProps) {
  const tooltipId = useId();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const describedBy = [children.props['aria-describedby'], tooltipId]
    .filter(Boolean)
    .join(' ');

  // 여는 경로: 마우스 hover, 키보드 포커스, 터치 길게 누르기
  useEffect(() => {
    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;
    if (!anchor || !tooltip) return;

    let timer = 0;
    let press: { x: number; y: number } | undefined;
    let suppressClick = false;

    const later = (action: () => void, delay: number) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(action, delay);
    };
    const show = () => {
      window.clearTimeout(timer);
      setOpen(true);
    };
    const hide = () => {
      window.clearTimeout(timer);
      setOpen(false);
    };
    const isOpen = () => tooltip.matches(':popover-open');

    const handleEnter = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') later(show, SHOW_DELAY);
    };
    const handleLeave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') later(hide, HIDE_DELAY);
    };
    const handleFocusIn = (event: FocusEvent) => {
      if ((event.target as HTMLElement).matches(':focus-visible')) show();
    };
    const handleDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;
      press = { x: event.clientX, y: event.clientY };
      later(() => {
        suppressClick = true;
        show();
      }, LONG_PRESS);
    };
    const handleMove = (event: PointerEvent) => {
      if (!press) return;
      if (
        Math.hypot(event.clientX - press.x, event.clientY - press.y) >
        LONG_PRESS_MOVE
      ) {
        press = undefined;
        if (!isOpen()) window.clearTimeout(timer);
      }
    };
    const handleUp = () => {
      press = undefined;
      if (!isOpen()) window.clearTimeout(timer);
    };
    // 길게 눌러 열었으면 손을 뗄 때 따라오는 click(원래 동작)과 시스템 메뉴를 막는다
    const handleClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };
    const handleContextMenu = (event: MouseEvent) => {
      if (press || suppressClick) event.preventDefault();
    };
    // 툴팁 위로 마우스를 옮기면 닫지 않는다
    const handleTooltipEnter = () => window.clearTimeout(timer);

    anchor.addEventListener('pointerenter', handleEnter);
    anchor.addEventListener('pointerleave', handleLeave);
    anchor.addEventListener('focusin', handleFocusIn);
    anchor.addEventListener('focusout', hide);
    anchor.addEventListener('pointerdown', handleDown);
    anchor.addEventListener('pointermove', handleMove);
    anchor.addEventListener('pointerup', handleUp);
    anchor.addEventListener('pointercancel', handleUp);
    anchor.addEventListener('click', handleClick, { capture: true });
    anchor.addEventListener('contextmenu', handleContextMenu);
    tooltip.addEventListener('pointerenter', handleTooltipEnter);
    tooltip.addEventListener('pointerleave', handleLeave);

    return () => {
      window.clearTimeout(timer);
      anchor.removeEventListener('pointerenter', handleEnter);
      anchor.removeEventListener('pointerleave', handleLeave);
      anchor.removeEventListener('focusin', handleFocusIn);
      anchor.removeEventListener('focusout', hide);
      anchor.removeEventListener('pointerdown', handleDown);
      anchor.removeEventListener('pointermove', handleMove);
      anchor.removeEventListener('pointerup', handleUp);
      anchor.removeEventListener('pointercancel', handleUp);
      anchor.removeEventListener('click', handleClick, { capture: true });
      anchor.removeEventListener('contextmenu', handleContextMenu);
      tooltip.removeEventListener('pointerenter', handleTooltipEnter);
      tooltip.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  // 열리면 맨 위 레이어에 띄우고 크기를 잰 뒤 자리를 잡는다. 열린 동안 Esc·스크롤·바깥 터치로 닫는다
  useEffect(() => {
    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;
    if (!anchor || !tooltip) return;
    if (!open) {
      if (tooltip.matches(':popover-open')) tooltip.hidePopover();
      return;
    }

    tooltip.showPopover();
    const position = placeTooltip(
      anchor.getBoundingClientRect(),
      { width: tooltip.offsetWidth, height: tooltip.offsetHeight },
      // 스크롤바를 뺀 보이는 영역 (innerWidth는 스크롤바를 포함해 오른쪽 끝에서 툴팁이 가려진다)
      {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
      { placement, offset: OFFSET, padding: PADDING },
    );
    tooltip.style.setProperty('--tooltip-top', `${position.top}px`);
    tooltip.style.setProperty('--tooltip-left', `${position.left}px`);
    tooltip.dataset.placement = position.placement;

    const close = () => setOpen(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const handleOutside = (event: PointerEvent) => {
      if (!anchor.contains(event.target as Node)) close();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleOutside);
    window.addEventListener('scroll', close, { capture: true, passive: true });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleOutside);
      window.removeEventListener('scroll', close, { capture: true });
    };
  }, [open, placement]);

  return (
    <>
      <span ref={anchorRef} className={styles.anchor}>
        {cloneElement(children, { 'aria-describedby': describedBy })}
      </span>
      <div
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        popover="manual"
        className={styles.root}
      >
        {content}
      </div>
    </>
  );
}
