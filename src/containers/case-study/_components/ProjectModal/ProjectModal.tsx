'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BottomSheet } from '@/components/ui/Dialog/BottomSheet';
import { Dialog } from '@/components/ui/Dialog/Dialog';
import { Icon } from '@/components/ui/Icon/Icon';
import { IconLink } from '@/components/ui/IconButton/IconLink';
import { Tooltip } from '@/components/ui/Tooltip/Tooltip';
import { useMediaQuery } from '../../_hooks/useMediaQuery';

/** 이 폭보다 좁으면 화면 아래 시트로 연다 */
const SHEET_MEDIA_QUERY = '(width < 768px)';

interface ProjectModalProps {
  slug: string;
  title: string;
  /** 열려 있는 동안의 문서 제목 (닫으면 캔버스가 프레임 제목으로 되돌린다) */
  documentTitle: string;
  children: React.ReactNode;
}

/**
 * 캔버스 위에서 여는 케이스 스터디 (@modal 인터셉트 라우트).
 * 닫으면(Esc·바깥·닫기 버튼) 기록을 한 칸 뒤로 돌려 보던 프레임 주소로 돌아간다.
 * 브라우저 뒤로 가기로 사라질 때도 연 링크로 포커스를 돌려준다.
 */
export function ProjectModal({
  slug,
  title,
  documentTitle,
  children,
}: ProjectModalProps) {
  const router = useRouter();
  const isSheet = useMediaQuery(SHEET_MEDIA_QUERY);
  const [open, setOpen] = useState(true);
  const openerRef = useRef<Element | null>(null);

  // 연 요소는 <dialog>가 showModal()로 포커스를 가져가기 전(자식 useEffect보다 먼저)에 기억한다
  useLayoutEffect(() => {
    openerRef.current = document.activeElement;
  }, []);

  // close()를 거치지 않고 사라지면(뒤로 가기) 브라우저가 포커스를 돌려주지 않는다.
  // <dialog>가 문서에서 빠져 배경의 inert가 풀린 뒤(useEffect 정리)에 돌려준다
  useEffect(
    () => () => {
      const opener = openerRef.current;
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    },
    [],
  );

  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    if (!open) router.back();
  }, [open, router]);

  const handleClose = () => {
    setOpen(false);
  };

  const ModalComponent = isSheet ? BottomSheet : Dialog;
  const href = `/projects/${slug}`;

  return (
    <ModalComponent
      key={isSheet ? 'sheet' : 'dialog'}
      open={open}
      onClose={handleClose}
      title={title}
      focusContent
      {...(isSheet ? {} : { size: 'xl' as const })}
      actions={
        <Tooltip content="새 페이지로 열기" placement="bottom">
          <IconLink href={href} aria-label="새 페이지로 열기">
            <Icon>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" />
              </svg>
            </Icon>
          </IconLink>
        </Tooltip>
      }
    >
      {children}
    </ModalComponent>
  );
}
