import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('skills');

export default function SkillsPage() {
  return <InitialFrame frameId="skills" />;
}
