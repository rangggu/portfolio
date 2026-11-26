import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('about');

export default function AboutPage() {
  return <InitialFrame frameId="about" />;
}
