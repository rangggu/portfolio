import { TODO, type Profile } from '@/lib/resume/types';

export const profile = {
  name: '김규리',
  nickname: 'Myu',
  jobTitle: '프론트엔드 개발자',
  tagline: '작은 불편을 그냥 지나치지 않습니다.',
  subline: '화면의 디테일부터 그 뒤의 구조까지, 한 번 더 들여다보고 만듭니다.',
  // TODO: 공개할 이메일 주소
  email: TODO,
  links: [
    { type: 'github', label: 'GitHub', url: 'https://github.com/rangggu' },
  ],
} satisfies Profile;
