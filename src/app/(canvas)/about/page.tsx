import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('about');

export default function AboutPage() {
  return <InitialFrame frameId="about" />;
}
