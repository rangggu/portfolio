import {
  SKILL_CATEGORIES,
  SKILL_CATEGORY_LABEL,
  type Skill,
  type SkillCategory,
} from './types';
import { isTodo } from './validate';

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  /** 기술 이름 (데이터 순서) */
  skills: string[];
}

/**
 * 기술을 분류 고정 순서(SKILL_CATEGORIES)로 묶는다. 이름이 TODO인 기술과 항목이 없는 분류는 뺀다.
 * 분류 안 순서는 데이터 순서를 따른다.
 */
export function groupSkills(skills: readonly Skill[]): SkillGroup[] {
  return SKILL_CATEGORIES.map((category) => ({
    category,
    label: SKILL_CATEGORY_LABEL[category],
    skills: skills
      .filter((skill) => skill.category === category && !isTodo(skill.name))
      .map((skill) => skill.name),
  })).filter((group) => group.skills.length > 0);
}
