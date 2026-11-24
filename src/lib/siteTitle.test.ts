import { describe, expect, it } from 'vitest';

import { HOME_TITLE, pageTitle, SITE_NAME, TITLE_TEMPLATE } from './siteTitle';

describe('siteTitle', () => {
  it('첫 화면은 「이름 | 직무」', () => {
    expect(HOME_TITLE).toBe('김규리 | 프론트엔드 개발자');
  });

  it('하위 페이지는 「페이지 | 이름 포트폴리오」', () => {
    expect(SITE_NAME).toBe('김규리 포트폴리오');
    expect(pageTitle('소개')).toBe('소개 | 김규리 포트폴리오');
    expect(TITLE_TEMPLATE).toBe('%s | 김규리 포트폴리오');
  });
});
