import { Canvas, FloatingTop, FrameMenu } from '@/features/canvas';

/**
 * 7개 프레임 라우트가 공유하는 캔버스와 플로팅 UI. page는 메타데이터와 초기 프레임만 정한다.
 * 메뉴 바는 화면 아래에 있지만 키보드 순서상 본문 앞에 둔다.
 */
export default function CanvasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FloatingTop />
      <FrameMenu />
      <Canvas>{children}</Canvas>
    </>
  );
}
