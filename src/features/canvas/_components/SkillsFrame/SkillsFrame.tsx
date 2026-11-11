import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { RESUME } from '@/lib/resume';
import { groupSkills, type SkillEntry } from '@/lib/resume/skills';
import { DevPlaceholder } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import styles from './SkillsFrame.module.css';

interface SkillsFrameProps {
  headingId: string;
  number: string;
  title: string;
}

function SkillItem({ skill }: { skill: SkillEntry }) {
  return (
    <li className={styles.item}>
      <Text as="span" variant="bodyMd">
        {skill.name}
      </Text>
      {skill.firstUsedYear !== undefined ? (
        <Text
          as="span"
          variant="monoSm"
          tone="tertiary"
          className={styles.year}
        >
          {skill.firstUsedYear}
        </Text>
      ) : (
        <DevPlaceholder>첫 사용 시점</DevPlaceholder>
      )}
    </li>
  );
}

/**
 * 기술 프레임: 분류별 묶음 그리드 (mockup-spec.md 「기술」).
 * 항목 오른쪽은 처음 사용한 해 (firstUsedIn 타임라인 항목의 시작 연도).
 */
export function SkillsFrame({ headingId, number, title }: SkillsFrameProps) {
  const groups = groupSkills(RESUME.skills, RESUME.timeline);

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
                variant="monoSm"
                tone="secondary"
                id={`skills-${group.category}`}
              >
                {group.label}
              </Heading>
              <ul className={styles.items}>
                {group.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
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
