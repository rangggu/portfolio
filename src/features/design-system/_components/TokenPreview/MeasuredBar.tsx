'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TokenPreview.module.css';

/**
 * 크기 토큰 막대. 막대 길이가 토큰 값이고, 옆에 지금 화면에서 계산된 px을 적는다
 * (clamp·vw처럼 화면 폭에 따라 바뀌는 값도 지금 값을 보여 준다). 칸보다 길면 잘렸다고 알린다.
 */
export function MeasuredBar() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const measure = measureRef.current;
    const bar = barRef.current;
    if (!measure || !bar) return;
    const update = () => {
      const actual = Math.round(measure.getBoundingClientRect().width);
      const shown = Math.round(bar.getBoundingClientRect().width);
      setLabel(
        actual > shown + 1 ? `${actual}px (칸보다 넓음)` : `${actual}px`,
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(bar);
    observer.observe(measure);
    return () => observer.disconnect();
  }, []);

  return (
    <span className={styles.barWrap}>
      {/* 실제 길이를 재는 보이지 않는 막대 (최대 폭 제한 없음) */}
      <span ref={measureRef} className={styles.barMeasure} />
      <span ref={barRef} className={styles.bar} />
      <span className={styles.barLabel}>{label}</span>
    </span>
  );
}
