import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Icon } from '@/components/ui/Icon';
import { Stack } from '@/components/ui/Stack';
import { Text, type TextVariant } from '@/components/ui/Text';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import {
  MarginNote,
  MarginNoteAnchor,
  MarginNoteGroup,
} from '@/components/ui/MarginNote';
import { Prose } from '@/components/ui/Prose';
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

const TEXT_VARIANTS: TextVariant[] = [
  'display',
  'headingXl',
  'headingLg',
  'headingMd',
  'headingSm',
  'bodyLg',
  'bodyMd',
  'bodySm',
  'labelMd',
  'labelSm',
  'caption',
  'monoMd',
  'monoSm',
];

function SampleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function MarginNoteSample() {
  return (
    <Prose>
      <p>메모가 없는 문단은 본문 열 폭만 씁니다.</p>
      <MarginNoteGroup>
        <p>
          연결 텍스트는{' '}
          <MarginNoteAnchor note="why">왜 그렇게 했는지</MarginNoteAnchor>를
          짧게 적은 메모와 이어집니다. 한 문단에{' '}
          <MarginNoteAnchor note="more">메모가 둘</MarginNoteAnchor>이어도
          됩니다.
        </p>
        <MarginNote id="why">
          넓은 프레임에서는 본문 오른쪽에 항상 보이고, 좁은 프레임에서는 눌렀을
          때 문단 아래에 펼쳐집니다.
        </MarginNote>
        <MarginNote id="more">메모는 문단 순서대로 쌓입니다.</MarginNote>
      </MarginNoteGroup>
      <p>다음 문단은 메모와 상관없이 이어집니다.</p>
    </Prose>
  );
}

export default function DevUiPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <Container
      as="main"
      id="main"
      tabIndex={-1}
      style={{ paddingBlock: 'var(--spacing-64)' }}
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

      <Section title="Text — variant 13개 × tone">
        <Stack gap="8">
          {TEXT_VARIANTS.map((variant) => (
            <Text key={variant} variant={variant}>
              {variant}: 작은 불편을 그냥 지나치지 않습니다.
            </Text>
          ))}
          <Stack direction="row" gap="16" wrap>
            <Text tone="secondary">secondary</Text>
            <Text tone="tertiary">tertiary</Text>
            <Text tone="accent">accent</Text>
          </Stack>
        </Stack>
      </Section>

      <Section title="Heading — level과 시각 스타일 분리">
        <Stack gap="8">
          <Heading level={3}>h3 기본 (headingMd)</Heading>
          <Heading level={3} variant="headingLg">
            h3 + headingLg
          </Heading>
        </Stack>
      </Section>

      <Section title="Stack — rowFrom 480 (컨테이너 폭 기준)">
        <Stack gap="12" rowFrom={480}>
          <Button variant="secondary">하나</Button>
          <Button variant="secondary">둘</Button>
          <Button variant="secondary">셋</Button>
        </Stack>
      </Section>

      <Section title="Icon — sm / md / lg, currentColor">
        <Stack direction="row" gap="16" align="center">
          <Icon size="sm">
            <SampleIcon />
          </Icon>
          <Icon size="md">
            <SampleIcon />
          </Icon>
          <Text as="span" tone="accent">
            <Icon size="lg" label="원">
              <SampleIcon />
            </Icon>
          </Text>
        </Stack>
      </Section>

      <Section title="MarginNote — 넓은 프레임 (컨테이너 ≥ 832px)">
        <MarginNoteSample />
      </Section>

      <Section title="MarginNote — 좁은 프레임 (안쪽 Container prose, < 832px)">
        <Container width="prose">
          <MarginNoteSample />
        </Container>
      </Section>

      <Section title="VisuallyHidden">
        <p>
          아래에 숨겨진 텍스트가 있습니다 (스크린리더만 읽음):
          <VisuallyHidden>이 텍스트는 보이지 않습니다</VisuallyHidden>
        </p>
      </Section>
    </Container>
  );
}
