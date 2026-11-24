import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('hero');

export default function HomePage() {
  return <InitialFrame frameId="hero" />;
}
