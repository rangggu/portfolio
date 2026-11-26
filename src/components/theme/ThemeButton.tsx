'use client';

import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { Tooltip } from '@/components/ui/Tooltip/Tooltip';
import { getNextTheme } from '@/lib/theme/theme';
import { MoonIcon } from './_components/MoonIcon/MoonIcon';
import { SunIcon } from './_components/SunIcon/SunIcon';
import { setTheme, useTheme } from './_state/theme';

const LABEL = {
  light: '라이트 모드로 전환',
  dark: '다크 모드로 전환',
} as const;

/** 툴팁: 바뀔 테마 이름과 설명 (CanvasModeButton과 같은 형식) */
const TOOLTIP = {
  light: '라이트 모드: 밝은 화면으로 봐요',
  dark: '다크 모드: 어두운 화면으로 봐요',
} as const;

/** 테마 전환 버튼. 아이콘·라벨·툴팁은 바뀔 테마를 보여준다 */
export function ThemeButton() {
  const theme = useTheme();
  const nextTheme = getNextTheme(theme);

  const handleClick = () => {
    setTheme(nextTheme);
  };

  return (
    <Tooltip content={TOOLTIP[nextTheme]} placement="bottom">
      <IconButton aria-label={LABEL[nextTheme]} onClick={handleClick}>
        <Icon>{nextTheme === 'dark' ? <MoonIcon /> : <SunIcon />}</Icon>
      </IconButton>
    </Tooltip>
  );
}
