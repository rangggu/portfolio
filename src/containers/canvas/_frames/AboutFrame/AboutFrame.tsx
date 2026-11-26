import { Prose } from '@/components/ui/Prose/Prose';
import { RESUME } from '@/lib/resume';
import { isIntroParagraphFilled } from '@/lib/resume/intro';
import { DevPlaceholder } from '../../_shared/DevPlaceholder/DevPlaceholder';
import { FrameHeading } from '../../_shared/FrameHeading/FrameHeading';
import { IntroParagraphBlock } from './_components/IntroParagraphBlock/IntroParagraphBlock';
import styles from './AboutFrame.module.css';

interface AboutFrameProps {
  headingId: string;
  number: string;
  title: string;
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
