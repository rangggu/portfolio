import { createProcessor } from '@mdx-js/mdx';
import { describe, expect, it } from 'vitest';

import { mdastToPlainText } from './plainText';

function toText(mdx: string) {
  return mdastToPlainText(createProcessor().parse(mdx));
}

describe('mdastToPlainText', () => {
  it('블록 사이는 빈 줄로 나눈다', () => {
    expect(toText('## 제목\n\n첫 문단\n\n둘째 문단')).toBe(
      '제목\n\n첫 문단\n\n둘째 문단',
    );
  });

  it('인라인 서식과 링크는 글자만 남긴다', () => {
    expect(toText('**굵게** 와 [링크](https://example.com) 와 `code`')).toBe(
      '굵게 와 링크 와 code',
    );
  });

  it('import·export와 식은 버린다', () => {
    expect(toText("import x from 'y'\n\n{1 + 1}\n\n본문")).toBe('본문');
  });

  it('JSX 컴포넌트는 감싼 내용만 남긴다', () => {
    expect(toText('<Box>\n안쪽 *글*\n</Box>')).toBe('안쪽 글');
  });
});
