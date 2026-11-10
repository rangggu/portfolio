'use client';

import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { getNextTheme } from '@/lib/theme/theme';
import { setTheme, useTheme } from './_state/theme';

const LABEL = {
  light: '라이트 모드로 전환',
  dark: '다크 모드로 전환',
} as const;

/** 테마 전환 버튼. 아이콘과 라벨은 바뀔 테마를 보여준다 */
export function ThemeButton() {
  const theme = useTheme();
  const nextTheme = getNextTheme(theme);

  const handleClick = () => {
    setTheme(nextTheme);
  };

  return (
    <IconButton aria-label={LABEL[nextTheme]} onClick={handleClick}>
      <Icon>{nextTheme === 'dark' ? <MoonIcon /> : <SunIcon />}</Icon>
    </IconButton>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}
