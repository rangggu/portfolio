import { MarginNote } from '@/components/ui/MarginNote/MarginNote';
import { MarginNoteAnchor } from '@/components/ui/MarginNote/MarginNoteAnchor';
import { MarginNoteGroup } from '@/components/ui/MarginNote/MarginNoteGroup';
import { toIntroSegments } from '@/lib/resume/intro';
import type { IntroParagraph } from '@/lib/resume/types';

interface IntroParagraphBlockProps {
  paragraph: IntroParagraph;
}

/** 소개 문단 하나: 메모가 없으면 문단 하나, 있으면 연결 텍스트와 여백 메모를 묶은 그룹 */
export function IntroParagraphBlock({ paragraph }: IntroParagraphBlockProps) {
  const segments = toIntroSegments(paragraph);
  const hasNote = segments.some((segment) => typeof segment !== 'string');

  if (!hasNote) return <p>{segments.join('')}</p>;

  const noteId = (index: number) => `n${index}`;

  return (
    <MarginNoteGroup>
      <p>
        {segments.map((segment, index) =>
          typeof segment === 'string' ? (
            segment
          ) : (
            <MarginNoteAnchor key={index} note={noteId(index)}>
              {segment.text}
            </MarginNoteAnchor>
          ),
        )}
      </p>
      {segments.map((segment, index) =>
        typeof segment === 'string' ? null : (
          <MarginNote key={index} id={noteId(index)}>
            {segment.note}
          </MarginNote>
        ),
      )}
    </MarginNoteGroup>
  );
}
