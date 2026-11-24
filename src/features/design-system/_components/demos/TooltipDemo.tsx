'use client';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import ex from '../../_shared/Example/Example.module.css';

export function TooltipDemo() {
  return (
    <div className={ex.stack}>
      <div className={ex.row}>
        <Tooltip content="준비 중이에요">
          <Button variant="ghost" type="button" aria-disabled="true">
            비활성 (위)
          </Button>
        </Tooltip>
        <Tooltip content="아래쪽에 보이는 툴팁이에요" placement="bottom">
          <Button variant="secondary" type="button">
            아래
          </Button>
        </Tooltip>
        <Tooltip content="아이콘 버튼의 이름은 aria-label, 툴팁은 보조 설명이에요">
          <IconButton aria-label="정보" variant="surface" type="button">
            <Icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v6M12 7.5v.5" strokeLinecap="round" />
              </svg>
            </Icon>
          </IconButton>
        </Tooltip>
      </div>
      <div className={ex.end}>
        <Tooltip content="화면 오른쪽 끝에서도 잘리지 않고 안쪽으로 밀려 들어와요">
          <Button variant="secondary" type="button">
            오른쪽 끝
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
