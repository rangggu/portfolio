import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('education');

export default function EducationPage() {
  return <InitialFrame frameId="education" />;
}
