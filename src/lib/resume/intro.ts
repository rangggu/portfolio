import type { IntroParagraph, IntroSegment } from './types';
import { isTodo } from './validate';

/** 문단을 조각 배열로 맞춘다. 메모 없는 문자열 문단은 조각 하나 */
export function toIntroSegments(
  paragraph: IntroParagraph,
): readonly IntroSegment[] {
  return typeof paragraph === 'string' ? [paragraph] : paragraph;
}

/** 화면·평문에 내보낼 수 있는 문단인지 (조각이 있고 TODO가 하나도 없다) */
export function isIntroParagraphFilled(paragraph: IntroParagraph): boolean {
  const segments = toIntroSegments(paragraph);
  return (
    segments.length > 0 &&
    segments.every((segment) =>
      typeof segment === 'string'
        ? !isTodo(segment)
        : !isTodo(segment.text) && !isTodo(segment.note),
    )
  );
}

/** 평문: 본문을 이어 붙이고, 메모는 다음 줄에 `메모: …`로 둔다 */
export function toIntroPlainText(paragraph: IntroParagraph): string {
  const segments = toIntroSegments(paragraph);
  const body = segments
    .map((segment) => (typeof segment === 'string' ? segment : segment.text))
    .join('');
  const notes = segments.flatMap((segment) =>
    typeof segment === 'string' ? [] : [`  메모: ${segment.note}`],
  );

  return [body, ...notes].join('\n');
}
