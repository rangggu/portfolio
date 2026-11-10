import {
  MarginNote,
  MarginNoteAnchor,
  MarginNoteGroup,
} from '@/components/ui/MarginNote';
import { Prose } from '@/components/ui/Prose';
import { RESUME } from '@/lib/resume';
import { isIntroParagraphFilled, toIntroSegments } from '@/lib/resume/intro';
import type { IntroParagraph } from '@/lib/resume/types';
import { DevPlaceholder } from '../../_shared/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading';
import styles from './AboutFrame.module.css';

interface AboutFrameProps {
  headingId: string;
  number: string;
  title: string;
}

/** 메모가 없으면 문단 하나, 있으면 연결 텍스트와 여백 메모를 묶은 그룹 */
function IntroParagraphBlock({ paragraph }: { paragraph: IntroParagraph }) {
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

/** 소개 프레임: 섹션 머리 + 소개 문단(content/resume/intro.ts). 빈 문단은 개발 모드에서만 자리표시 */
export function AboutFrame({ headingId, number, title }: AboutFrameProps) {
  const paragraphs = RESUME.intro;
  const hasFilledParagraph = paragraphs.some(isIntroParagraphFilled);

  return (
    <div className={styles.root}>
      <FrameHeading number={number} title={title} id={headingId} />
      {hasFilledParagraph ? (
        <Prose>
          {paragraphs.map((paragraph, index) =>
            isIntroParagraphFilled(paragraph) ? (
              <IntroParagraphBlock key={index} paragraph={paragraph} />
            ) : (
              <DevPlaceholder key={index}>
                소개 {index + 1}번째 문단에 채우지 않은 값이 있어요
              </DevPlaceholder>
            ),
          )}
        </Prose>
      ) : (
        <DevPlaceholder variant="block">
          소개 문단 자리 (content/resume/intro.ts)
        </DevPlaceholder>
      )}
    </div>
  );
}
