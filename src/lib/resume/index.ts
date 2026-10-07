import { rawResume } from '../../../content/resume';

import { isTodo, validateResume } from './validate';

export { isTodo } from './validate';
export * from './types';

/**
 * 검증을 통과한 이력서 데이터. 형식이 틀리면 이 모듈을 불러오는 순간(=빌드 중) 에러가 난다.
 * content/resume는 경로 별칭 규칙(@/* 하나)에 따라 상대 경로로 가져온다.
 */
const validation = validateResume(rawResume);

export const RESUME = validation.resume;

/** 아직 채우지 않은 값의 위치 목록 */
export const RESUME_TODOS: readonly string[] = validation.todos;

export const TIMELINE_IDS: ReadonlySet<string> = new Set(
  RESUME.timeline.map((item) => item.id),
);

/** TODO가 아닌 값만 돌려준다 (화면·JSON-LD에서 빈 자리를 건너뛸 때) */
export function filled(value: string): string | undefined {
  return isTodo(value) ? undefined : value;
}
