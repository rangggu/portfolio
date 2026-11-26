import { describe, expect, it } from 'vitest';

import { groupSkills } from './skills';
import { TODO, type Skill } from './types';

describe('groupSkills', () => {
  it('분류 고정 순서로 묶고, 항목이 없는 분류는 뺀다', () => {
    const skills: Skill[] = [
      { name: 'Claude Code', category: 'ai' },
      { name: 'Vitest', category: 'testing-quality' },
      { name: 'TypeScript', category: 'language-framework' },
      { name: 'React', category: 'language-framework' },
    ];
    const groups = groupSkills(skills);
    expect(groups.map((group) => [group.label, group.skills.length])).toEqual([
      ['언어·프레임워크', 2],
      ['테스트·품질', 1],
      ['AI', 1],
    ]);
  });

  it('분류 안 순서는 데이터 순서를 따른다', () => {
    const [group] = groupSkills([
      { name: 'React', category: 'language-framework' },
      { name: 'TypeScript', category: 'language-framework' },
    ]);
    expect(group?.skills).toEqual(['React', 'TypeScript']);
  });

  it('이름이 TODO인 기술은 뺀다', () => {
    expect(groupSkills([{ name: TODO, category: 'ui-styling' }])).toEqual([]);
  });

  it('기술이 없으면 빈 배열', () => {
    expect(groupSkills([])).toEqual([]);
  });
});
