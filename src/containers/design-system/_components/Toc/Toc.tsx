'use client';

import { useEffect, useState } from 'react';
import styles from './Toc.module.css';

export interface TocItem {
  id: string;
  title: string;
}

interface TocProps {
  groups: { title: string; items: TocItem[] }[];
}

/**
 * 페이지 목차. 「토큰」·「컴포넌트」 묶음은 네이티브 <details>로 접고 펼친다 (JS 없이 키보드·스크린리더 지원).
 * 같은 name으로 묶어 한 번에 한 묶음만 펼친다: 목차 안 스크롤 없이도 왼쪽에 따라다니는 목차가 화면 안에 다 들어온다.
 * 스크롤하면 지금 보고 있는 섹션을 굵게(aria-current) 표시하고, 그 섹션이 접힌 묶음에 있으면 그 묶음을 펼친다.
 */
export function Toc({ groups }: TocProps) {
  const [activeId, setActiveId] = useState<string>();
  const [openGroup, setOpenGroup] = useState(0);

  useEffect(() => {
    const sections = groups
      .flatMap((group) => group.items)
      .flatMap((item) => {
        const element = document.getElementById(item.id);
        return element ? [element] : [];
      });
    const visible = new Set<string>();
    const last = sections.at(-1);

    // 보고 있는 섹션을 표시하고, 그 섹션의 묶음이 접혀 있으면 펼친다 (같은 name이라 다른 묶음은 접힌다)
    // 페이지 끝에서는 마지막 섹션이 위쪽 띠까지 올라오지 못하므로 맨 아래면 마지막 항목을 표시한다
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const current = atBottom
        ? last
        : sections.filter((section) => visible.has(section.id)).at(-1);
      if (!current) return;
      setActiveId(current.id);
      const groupIndex = groups.findIndex((group) =>
        group.items.some((item) => item.id === current.id),
      );
      if (groupIndex !== -1) setOpenGroup(groupIndex);
    };

    // 화면 위쪽 띠(위 20%~30%)에 걸친 섹션 중 가장 아래 것이 지금 보고 있는 섹션
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [groups]);

  return (
    <nav aria-label="목차" className={styles.root}>
      {groups.map((group, index) => (
        <details
          key={group.title}
          name="design-system-toc"
          className={styles.group}
          open={index === openGroup}
          onToggle={(event) => {
            if (event.currentTarget.open) setOpenGroup(index);
          }}
        >
          <summary className={styles.groupTitle}>{group.title}</summary>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.link}
                  aria-current={item.id === activeId ? 'location' : undefined}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </nav>
  );
}
