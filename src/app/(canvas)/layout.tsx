import { Canvas, FloatingTop, FrameMenu } from '@/features/canvas';
import { PrintResume } from '@/features/resume';

/**
 * 7개 프레임 라우트가 공유하는 캔버스와 플로팅 UI. page는 메타데이터와 초기 프레임만 정한다.
 * 메뉴 바는 화면 아래에 있지만 키보드 순서상 본문 앞에 둔다.
 * modal: 캔버스 안에서 연 케이스 스터디 (@modal 인터셉트 라우트, 없으면 null)
 * PrintResume: 인쇄 때 캔버스 대신 찍히는 A4 이력서 (화면에는 없음)
 */
export default function CanvasLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <FloatingTop />
      <FrameMenu />
      <Canvas>{children}</Canvas>
      {modal}
      <PrintResume />
    </>
  );
}
