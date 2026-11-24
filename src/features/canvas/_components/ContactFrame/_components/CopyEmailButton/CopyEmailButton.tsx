'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import styles from './CopyEmailButton.module.css';

interface CopyEmailButtonProps {
  email: string;
}

type CopyResult = 'idle' | 'copied' | 'failed';

/** 결과 안내를 지우기까지의 시간 */
const RESULT_VISIBLE_MS = 4000;

/**
 * 이메일 주소를 클립보드에 복사하고 결과를 버튼 옆에 알린다 (role="status"로 보조기기에도 전달).
 * 클립보드를 쓸 수 없으면 주소를 그대로 보여준다.
 */
export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [result, setResult] = useState<CopyResult>('idle');

  useEffect(() => {
    if (result === 'idle') return;
    const timer = window.setTimeout(() => setResult('idle'), RESULT_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [result]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setResult('copied');
    } catch {
      setResult('failed');
    }
  };

  return (
    <span className={styles.root}>
      <Button variant="primary" type="button" onClick={handleClick}>
        이메일 복사
      </Button>
      <Text
        as="span"
        variant="caption"
        tone="secondary"
        role="status"
        className={styles.status}
      >
        {result === 'copied' && '복사했어요'}
        {result === 'failed' && `복사하지 못했어요. ${email}`}
      </Text>
    </span>
  );
}
