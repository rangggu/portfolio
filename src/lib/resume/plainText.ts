import { formatPeriod } from '@/lib/format/period';

import { isIntroParagraphFilled, toIntroPlainText } from './intro';
import { SKILL_CATEGORY_LABEL, type Period, type Resume } from './types';
import { isTodo } from './validate';

function line(...parts: string[]): string {
  return parts.filter((part) => part && !isTodo(part)).join(' · ');
}

function period(value: Period): string {
  if (isTodo(value.start) || (value.end && isTodo(value.end))) return '';
  return formatPeriod(value);
}

/** Phase 4 에이전트·인쇄 이력서용 평문. TODO인 값은 빠진다 */
export function toResumePlainText(resume: Resume): string {
  const { profile, intro, timeline, skills, education, certifications } =
    resume;
  const sections: string[] = [];

  sections.push(
    [
      line(profile.name, profile.nickname, profile.jobTitle),
      profile.tagline,
      profile.subline,
    ]
      .filter(Boolean)
      .join('\n'),
  );

  const introText = intro.filter(isIntroParagraphFilled).map(toIntroPlainText);
  if (introText.length > 0) sections.push(['## 소개', ...introText].join('\n'));

  if (timeline.length > 0) {
    const items = timeline.map((item) => {
      const head = line(
        item.lane === 'company' ? '회사' : '사이드·개인',
        item.name,
        item.role,
        period(item.period),
      );
      const achievements =
        item.lane === 'company'
          ? item.achievements.filter((a) => !isTodo(a)).map((a) => `  - ${a}`)
          : [];
      return [
        `- ${head}`,
        ...(isTodo(item.summary) ? [] : [`  ${item.summary}`]),
        ...achievements,
      ].join('\n');
    });
    sections.push(['## 경력', ...items].join('\n'));
  }

  if (skills.length > 0) {
    sections.push(
      [
        '## 기술',
        ...skills.map(
          (skill) =>
            `- ${line(SKILL_CATEGORY_LABEL[skill.category], skill.name)}`,
        ),
      ].join('\n'),
    );
  }

  if (education.length > 0 || certifications.length > 0) {
    sections.push(
      [
        '## 학력·자격',
        ...education.map(
          (item) =>
            `- ${line(item.school, item.major, item.degree, period(item.period))}`,
        ),
        ...certifications.map(
          (item) =>
            `- ${line(item.name, item.issuer, isTodo(item.date) ? '' : item.date.replace('-', '.'))}`,
        ),
      ].join('\n'),
    );
  }

  return sections.join('\n\n');
}
