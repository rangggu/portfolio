import { Text } from '@/components/ui/Text/Text';
import { RESUME } from '@/lib/resume';
import { HeroVisual } from './_components/HeroVisual/HeroVisual';
import styles from './HeroFrame.module.css';

interface HeroFrameProps {
  headingId: string;
}

const { profile } = RESUME;

/**
 * 첫 화면: 왼쪽 이름·대표 문구·보조 문장, 오른쪽 「1px까지 본다」 그림 (mockup-spec.md 「첫 화면」).
 * 제목(h1)은 이름·직무로 작게, 시선은 대표 문구가 받는다. 안쪽 폭 960px 미만이면 그림을 숨긴다.
 * 연락처는 연락처 프레임과 오른쪽 위 더보기가 맡는다.
 */
export function HeroFrame({ headingId }: HeroFrameProps) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <h1 id={headingId} className={styles.name}>
          {profile.name}
          <span aria-hidden="true"> · </span>
          <span className={styles.jobTitle}>{profile.jobTitle}</span>
        </h1>
        <Text variant="display" className={styles.tagline}>
          {profile.tagline}
        </Text>
        <Text variant="bodyLg" tone="secondary" className={styles.subline}>
          {profile.subline}
        </Text>
      </div>
      <HeroVisual />
    </div>
  );
}
