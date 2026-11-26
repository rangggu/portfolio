'use client';

import { useEffect, useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { copyText } from '../../../../_shared/contactActions';
import styles from './CopyValueButton.module.css';

interface CopyValueButtonProps {
  /** 보이는 글자 */
  children: React.ReactNode;
  /** 복사할 값 */
  value: string;
  /** 토스트·보조기기에 쓸 이름. 예: 「이메일 주소」 */
  name: string;
}

/** 복사 직후 체크 아이콘을 보이는 시간 (동작 값) */
const COPIED_VISIBLE_MS = 2000;

/**
 * 누르면 값을 복사하는 글자 버튼 (메일 앱·새 탭을 열지 않는다). 끝의 작은 복사 아이콘이 복사된다는 표시이고,
 * 복사하면 잠깐 체크로 바뀐다. 결과는 토스트로 알린다.
 */
export function CopyValueButton({
  children,
  value,
  name,
}: CopyValueButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), COPIED_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleClick = async () => {
    if (await copyText(value, name)) setCopied(true);
  };

  return (
    <button type="button" className={styles.root} onClick={handleClick}>
      {children}
      <VisuallyHidden> ({name} 복사)</VisuallyHidden>
      <Icon size="sm" className={styles.icon}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {copied ? (
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          ) : (
            <path d="M9 9h10v10H9zM5 15V5h10" />
          )}
        </svg>
      </Icon>
    </button>
  );
}
