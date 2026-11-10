import { Canvas } from '@/features/canvas';

/** 7개 프레임 라우트가 공유하는 캔버스. page는 메타데이터와 초기 프레임만 정한다 */
export default function CanvasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Canvas>{children}</Canvas>;
}
