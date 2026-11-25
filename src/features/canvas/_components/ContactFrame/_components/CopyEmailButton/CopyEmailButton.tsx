'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import styles from './CopyEmailButton.module.css';

interface CopyEmailButtonProps {
  email: string;
}

type CopyResult = 'idle' | 'copied' | 'failed';

/** 결과 안내를 지우기까지의 시간 */
const RESULT_VISIBLE_MS = 4000;

/** 버튼 두 모습: 평소 「이메일 복사」, 복사 직후 「복사했어요」 */
const FACES = [
  {
    key: 'idle',
    label: '이메일 복사',
    icon: <path d="M9 9h10v10H9zM5 15V5h10" strokeLinejoin="round" />,
  },
  {
    key: 'copied',
    label: '복사했어요',
    icon: (
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
] as const;

/**
 * 이메일 주소를 클립보드에 복사한다. 복사하면 버튼이 체크 아이콘 + 「복사했어요」로 잠깐 바뀌고,
 * 보조기기에는 role="status"로 알린다. 클립보드를 쓸 수 없으면 주소를 그대로 보여준다.
 * 두 모습을 같은 칸에 겹쳐 두어 버튼 폭이 바뀌지 않는다.
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

  const face = result === 'copied' ? 'copied' : 'idle';

  return (
    <span className={styles.root} data-result={result}>
      <Button variant="primary" type="button" onClick={handleClick}>
        <span className={styles.faces}>
          {FACES.map(({ key, label, icon }) => (
            <span
              key={key}
              className={styles.face}
              data-active={key === face || undefined}
              aria-hidden={key !== face || undefined}
            >
              <Icon size="sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {icon}
                </svg>
              </Icon>
              {label}
            </span>
          ))}
        </span>
      </Button>
      <Text
        as="span"
        variant="caption"
        tone="secondary"
        role="status"
        className={styles.status}
      >
        {result === 'copied' && '이메일 주소를 복사했어요'}
        {result === 'failed' && `복사하지 못했어요. ${email}`}
      </Text>
    </span>
  );
}
