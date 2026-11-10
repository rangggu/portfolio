import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('education');

export default function EducationPage() {
  return <InitialFrame frameId="education" />;
}
