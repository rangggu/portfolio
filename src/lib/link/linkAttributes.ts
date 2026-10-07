const EXTERNAL_REL = ['noopener', 'noreferrer'];

interface LinkAttributes {
  rel?: string;
  target?: string;
}

/** `http(s)://` 또는 프로토콜 상대 URL(`//`)이면 외부 링크로 본다. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith('//');
}

/**
 * 링크의 rel·target을 결정한다.
 * - 외부 링크: 사용자 rel에 `noopener noreferrer`를 항상 합치고(중복 제거),
 *   target은 사용자 값을 우선하며 없으면 `_blank`.
 * - 내부 링크: 사용자 값을 그대로 돌려준다.
 */
export function resolveLinkAttributes(
  href: string,
  { rel, target }: LinkAttributes = {},
): LinkAttributes {
  if (!isExternalHref(href)) return { rel, target };

  const tokens = rel?.split(/\s+/).filter(Boolean) ?? [];
  const mergedRel = [...new Set([...tokens, ...EXTERNAL_REL])].join(' ');

  return { rel: mergedRel, target: target ?? '_blank' };
}
