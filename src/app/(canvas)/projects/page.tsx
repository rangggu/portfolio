import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('projects');

export default function ProjectsPage() {
  return <InitialFrame frameId="projects" />;
}
