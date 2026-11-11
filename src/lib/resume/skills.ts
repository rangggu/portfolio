import {
  SKILL_CATEGORIES,
  SKILL_CATEGORY_LABEL,
  type Skill,
  type SkillCategory,
  type TimelineItem,
} from './types';
import { isTodo } from './validate';

export interface SkillEntry {
  name: string;
  /** 처음 사용한 해 (firstUsedIn 항목의 시작 연도). 시작월이 TODO면 undefined */
  firstUsedYear?: number;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: SkillEntry[];
}

/**
 * 기술을 분류 고정 순서(SKILL_CATEGORIES)로 묶는다. 이름이 TODO인 기술과 항목이 없는 분류는 뺀다.
 * 분류 안 순서는 데이터 순서를 따른다.
 */
export function groupSkills(
  skills: readonly Skill[],
  timeline: readonly TimelineItem[],
): SkillGroup[] {
  const startById = new Map(
    timeline.map((item) => [item.id, item.period.start]),
  );

  const toEntry = (skill: Skill): SkillEntry => {
    const start = startById.get(skill.firstUsedIn);
    if (start === undefined || isTodo(start)) return { name: skill.name };
    return { name: skill.name, firstUsedYear: Number(start.slice(0, 4)) };
  };

  return SKILL_CATEGORIES.map((category) => ({
    category,
    label: SKILL_CATEGORY_LABEL[category],
    skills: skills
      .filter((skill) => skill.category === category && !isTodo(skill.name))
      .map(toEntry),
  })).filter((group) => group.skills.length > 0);
}
