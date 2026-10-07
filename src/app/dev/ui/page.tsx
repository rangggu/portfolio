import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';

export const metadata: Metadata = {
  robots: 'noindex',
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        paddingBlock: 'var(--spacing-32)',
        borderBottom: 'var(--border-width-1) solid var(--color-border-subtle)',
      }}
    >
      <h2
        style={{
          marginBottom: 'var(--spacing-16)',
          color: 'var(--color-text-secondary)',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--spacing-12)',
        marginBottom: 'var(--spacing-12)',
      }}
    >
      {children}
    </div>
  );
}

export default function DevUiPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: 'var(--layout-page-max)',
        margin: '0 auto',
        paddingBlock: 'var(--spacing-section)',
      }}
    >
      <h1 style={{ marginBottom: 'var(--spacing-32)' }}>UI Components</h1>

      <Section title="Button — variant × size">
        <Row>
          <Button variant="primary" size="md">
            Primary MD
          </Button>
          <Button variant="primary" size="sm">
            Primary SM
          </Button>
        </Row>
        <Row>
          <Button variant="secondary" size="md">
            Secondary MD
          </Button>
          <Button variant="secondary" size="sm">
            Secondary SM
          </Button>
        </Row>
        <Row>
          <Button variant="ghost" size="md">
            Ghost MD
          </Button>
          <Button variant="ghost" size="sm">
            Ghost SM
          </Button>
        </Row>
        <Row>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </Row>
      </Section>

      <Section title="IconButton — variant">
        <Row>
          <IconButton aria-label="테마 전환 (ghost)" variant="ghost">
            🌙
          </IconButton>
          <IconButton aria-label="물어보기 (surface)" variant="surface">
            ⌘
          </IconButton>
          <IconButton aria-label="비활성" variant="ghost" disabled>
            ✕
          </IconButton>
        </Row>
      </Section>

      <Section title="Link">
        <Row>
          <Link href="/about">내부 링크 (/about)</Link>
          <Link href="https://github.com/rangggu">외부 링크 (새 탭 + rel)</Link>
        </Row>
      </Section>

      <Section title="VisuallyHidden">
        <p>
          아래에 숨겨진 텍스트가 있습니다 (스크린리더만 읽음):
          <VisuallyHidden>이 텍스트는 보이지 않습니다</VisuallyHidden>
        </p>
      </Section>
    </main>
  );
}
