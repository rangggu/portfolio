import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('career');

export default function CareerPage() {
  return <InitialFrame frameId="career" />;
}
