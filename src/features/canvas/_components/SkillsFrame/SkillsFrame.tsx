import { Heading } from '@/components/ui/Heading';
import { Tag } from '@/components/ui/Tag';
import { RESUME } from '@/lib/resume';
import { groupSkills } from '@/lib/resume/skills';
import { DevPlaceholder } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import styles from './SkillsFrame.module.css';

interface SkillsFrameProps {
  headingId: string;
  number: string;
  title: string;
}

/**
 * 기술 프레임: 분류별 카드 그리드 (mockup-spec.md 「기술」). 카드 안 기술 이름은 칩으로 줄바꿈.
 */
export function SkillsFrame({ headingId, number, title }: SkillsFrameProps) {
  const groups = groupSkills(RESUME.skills);

  return (
    <div className={styles.root}>
      <FrameHeading number={number} title={title} id={headingId} />
      {groups.length > 0 ? (
        <div className={styles.grid}>
          {groups.map((group) => (
            <section
              key={group.category}
              className={styles.group}
              aria-labelledby={`skills-${group.category}`}
            >
              <Heading
                level={3}
                variant="headingSm"
                id={`skills-${group.category}`}
              >
                {group.label}
              </Heading>
              <ul className={styles.items}>
                {group.skills.map((skill) => (
                  <Tag as="li" key={skill} className={styles.chip}>
                    {skill}
                  </Tag>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <DevPlaceholder variant="block">
          기술 목록 (content/resume/skills.ts)
        </DevPlaceholder>
      )}
    </div>
  );
}
