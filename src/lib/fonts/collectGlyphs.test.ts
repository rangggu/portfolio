import { describe, expect, it } from 'vitest';

import {
  missingGlyphs,
  textFromMdx,
  textFromScript,
  toGlyphs,
} from './collectGlyphs';

describe('textFromScript', () => {
  it('문자열·템플릿 조각·JSX 텍스트를 모은다', () => {
    const source = `
      const label = '소개';
      const title = \`경력 \${count}건 보기\`;
      export function A() { return <p title="제목">안녕하세요</p>; }
    `;
    const text = textFromScript(source, 'a.tsx');
    for (const part of ['소개', '경력 ', '건 보기', '제목', '안녕하세요']) {
      expect(text).toContain(part);
    }
  });

  it('주석과 식별자는 모으지 않는다', () => {
    const source = `
      // 주석에만 있는 글자: 뷁
      /** 문서 주석: 똠 */
      const 변수 = 'ok';
    `;
    const text = textFromScript(source, 'a.ts');
    expect(text).toBe('ok');
  });

  it('.ts 파일은 JSX 없이 읽는다 (타입 단언 문법)', () => {
    const text = textFromScript("const a = <string>'값';", 'a.ts');
    expect(text).toBe('값');
  });
});

describe('textFromMdx', () => {
  it('frontmatter와 본문을 그대로 쓴다', () => {
    const source = '---\ntitle: 제목\n---\n\n본문';
    expect(textFromMdx(source)).toBe(source);
  });
});

describe('toGlyphs', () => {
  it('공백·제어 문자를 빼고 중복 없이 코드 포인트 순으로 정렬한다', () => {
    expect(toGlyphs('나 가\n가\tA​')).toEqual(['A', '가', '나']);
  });

  it('서로게이트 쌍(이모지 등)을 한 글자로 본다', () => {
    expect(toGlyphs('😀a')).toEqual(['a', '😀']);
  });
});

describe('missingGlyphs', () => {
  it('목록에 없는 글자만 돌려준다', () => {
    expect(missingGlyphs(['가', '나', 'A'], ['가', 'A'])).toEqual(['나']);
  });

  it('모두 있으면 빈 배열', () => {
    expect(missingGlyphs(['가'], '가나')).toEqual([]);
  });
});
