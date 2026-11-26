import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('career');

export default function CareerPage() {
  return <InitialFrame frameId="career" />;
}
