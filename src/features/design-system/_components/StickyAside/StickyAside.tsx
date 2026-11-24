'use client';

import { useEffect, useRef } from 'react';

interface StickyAsideProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * 왼쪽 목차 자리. 목차 높이를 --aside-height로 알려 CSS가 sticky 위치를 정하게 한다.
 * 화면보다 짧으면 위에 고정되고, 길면 페이지와 함께 올라가다 목차 끝이 보이는 지점에서 고정된다 (안쪽 스크롤 없음).
 * 묶음을 접고 펼 때마다 높이가 바뀌므로 ResizeObserver로 다시 잰다.
 */
export function StickyAside({ className, children }: StickyAsideProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      element.style.setProperty('--aside-height', `${element.offsetHeight}px`);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <aside ref={ref} className={className}>
      {children}
    </aside>
  );
}
