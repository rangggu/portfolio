import { ButtonLink } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { filled, RESUME } from '@/lib/resume';
import { DevPlaceholder, shouldRenderSlot } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import { CopyEmailButton } from './_components/CopyEmailButton';
import { PrintButton } from './_components/PrintButton';
import styles from './ContactFrame.module.css';

interface ContactFrameProps {
  headingId: string;
  number: string;
  title: string;
}

const { profile } = RESUME;

/**
 * 연락처 프레임: 큰 문장 + 버튼 3개 (mockup-spec.md 「연락처」).
 * 이메일이 비어 있으면 복사 버튼을 숨긴다. 버튼 줄은 인쇄에서 빠진다.
 */
export function ContactFrame({ headingId, number, title }: ContactFrameProps) {
  const message = filled(profile.contactMessage);
  const email = filled(profile.email);
  const github = profile.links.find((link) => link.type === 'github');

  return (
    <div className={styles.root}>
      <FrameHeading number={number} title={title} id={headingId} />
      {shouldRenderSlot(Boolean(message)) && (
        <Text variant="headingMd" className={styles.message}>
          {message ?? (
            <DevPlaceholder>
              연락처 문장 (content/resume/profile.ts)
            </DevPlaceholder>
          )}
        </Text>
      )}
      <div className={styles.actions}>
        {email ? (
          <CopyEmailButton email={email} />
        ) : (
          <DevPlaceholder>
            이메일 복사 버튼: 이메일이 비어 있어 숨김
            (content/resume/profile.ts)
          </DevPlaceholder>
        )}
        {github && (
          <ButtonLink href={github.url} variant="secondary">
            {github.label}
          </ButtonLink>
        )}
        <PrintButton />
      </div>
    </div>
  );
}
