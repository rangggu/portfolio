import { getFrameMetadata, InitialFrame } from '@/features/canvas';

export const metadata = getFrameMetadata('contact');

export default function ContactPage() {
  return <InitialFrame frameId="contact" />;
}
