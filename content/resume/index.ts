import type { Resume } from '@/lib/resume/types';

import { certifications, education } from './education';
import { intro } from './intro';
import { profile } from './profile';
import { skills } from './skills';
import { timeline } from './timeline';

/** 검증 전 원본. 화면에서는 src/lib/resume의 RESUME(검증 통과본)을 쓴다 */
export const rawResume: Resume = {
  profile,
  intro,
  timeline,
  skills,
  education,
  certifications,
};
