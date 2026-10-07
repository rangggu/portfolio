import { Heading } from '@/components/ui/Heading';
import { Link } from '@/components/ui/Link';
import { Stack } from '@/components/ui/Stack';
import { Text } from '@/components/ui/Text';
import { PERSON } from '@/lib/site';

interface HeroFrameProps {
  headingId: string;
}

const GITHUB_URL = PERSON.sameAs[0];

export function HeroFrame({ headingId }: HeroFrameProps) {
  return (
    <Stack gap="40">
      <Stack gap="8">
        <Heading level={1} variant="display" id={headingId}>
          {PERSON.name}
        </Heading>
        <Text variant="headingMd" tone="secondary">
          {PERSON.jobTitle}
        </Text>
      </Stack>
      <Stack gap="12">
        <Text variant="headingXl">작은 불편을 그냥 지나치지 않습니다.</Text>
        <Text variant="bodyLg" tone="secondary">
          화면의 디테일부터 그 뒤의 구조까지, 한 번 더 들여다보고 만듭니다.
        </Text>
      </Stack>
      {/* TODO: 이메일 주소 확정 후 링크로 교체 */}
      <Stack as="ul" direction="row" gap="16" wrap>
        <li>
          <Text as="span" variant="labelMd" tone="tertiary">
            이메일 (준비 중)
          </Text>
        </li>
        <li>
          <Link href={GITHUB_URL}>GitHub</Link>
        </li>
      </Stack>
    </Stack>
  );
}
