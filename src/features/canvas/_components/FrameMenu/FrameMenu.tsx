'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { Link } from '@/components/ui/Link';
import { FRAMES, getFrameHeadingId, type FrameId } from '../../_lib/frames';
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

/** 프레임으로 스크롤하고, 키보드 사용자를 위해 제목으로 포커스를 옮긴다 */
function moveToFrame(frameId: FrameId) {
  const frame = document.getElementById(frameId);
  if (!frame) return;
  frame.scrollIntoView({ block: 'start' });

  const heading = document.getElementById(getFrameHeadingId(frameId));
  if (!heading) return;
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
}

/**
 * 하단 메뉴 바. 각 항목은 프레임 주소로 가는 링크이고, 지금은 누르면 해당 프레임으로 스크롤만 한다.
 * 주소 갱신과 뒤로 가기는 카메라 이동(PORTFOLIO-10)에서 함께 다룬다.
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
    moveToFrame(frameId);
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
