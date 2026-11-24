'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { toast } from '@/components/ui/Toast';

export function ToastDemo() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const showMany = () => {
    toast('첫 번째 알림');
    toast('이메일을 복사했어요', { tone: 'success' });
    toast('복사하지 못했어요. 다시 시도해 주세요', { tone: 'danger' });
  };

  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-12)' }}
    >
      <Button
        variant="secondary"
        type="button"
        onClick={() => {
          setCount(count + 1);
          toast(`알림 ${count + 1}`);
        }}
      >
        알림 하나
      </Button>
      <Button variant="secondary" type="button" onClick={showMany}>
        연달아 3개 (neutral · success · danger)
      </Button>
      <Button variant="secondary" type="button" onClick={() => setOpen(true)}>
        대화상자 위에 알림
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="대화상자 위 알림"
        size="sm"
      >
        <Button
          type="button"
          onClick={() => toast('대화상자 위에도 보여요', { tone: 'success' })}
        >
          알림 띄우기
        </Button>
      </Dialog>
    </div>
  );
}
