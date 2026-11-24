import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없어요',
};

export default function NotFound() {
  return (
    <Container as="main" id="main" tabIndex={-1}>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
    </Container>
  );
}
