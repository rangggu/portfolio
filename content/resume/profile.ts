import type { Profile } from '@/lib/resume/types';

export const profile = {
  name: '김규리',
  nickname: 'Myu',
  jobTitle: '프론트엔드 개발자',
  tagline: '마지막 1px까지 봅니다.',
  subline:
    '반복되는 일은 AI에게 맡기고, 사람의 눈과 판단이 필요한 문제는 먼저 찾아 풀어냅니다.',
  contactMessage: '끝까지 둘러봐 주셔서 감사합니다.',
  email: 'aliyah521@naver.com',
  links: [
    { type: 'github', label: 'GitHub', url: 'https://github.com/rangggu' },
  ],
} satisfies Profile;
