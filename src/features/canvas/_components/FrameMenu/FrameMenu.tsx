'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { Link } from '@/components/ui/Link';
import { FRAMES, type FrameId } from '../../_lib/frames';
import { navigateToFrame } from '../../_lib/navigateToFrame';
import { useCurrentFrame } from '../../_state/currentFrame';
import styles from './FrameMenu.module.css';

/** 새 탭 열기 등 브라우저 기본 동작을 원하는 클릭 */
function isModifiedClick(event: MouseEvent) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

/**
 * 하단 메뉴 바. 각 항목은 프레임 주소로 가는 링크이고, 누르면 그 프레임으로 이동하며 기록을 추가한다
 * (카메라 모드는 바로 이동 + 짧은 페이드, 세로 페이지는 스크롤).
 */
export function FrameMenu() {
  const currentFrame = useCurrentFrame();
  const navRef = useRef<HTMLElement>(null);

  // 좁은 화면에서 현재 항목이 바 밖에 있으면 보이도록 바를 가로로 민다 (페이지는 움직이지 않는다)
  useEffect(() => {
    const nav = navRef.current;
    const current = nav?.querySelector<HTMLElement>('[aria-current]');
    if (!nav || !current) return;
    const left = current.offsetLeft;
    const right = left + current.offsetWidth;
    if (left < nav.scrollLeft || right > nav.scrollLeft + nav.clientWidth) {
      nav.scrollLeft = left - (nav.clientWidth - current.offsetWidth) / 2;
    }
  }, [currentFrame]);

  const handleClick = (event: MouseEvent, frameId: FrameId) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    navigateToFrame(frameId);
  };

  return (
    <nav ref={navRef} aria-label="프레임 이동" className={styles.root}>
      <ul className={styles.list}>
        {FRAMES.map((frame) => (
          <li key={frame.id}>
            <Link
              href={frame.path}
              variant="plain"
              className={styles.item}
              aria-current={frame.id === currentFrame ? 'page' : undefined}
              onClick={(event) => handleClick(event, frame.id)}
            >
              {frame.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
