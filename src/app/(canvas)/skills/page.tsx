import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('skills');

export default function SkillsPage() {
  return <InitialFrame frameId="skills" />;
}
