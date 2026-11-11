import { describe, expect, it } from 'vitest';

import { groupSkills } from './skills';
import { TODO, type Skill, type TimelineItem } from './types';

function side(id: string, start: string): TimelineItem {
  return {
    id,
    lane: 'side',
    name: id,
    role: '개인',
    period: { start },
    summary: '설명',
    links: [],
  };
}

const TIMELINE = [side('a', '2021-03'), side('b', '2023-11'), side('c', TODO)];

describe('groupSkills', () => {
  it('분류 고정 순서로 묶고, 항목이 없는 분류는 뺀다', () => {
    const skills: Skill[] = [
      { name: 'Vitest', category: 'testing-quality', firstUsedIn: 'b' },
      { name: 'TypeScript', category: 'language-framework', firstUsedIn: 'a' },
      { name: 'React', category: 'language-framework', firstUsedIn: 'b' },
    ];
    const groups = groupSkills(skills, TIMELINE);
    expect(groups.map((group) => [group.label, group.skills.length])).toEqual([
      ['언어·프레임워크', 2],
      ['테스트·품질', 1],
    ]);
  });

  it('분류 안 순서는 데이터 순서를 따른다', () => {
    const skills: Skill[] = [
      { name: 'React', category: 'language-framework', firstUsedIn: 'b' },
      { name: 'TypeScript', category: 'language-framework', firstUsedIn: 'a' },
    ];
    const [group] = groupSkills(skills, TIMELINE);
    expect(group?.skills.map((skill) => skill.name)).toEqual([
      'React',
      'TypeScript',
    ]);
  });

  it('첫 사용 연도는 firstUsedIn 항목의 시작 연도다', () => {
    const [group] = groupSkills(
      [{ name: 'CSS', category: 'styling', firstUsedIn: 'a' }],
      TIMELINE,
    );
    expect(group?.skills).toEqual([{ name: 'CSS', firstUsedYear: 2021 }]);
  });

  it('firstUsedIn 항목의 시작월이 TODO면 연도를 비운다', () => {
    const [group] = groupSkills(
      [{ name: 'Figma', category: 'collaboration-tooling', firstUsedIn: 'c' }],
      TIMELINE,
    );
    expect(group?.skills).toEqual([{ name: 'Figma' }]);
  });

  it('이름이 TODO인 기술은 뺀다', () => {
    const groups = groupSkills(
      [{ name: TODO, category: 'styling', firstUsedIn: 'a' }],
      TIMELINE,
    );
    expect(groups).toEqual([]);
  });

  it('기술이 없으면 빈 배열', () => {
    expect(groupSkills([], TIMELINE)).toEqual([]);
  });
});
