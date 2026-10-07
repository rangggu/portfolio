import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { filled, RESUME } from '@/lib/resume';

interface HeroFrameProps {
  headingId: string;
}

const { profile } = RESUME;

export function HeroFrame({ headingId }: HeroFrameProps) {
  const email = filled(profile.email);

  return (
    <Stack gap="40">
      <Stack gap="8">
        <Heading level={1} variant="display" id={headingId}>
          {profile.name}
        </Heading>
        <Text variant="headingMd" tone="secondary">
          {profile.jobTitle}
        </Text>
      </Stack>
      <Stack gap="12">
        <Text variant="headingXl">{profile.tagline}</Text>
        <Text variant="bodyLg" tone="secondary">
          {profile.subline}
        </Text>
      </Stack>
      <Stack as="ul" direction="row" gap="16" wrap>
        <li>
          {email ? (
            <Link href={`mailto:${email}`}>{email}</Link>
          ) : (
            <Text as="span" variant="labelMd" tone="tertiary">
              이메일 (준비 중)
            </Text>
          )}
        </li>
        {profile.links.map((link) => (
          <li key={link.url}>
            <Link href={link.url}>{link.label}</Link>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
