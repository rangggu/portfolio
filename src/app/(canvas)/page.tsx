import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('hero');

export default function HomePage() {
  return <InitialFrame frameId="hero" />;
}
