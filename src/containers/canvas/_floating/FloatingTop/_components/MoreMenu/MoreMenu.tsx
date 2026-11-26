'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Icon } from '@/components/ui/Icon/Icon';
import { IconButton } from '@/components/ui/IconButton/IconButton';
import { filled, RESUME } from '@/lib/resume';
import {
  copyEmail,
  copyText,
  printResume,
} from '../../../../_shared/contactActions/contactActions';
import styles from './MoreMenu.module.css';

const { profile } = RESUME;

/**
 * 오른쪽 위 「더보기(⋯)」 버튼과 그 아래 메뉴: 이메일 복사 · GitHub 주소 복사 · 이력서 인쇄 (복사는 연락처 프레임과 같은 규칙: 메일 앱·새 탭을 열지 않는다).
 * 펼침 목록(disclosure)이라 Popover API에 맡긴다: Esc·바깥 누르기로 닫히고, Tab 순서는 버튼 바로 다음.
 */
export function MoreMenu() {
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const email = filled(profile.email);
  const github = profile.links.find((link) => link.type === 'github');

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const handleToggle = (event: Event) => {
      setOpen((event as ToggleEvent).newState === 'open');
    };
    menu.addEventListener('toggle', handleToggle);
    return () => menu.removeEventListener('toggle', handleToggle);
  }, []);

  /** 한 번 하고 끝나는 항목은 메뉴를 닫고 실행한다 (인쇄 미리보기에 메뉴가 남지 않게) */
  const closeThen = (action: () => void) => () => {
    menuRef.current?.hidePopover();
    action();
  };

  return (
    <>
      <IconButton
        aria-label="더보기"
        type="button"
        popoverTarget={menuId}
        aria-expanded={open}
      >
        <Icon>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5.5" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="18.5" cy="12" r="1.6" />
          </svg>
        </Icon>
      </IconButton>
      <div ref={menuRef} id={menuId} popover="auto" className={styles.menu}>
        <ul className={styles.list}>
          {email && (
            <li>
              <button
                type="button"
                className={styles.item}
                onClick={closeThen(() => void copyEmail(email))}
              >
                이메일 복사
              </button>
            </li>
          )}
          {github && (
            <li>
              <button
                type="button"
                className={styles.item}
                onClick={closeThen(
                  () => void copyText(github.url, 'GitHub 주소'),
                )}
              >
                GitHub 주소 복사
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className={styles.item}
              onClick={closeThen(printResume)}
            >
              이력서 인쇄
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
