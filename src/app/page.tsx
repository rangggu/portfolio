import styles from '@/styles/typography.module.css';

export default function Home() {
  return (
    <main style={{ maxWidth: 'var(--layout-page-max)', margin: '0 auto' }}>
      <section style={{ paddingBlock: 'var(--spacing-section)' }}>
        <h1 className={styles.display}>김규리</h1>
        <p
          className={styles.headingXl}
          style={{ marginTop: 'var(--spacing-16)' }}
        >
          작은 불편을 그냥 지나치지 않습니다.
        </p>
        <p className={styles.bodyLg} style={{ marginTop: 'var(--spacing-12)' }}>
          화면의 디테일부터 그 뒤의 구조까지, 한 번 더 들여다보고 만듭니다.
        </p>
      </section>

      <section style={{ paddingBlock: 'var(--spacing-section)' }}>
        <h2 className={styles.headingLg}>headingLg: 섹션 제목</h2>
        <h3
          className={styles.headingMd}
          style={{ marginTop: 'var(--spacing-16)' }}
        >
          headingMd: 회사명, 프로젝트 제목
        </h3>
        <h4
          className={styles.headingSm}
          style={{ marginTop: 'var(--spacing-12)' }}
        >
          headingSm: 작은 소제목
        </h4>
      </section>

      <section style={{ paddingBlock: 'var(--spacing-section)' }}>
        <p className={styles.bodyLg}>
          bodyLg: 소개·케이스 스터디 본문입니다. 가독성을 위해 줄 간격이
          넉넉합니다.
        </p>
        <p className={styles.bodyMd} style={{ marginTop: 'var(--spacing-12)' }}>
          bodyMd: 일반 본문 텍스트입니다.
        </p>
        <p className={styles.bodySm} style={{ marginTop: 'var(--spacing-12)' }}>
          bodySm: 여백 메모, 보조 설명 텍스트입니다.
        </p>
      </section>

      <section style={{ paddingBlock: 'var(--spacing-section)' }}>
        <p className={styles.labelMd}>labelMd: 메뉴, 버튼, 링크</p>
        <p className={styles.labelSm} style={{ marginTop: 'var(--spacing-8)' }}>
          labelSm: 칩, 태그
        </p>
        <p className={styles.caption} style={{ marginTop: 'var(--spacing-8)' }}>
          caption: 2023. 09 ~ 2024. 12 · 1년 3개월
        </p>
      </section>

      <section style={{ paddingBlock: 'var(--spacing-section)' }}>
        <p className={styles.monoMd}>
          monoMd: 2024 · 01 — 섹션 번호, 연도, 기간
        </p>
        <p className={styles.monoSm} style={{ marginTop: 'var(--spacing-8)' }}>
          monoSm: Phase 1 · v2.0.0
        </p>
      </section>
    </main>
  );
}
