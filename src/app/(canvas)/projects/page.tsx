import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('projects');

export default function ProjectsPage() {
  return <InitialFrame frameId="projects" />;
}
