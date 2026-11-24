import { describe, expect, it } from 'vitest';

import {
  TODO,
  type CompanyTimelineItem,
  type Education,
  type Resume,
  type SideTimelineItem,
} from './types';
import { validateProjectTimelineIds, validateResume } from './validate';

const COMPANY: CompanyTimelineItem = {
  id: 'company-a',
  lane: 'company',
  name: '회사 A',
  role: '개발자',
  period: { start: '2023-01', end: '2024-06' },
  summary: '설명',
  achievements: ['성과'],
  links: [],
};

const SIDE: SideTimelineItem = {
  id: 'side-a',
  lane: 'side',
  name: '사이드 A',
  role: '개인',
  period: { start: '2024-07' },
  summary: '설명',
  links: [{ label: '저장소', url: 'https://example.com' }],
};

const EDUCATION: Education = {
  school: '학교',
  major: '전공',
  degree: '학사',
  period: { start: '2016-03', end: '2020-02' },
};

function sample(): Resume {
  return {
    profile: {
      name: '이름',
      nickname: 'Nick',
      jobTitle: '직무',
      tagline: '한 줄 소개',
      subline: '보조 문장',
      contactMessage: '연락 문장',
      email: 'me@example.com',
      links: [
        { type: 'github', label: 'GitHub', url: 'https://github.com/me' },
      ],
    },
    intro: ['소개 문단'],
    timeline: [COMPANY, SIDE],
    skills: [
      {
        name: 'React',
        category: 'language-framework',
        firstUsedIn: 'company-a',
      },
    ],
    education: [EDUCATION],
    certifications: [{ name: '자격', issuer: '기관', date: '2021-05' }],
  };
}

describe('validateResume', () => {
  it('올바른 데이터는 그대로 통과하고 TODO가 없다', () => {
    const data = sample();
    expect(validateResume(data)).toEqual({ resume: data, todos: [] });
  });

  it('TODO 값은 형식 검사를 건너뛰고 위치를 모아 돌려준다', () => {
    const data = sample();
    data.profile = { ...data.profile, email: TODO };
    data.timeline = [{ ...COMPANY, role: TODO, period: { start: TODO } }];
    data.skills = [];
    expect(validateResume(data).todos).toEqual([
      'profile.email',
      'timeline[0].role',
      'timeline[0].period.start',
    ]);
  });

  it('메모가 있는 소개 문단은 조각마다 검사하고 TODO 위치를 기록한다', () => {
    const data = sample();
    data.intro = [
      '문자열 문단',
      ['앞 ', { text: '연결 텍스트', note: TODO }, ' 뒤'],
    ];
    expect(validateResume(data).todos).toEqual(['intro[1][1].note']);
  });

  it.each<[string, (data: Resume) => void, RegExp]>([
    [
      '빈 이름',
      (d) => void (d.profile = { ...d.profile, name: ' ' }),
      /profile\.name: 비어/,
    ],
    [
      '이메일 형식',
      (d) => void (d.profile = { ...d.profile, email: 'me' }),
      /profile\.email: 이메일/,
    ],
    ['빈 소개 문단 배열', (d) => void (d.intro = [[]]), /intro\[0\]: 비어/],
    [
      '빈 소개 메모',
      (d) => void (d.intro = [['앞 ', { text: '연결', note: ' ' }]]),
      /intro\[0\]\[1\]\.note: 비어/,
    ],
    [
      '링크 URL 형식',
      (d) =>
        void (d.profile = {
          ...d.profile,
          links: [{ type: 'other', label: 'x', url: 'example.com' }],
        }),
      /profile\.links\[0\]\.url/,
    ],
    [
      '기간 형식',
      (d) =>
        void (d.education = [{ ...EDUCATION, period: { start: '2016.03' } }]),
      /education\[0\]\.period\.start: YYYY-MM/,
    ],
    [
      'end가 start보다 앞섬',
      (d) =>
        void (d.timeline = [
          { ...COMPANY, period: { start: '2024-06', end: '2023-01' } },
        ]),
      /timeline\[0\]\.period: end가 start보다/,
    ],
    [
      '중복 id',
      (d) => void (d.timeline = [COMPANY, { ...SIDE, id: 'company-a' }]),
      /id "company-a"가 중복/,
    ],
    [
      '없는 타임라인 항목을 가리키는 기술',
      (d) =>
        void (d.skills = [
          { name: 'Vue', category: 'styling', firstUsedIn: 'nowhere' },
        ]),
      /firstUsedIn: 타임라인에 "nowhere"/,
    ],
    [
      '사이드 레인의 성과 요약',
      (d) =>
        void (d.timeline = [
          COMPANY,
          // 타입은 막지만, 타입 검사를 우회한 데이터도 실행 시점에 잡는지 확인
          { ...SIDE, achievements: ['성과'] } as unknown as SideTimelineItem,
        ]),
      /성과 요약은 회사 레인에만/,
    ],
  ])('%s이면 에러를 낸다', (_, mutate, message) => {
    const data = sample();
    mutate(data);
    expect(() => validateResume(data)).toThrow(message);
  });

  it('틀린 곳을 모두 모아 한 번에 알려준다', () => {
    const data = sample();
    data.profile = { ...data.profile, name: '', email: 'bad' };
    expect(() => validateResume(data)).toThrow(/형식 오류 2건/);
  });
});

describe('validateProjectTimelineIds', () => {
  it('타임라인에 없는 timelineId를 가진 글을 알려준다', () => {
    expect(() =>
      validateProjectTimelineIds(
        [
          { slug: 'ok', timelineId: 'company-a' },
          { slug: 'bad', timelineId: 'missing' },
        ],
        new Set(['company-a']),
      ),
    ).toThrow('bad.mdx → "missing"');
  });
});
