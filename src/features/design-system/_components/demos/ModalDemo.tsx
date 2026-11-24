'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { BottomSheet, Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import ex from '../../_shared/Example/Example.module.css';

type Opened = 'sm' | 'md' | 'lg' | 'long' | 'sheet' | 'sheet-long' | null;

const LONG_TEXT = Array.from(
  { length: 30 },
  (_, index) =>
    `${index + 1}. 내용이 길면 본문 영역만 스크롤되고 제목과 버튼은 그대로 있어요.`,
);

export function ModalDemo() {
  const [opened, setOpened] = useState<Opened>(null);
  const close = () => setOpened(null);
  const footer = (
    <>
      <Button variant="ghost" size="sm" type="button" onClick={close}>
        취소
      </Button>
      <Button size="sm" type="button" onClick={close}>
        확인
      </Button>
    </>
  );

  return (
    <div className={ex.row}>
      <Button variant="secondary" type="button" onClick={() => setOpened('sm')}>
        Dialog sm
      </Button>
      <Button variant="secondary" type="button" onClick={() => setOpened('md')}>
        Dialog md (입력 포함)
      </Button>
      <Button variant="secondary" type="button" onClick={() => setOpened('lg')}>
        Dialog lg
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setOpened('long')}
      >
        Dialog 긴 내용
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setOpened('sheet')}
      >
        BottomSheet
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => setOpened('sheet-long')}
      >
        BottomSheet 긴 내용
      </Button>

      <Dialog
        open={opened === 'sm'}
        onClose={close}
        size="sm"
        title="삭제할까요?"
        description="되돌릴 수 없어요."
        footer={footer}
      />
      <Dialog
        open={opened === 'md'}
        onClose={close}
        title="물어보기"
        description="Tab이 대화상자 안에서만 돌고, Esc로 닫혀요."
        footer={footer}
      >
        <Input label="질문" placeholder="궁금한 점을 적어 주세요" />
      </Dialog>
      <Dialog
        open={opened === 'lg'}
        onClose={close}
        size="lg"
        title="넓은 대화상자"
      >
        <p>케이스 스터디처럼 넓은 내용을 담는 크기예요.</p>
      </Dialog>
      <Dialog
        open={opened === 'long'}
        onClose={close}
        title="긴 내용"
        footer={footer}
      >
        {LONG_TEXT.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </Dialog>
      <BottomSheet
        open={opened === 'sheet'}
        onClose={close}
        title="공유하기"
        description="폰에서 쓰는 모달이에요."
        footer={footer}
      >
        <p>바깥을 누르거나 닫기 버튼으로 닫혀요.</p>
      </BottomSheet>
      <BottomSheet
        open={opened === 'sheet-long'}
        onClose={close}
        title="긴 시트"
      >
        {LONG_TEXT.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </BottomSheet>
    </div>
  );
}
