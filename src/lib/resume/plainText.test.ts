import { describe, expect, it } from 'vitest';

import { toResumePlainText } from './plainText';
import { TODO, type Resume } from './types';

describe('toResumePlainText', () => {
  it('섹션별 평문을 만들고 TODO 값은 뺀다', () => {
    const resume: Resume = {
      profile: {
        name: '이름',
        nickname: 'Myu',
        jobTitle: '직무',
        tagline: '한 줄 소개',
        subline: '보조 문장',
        contactMessage: '연락 문장',
        email: TODO,
        links: [],
      },
      intro: [TODO],
      timeline: [
        {
          id: 'c',
          lane: 'company',
          name: '회사',
          role: TODO,
          period: { start: TODO },
          summary: TODO,
          achievements: ['성과 하나'],
          links: [],
        },
        {
          id: 's',
          lane: 'side',
          name: '사이드',
          role: '개인',
          period: { start: '2024-07' },
          summary: '한 줄 설명',
          links: [],
        },
      ],
      skills: [
        { name: 'React', category: 'language-framework', firstUsedIn: 'c' },
      ],
      education: [],
      certifications: [],
    };

    const text = toResumePlainText(resume);
    expect(text).toContain('이름 · Myu · 직무');
    expect(text).not.toContain('## 소개');
    expect(text).toContain('- 회사 · 회사');
    expect(text).toContain('  - 성과 하나');
    expect(text).toContain('- 사이드·개인 · 사이드 · 개인 · 2024.07 – 진행 중');
    expect(text).toContain('- 언어·프레임워크 · React');
    expect(text).not.toContain(TODO);
  });

  it('메모가 있는 소개 문단은 본문 뒤에 메모를 붙인다', () => {
    const resume: Resume = {
      profile: {
        name: '이름',
        nickname: 'Myu',
        jobTitle: '직무',
        tagline: '한 줄 소개',
        subline: '보조 문장',
        contactMessage: '연락 문장',
        email: TODO,
        links: [],
      },
      intro: [
        '첫 문단',
        ['둘째 ', { text: '연결', note: '메모 내용' }, ' 문단'],
      ],
      timeline: [],
      skills: [],
      education: [],
      certifications: [],
    };

    expect(toResumePlainText(resume)).toContain(
      '## 소개\n첫 문단\n둘째 연결 문단\n  메모: 메모 내용',
    );
  });
});
