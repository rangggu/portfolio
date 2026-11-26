import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { filled, RESUME } from '@/lib/resume';
import { DevPlaceholder, shouldRenderSlot } from '../../_shared/DevPlaceholder';
import { CopyValueButton } from './_components/CopyValueButton';
import styles from './ContactFrame.module.css';

interface ContactFrameProps {
  headingId: string;
  title: string;
}

const { profile } = RESUME;

/**
 * 연락처 프레임: 마지막 화면이라 한 덩어리를 가운데에 (mockup-spec.md 「연락처」).
 * 인사 문장 → 「라벨 · 값」 연락처 묶음(이메일, GitHub). 값을 누르면 복사된다 (메일 앱·새 탭을 열지 않음). 이력서 인쇄는 오른쪽 위 더보기에. 묶음은 가운데, 줄은 왼쪽 정렬.
 * 「연락처」 제목은 이름표·메뉴 바가 이미 보여 주므로 보조기기에만 둔다.
 * 비어 있는 문장·이메일은 숨긴다 (개발 모드에서는 자리표시).
 */
export function ContactFrame({ headingId, title }: ContactFrameProps) {
  const message = filled(profile.contactMessage);
  const email = filled(profile.email);
  const github = profile.links.find((link) => link.type === 'github');

  return (
    <div className={styles.root}>
      <Heading level={2} id={headingId} className={styles.hiddenHeading}>
        <VisuallyHidden>{title}</VisuallyHidden>
      </Heading>
      {shouldRenderSlot(Boolean(message)) && (
        <Text variant="headingLg" className={styles.message}>
          {message ?? (
            <DevPlaceholder>
              연락처 문장 (content/resume/profile.ts)
            </DevPlaceholder>
          )}
        </Text>
      )}
      <dl className={styles.info}>
        {shouldRenderSlot(Boolean(email)) && (
          <div className={styles.row}>
            <dt className={styles.label}>이메일</dt>
            <dd className={styles.value}>
              {email ? (
                <CopyValueButton value={email} name="이메일 주소">
                  {email}
                </CopyValueButton>
              ) : (
                <DevPlaceholder>
                  이메일 (content/resume/profile.ts)
                </DevPlaceholder>
              )}
            </dd>
          </div>
        )}
        {github && (
          <div className={styles.row}>
            <dt className={styles.label}>{github.label}</dt>
            <dd className={styles.value}>
              <CopyValueButton value={github.url} name="GitHub 주소">
                {github.url.replace(/^https?:\/\//, '')}
              </CopyValueButton>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
