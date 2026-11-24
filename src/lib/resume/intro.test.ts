import { describe, expect, it } from 'vitest';

import {
  isIntroParagraphFilled,
  toIntroPlainText,
  toIntroSegments,
} from './intro';
import { TODO } from './types';

const WITH_NOTE = [
  '입력 필드를 줄이는 대신 ',
  { text: '이전 값을 채우는 방식', note: '준비 시간이 10초에서 5초로 줄었다.' },
  '을 택했다.',
];

describe('toIntroSegments', () => {
  it('문자열 문단은 조각 하나로 바꾼다', () => {
    expect(toIntroSegments('문단')).toEqual(['문단']);
  });

  it('조각 배열은 그대로 둔다', () => {
    expect(toIntroSegments(WITH_NOTE)).toBe(WITH_NOTE);
  });
});

describe('isIntroParagraphFilled', () => {
  it('문자열과 메모 조각이 모두 채워져 있으면 true', () => {
    expect(isIntroParagraphFilled('문단')).toBe(true);
    expect(isIntroParagraphFilled(WITH_NOTE)).toBe(true);
  });

  it('TODO가 하나라도 있거나 조각이 없으면 false', () => {
    expect(isIntroParagraphFilled(TODO)).toBe(false);
    expect(isIntroParagraphFilled(['앞 ', { text: '연결', note: TODO }])).toBe(
      false,
    );
    expect(isIntroParagraphFilled([])).toBe(false);
  });
});

describe('toIntroPlainText', () => {
  it('본문을 이어 붙이고 메모는 다음 줄에 둔다', () => {
    expect(toIntroPlainText(WITH_NOTE)).toBe(
      '입력 필드를 줄이는 대신 이전 값을 채우는 방식을 택했다.\n  메모: 준비 시간이 10초에서 5초로 줄었다.',
    );
  });

  it('문자열 문단은 그대로', () => {
    expect(toIntroPlainText('문단')).toBe('문단');
  });
});
