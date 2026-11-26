import type { Certification, Education } from '@/lib/resume/types';

export const education: readonly Education[] = [
  {
    school: '부산대학교',
    major: '경제학부 경제학과',
    degree: '졸업',
    period: { start: '2019-03', end: '2023-08' },
  },
  {
    school: '제로베이스',
    major: '프론트엔드 스쿨',
    degree: '수료',
    period: { start: '2022-09', end: '2023-04' },
  },
  {
    school: '스파르타코딩클럽',
    major: '웹개발 종합반',
    degree: '수료',
    period: { start: '2022-02', end: '2022-03' },
  },
];

export const certifications: readonly Certification[] = [
  {
    name: '데이터분석준전문가 (ADsP)',
    issuer: '한국데이터산업진흥원',
    date: '2022-03',
  },
  {
    name: '컴퓨터활용능력 1급',
    issuer: '대한상공회의소',
    date: '2021-09',
  },
  {
    name: '한국사능력검정시험 심화',
    issuer: '국사편찬위원회',
    date: '2021-09',
  },
];
