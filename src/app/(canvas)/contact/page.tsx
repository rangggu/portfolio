import { getFrameMetadata, InitialFrame } from '@/containers/canvas';

export const metadata = getFrameMetadata('contact');

export default function ContactPage() {
  return <InitialFrame frameId="contact" />;
}
