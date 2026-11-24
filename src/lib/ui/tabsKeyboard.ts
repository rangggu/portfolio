/**
 * 탭 목록 키보드 이동 (WAI-ARIA Authoring Practices 「Tabs」).
 * 가로 탭: ←·→로 이전·다음 (끝에서 처음으로 순환), Home·End로 처음·끝.
 * 그 밖의 키면 undefined (기본 동작을 막지 않는다).
 */
export function nextTabIndex(
  key: string,
  current: number,
  count: number,
): number | undefined {
  if (count <= 0) return undefined;
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % count;
    case 'ArrowLeft':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return undefined;
  }
}
