'use client';

import { useEffect, useLayoutEffect, useRef, type MouseEvent } from 'react';
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
 * 현재 항목 표시는 캡슐 하나가 항목 사이를 미끄러져 옮겨 간다. 측정 전(하이드레이션 전)에는 현재 항목에 직접 칠한다.
 */
export function FrameMenu() {
  const currentFrame = useCurrentFrame();
  const navRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // 현재 항목 위치·폭을 캡슐 표시에 넘긴다. 글꼴이 늦게 와서 폭이 바뀌어도 따라간다
  useLayoutEffect(() => {
    const nav = navRef.current;
    const track = trackRef.current;
    if (!nav || !track) return;

    const place = () => {
      const current = track.querySelector<HTMLElement>('[aria-current]');
      if (!current) {
        delete nav.dataset.indicator;
        return;
      }
      track.style.setProperty('--indicator-x', `${current.offsetLeft}px`);
      track.style.setProperty('--indicator-w', `${current.offsetWidth}px`);
    };

    place();
    // 첫 자리를 잡은 다음 프레임부터 옮겨 가는 연출을 켠다 (처음에 왼쪽 끝에서 날아오지 않게)
    const frame = requestAnimationFrame(() => {
      if (track.querySelector('[aria-current]')) nav.dataset.indicator = '';
    });
    const observer = new ResizeObserver(place);
    observer.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [currentFrame]);

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
      <div ref={trackRef} className={styles.track}>
        <span className={styles.indicator} aria-hidden="true" />
        <ul className={styles.list}>
          {FRAMES.map((frame) => (
            <li key={frame.id}>
              <Link
                href={frame.path}
                variant="plain"
                className={styles.item}
                data-frame-id={frame.id}
                aria-current={frame.id === currentFrame ? 'page' : undefined}
                onClick={(event) => handleClick(event, frame.id)}
              >
                {frame.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
