'use client';

import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { Tooltip } from '@/components/ui/Tooltip/Tooltip';
import type { CanvasMode } from '../../../../_lib/canvasMode';
import { setCanvasMode, useCanvasMode } from '../../../../_state/canvasMode';
import { ModeHint } from './_components/ModeHint/ModeHint';
import { CompassIcon } from './_components/CompassIcon/CompassIcon';
import { BookIcon } from './_components/BookIcon/BookIcon';
import styles from './CanvasModeButton.module.css';

const NAME: Record<CanvasMode, string> = {
  read: '읽기 모드',
  free: '자유 모드',
};

/** 툴팁의 모드 설명 (바뀔 모드를 설명한다) */
const DESCRIPTION: Record<CanvasMode, string> = {
  read: '프레임을 차례로 넘겨 봐요',
  free: '끌고 확대하며 둘러봐요',
};

/**
 * 읽기 모드 ↔ 자유 모드 전환 (마우스 기기 캔버스에서만 보인다, FloatingTop.module.css).
 * 아이콘·툴팁·이름은 바뀔 모드를 보여 준다 (ThemeButton과 같은 규칙). 툴팁에는 그 모드 설명을 붙인다.
 * 읽기 모드에서는 아래에 자유 모드 권유 말풍선(ModeHint)을 띄울 수 있다.
 */
export function CanvasModeButton() {
  const mode = useCanvasMode();
  const nextMode: CanvasMode = mode === 'read' ? 'free' : 'read';

  const handleClick = () => {
    setCanvasMode(nextMode);
  };

  return (
    <span className={styles.anchor}>
      <Tooltip
        content={`${NAME[nextMode]}: ${DESCRIPTION[nextMode]}`}
        placement="bottom"
      >
        <IconButton
          aria-label={`${NAME[nextMode]}로 전환`}
          type="button"
          onClick={handleClick}
        >
          <Icon>{nextMode === 'free' ? <CompassIcon /> : <BookIcon />}</Icon>
        </IconButton>
      </Tooltip>
      {mode === 'read' && <ModeHint />}
    </span>
  );
}
