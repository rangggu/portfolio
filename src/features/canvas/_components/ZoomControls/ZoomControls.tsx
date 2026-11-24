'use client';

import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Tooltip } from '@/components/ui/Tooltip';
import {
  getFreeCameraControls,
  useFreeCameraScale,
} from '../../_state/freeCamera';
import styles from './ZoomControls.module.css';

/**
 * 자유 모드 확대·축소 버튼 「− 비율 + · 전체 보기」 (자유 모드일 때만 보인다, CSS).
 * 비율을 누르면 100%로 돌아간다. 실제 조작은 startFreeCamera가 등록한 명령을 부른다
 */
export function ZoomControls() {
  const scale = useFreeCameraScale();
  const percent = Math.round(scale * 100);

  return (
    <div role="group" aria-label="확대·축소" className={styles.root}>
      <Tooltip content="축소 (Ctrl·Cmd+휠)" placement="top">
        <IconButton
          aria-label="축소"
          type="button"
          onClick={() => getFreeCameraControls()?.zoomOut()}
        >
          <Icon>
            <MinusIcon />
          </Icon>
        </IconButton>
      </Tooltip>
      <Tooltip content="100%로 (Shift+0)" placement="top">
        <button
          type="button"
          className={styles.percent}
          aria-label={`지금 ${percent}%, 100%로 보기`}
          onClick={() => getFreeCameraControls()?.resetZoom()}
        >
          {percent}%
        </button>
      </Tooltip>
      <Tooltip content="확대 (Ctrl·Cmd+휠)" placement="top">
        <IconButton
          aria-label="확대"
          type="button"
          onClick={() => getFreeCameraControls()?.zoomIn()}
        >
          <Icon>
            <PlusIcon />
          </Icon>
        </IconButton>
      </Tooltip>
      <span className={styles.divider} aria-hidden="true" />
      <Tooltip content="전체 보기 (Shift+1)" placement="top">
        <IconButton
          aria-label="전체 보기"
          type="button"
          onClick={() => getFreeCameraControls()?.fitAll()}
        >
          <Icon>
            <FitIcon />
          </Icon>
        </IconButton>
      </Tooltip>
    </div>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M6 12h12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <path d="M6 12h12M12 6v12" />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4" />
    </svg>
  );
}
