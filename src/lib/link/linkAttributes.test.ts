import { describe, it, expect } from 'vitest';
import { isExternalHref, resolveLinkAttributes } from './linkAttributes';

describe('isExternalHref', () => {
  it('http(s)와 프로토콜 상대 URL은 외부 링크다', () => {
    expect(isExternalHref('https://github.com')).toBe(true);
    expect(isExternalHref('http://example.com')).toBe(true);
    expect(isExternalHref('//cdn.example.com')).toBe(true);
  });

  it('경로·해시·mailto는 외부 링크가 아니다', () => {
    expect(isExternalHref('/about')).toBe(false);
    expect(isExternalHref('#contact')).toBe(false);
    expect(isExternalHref('mailto:hi@example.com')).toBe(false);
  });
});

describe('resolveLinkAttributes', () => {
  const external = 'https://github.com';

  it('외부 링크에 rel이 없으면 noopener noreferrer와 _blank를 붙인다', () => {
    expect(resolveLinkAttributes(external)).toEqual({
      rel: 'noopener noreferrer',
      target: '_blank',
    });
  });

  it('외부 링크에 rel="me"를 넘기면 합친다', () => {
    expect(resolveLinkAttributes(external, { rel: 'me' }).rel).toBe(
      'me noopener noreferrer',
    );
  });

  it('이미 noopener가 있으면 중복하지 않는다', () => {
    expect(
      resolveLinkAttributes(external, { rel: 'noopener  external' }).rel,
    ).toBe('noopener external noreferrer');
  });

  it('외부 링크에서 사용자가 넘긴 target을 우선한다', () => {
    expect(resolveLinkAttributes(external, { target: '_self' }).target).toBe(
      '_self',
    );
  });

  it('내부 링크는 사용자 값을 그대로 돌려준다', () => {
    expect(resolveLinkAttributes('/about')).toEqual({
      rel: undefined,
      target: undefined,
    });
    expect(resolveLinkAttributes('/about', { rel: 'me' })).toEqual({
      rel: 'me',
      target: undefined,
    });
  });
});
