# Design Tokens

값의 원천은 `src/styles/tokens.css`입니다. 이 문서는 토큰의 이름과 용도를 정리하며, 토큰을 추가·변경하면 이 문서도 함께 갱신합니다.

## 계층

| 계층                | 역할                                               | 참조 가능 위치        |
| ------------------- | -------------------------------------------------- | --------------------- |
| primitive           | raw 값 (`--color-gray-500`, `--color-blue-500`)    | `tokens.css` 안에서만 |
| semantic            | 의미 부여 (`--color-text-primary`)                 | 모든 컴포넌트         |
| 수치형·모션·z-index | 단일 계층 (`--spacing-16`, `--motion-press-scale`) | 모든 컴포넌트         |

라이트/다크 전환은 semantic 토큰만 재정의해서 처리합니다. 그라데이션도 semantic 색상을 참조하므로 테마에 따라 함께 바뀝니다.

## 색상 (semantic)

| 토큰                               | 용도                           |
| ---------------------------------- | ------------------------------ |
| `--color-text-primary`             | 본문, 제목                     |
| `--color-text-secondary`           | 보조 설명, 메타 정보           |
| `--color-text-tertiary`            | 캡션, 비활성에 가까운 정보     |
| `--color-text-disabled`            | 비활성 텍스트                  |
| `--color-text-inverse`             | 반전 배경 위 텍스트            |
| `--color-text-accent`              | 링크, 강조                     |
| `--color-text-on-accent`           | 강조 배경 위 텍스트            |
| `--color-text-danger` / `-success` | 상태 표시                      |
| `--color-bg-base`                  | 페이지 배경                    |
| `--color-bg-subtle`                | 섹션 구분 배경                 |
| `--color-bg-muted`                 | 태그, 스켈레톤 등              |
| `--color-bg-elevated`              | 카드, 팝오버, 다이얼로그       |
| `--color-bg-inverse`               | 반전 영역 (툴팁 등)            |
| `--color-bg-accent` / `-hover`     | 주요 버튼                      |
| `--color-bg-accent-subtle`         | 강조 배경 (선택된 탭 등)       |
| `--color-bg-floating`              | 반투명 플로팅 UI (blur와 함께) |
| `--color-bg-dim`                   | 오버레이 딤                    |
| `--color-bg-code`                  | 코드 블록                      |
| `--color-border-default`           | 기본 테두리, 구분선            |
| `--color-border-subtle`            | 약한 구분선                    |
| `--color-border-strong`            | 입력 요소 테두리               |
| `--color-border-focus`             | 포커스 링                      |

## 그라데이션

| 토큰                     | 용도                                       |
| ------------------------ | ------------------------------------------ |
| `--gradient-accent`      | 강조 텍스트(`background-clip: text`), 배지 |
| `--gradient-hero-glow`   | 히어로 영역 배경 광원                      |
| `--gradient-fade-bottom` | 접힌 콘텐츠 하단 페이드                    |
| `--gradient-skeleton`    | 스켈레톤 shimmer                           |

## 타이포그래피

### 이름 규칙

- **크기 토큰** (`tokens.css`): 값을 드러내는 이름. 고정 크기는 `--font-size-{px}`, 유동 크기는 `--font-size-{min}-{max}`.
- **텍스트 스타일** (`typography.module.css`): "종류 + 크기" 패턴 (`headingLg`, `bodyMd`, `monoSm` 등). 용도 이름(hero, section)은 쓰지 않음. 용도는 컴포넌트가 정함.
- 컴포넌트는 `--font-size-*` 토큰을 직접 쓰지 않고 항상 텍스트 스타일만 사용 (`Text`/`Heading` 컴포넌트 또는 `composes`). 크기 토큰을 참조하는 곳은 `typography.module.css` 하나뿐이어야 함.
- `font-size: inherit`, `1em`처럼 부모 크기를 따르는 경우만 예외.
- 굵기만 다른 변형(`bodyMdBold` 등)은 만들지 않음. 본문 속 강조는 `<strong>`에 전역 스타일로 처리.
- 새 크기가 필요하면 토큰을 직접 쓰지 말고 텍스트 스타일을 추가한 뒤 이 문서에 기록.

### 텍스트 스타일 표

| 스타일      | size (토큰)               | weight   | line-height | letter-spacing | font               | 용도                    |
| ----------- | ------------------------- | -------- | ----------- | -------------- | ------------------ | ----------------------- |
| `display`   | `--font-size-48-72` 48→72 | bold     | tight       | tight          | sans               | 첫 화면 이름            |
| `headingXl` | `--font-size-40-56` 40→56 | bold     | tight       | tight          | sans               | 첫 화면 한 줄 소개      |
| `headingLg` | `--font-size-28-40` 28→40 | bold     | tight       | tight          | sans               | 섹션 제목               |
| `headingMd` | `--font-size-20-24` 20→24 | semibold | snug        | tight          | sans               | 회사명, 프로젝트 제목   |
| `headingSm` | `--font-size-18` 18       | semibold | snug        | normal         | sans               | 작은 소제목             |
| `bodyLg`    | `--font-size-18` 18       | regular  | relaxed     | normal         | sans               | 소개·케이스 스터디 본문 |
| `bodyMd`    | `--font-size-16` 16       | regular  | normal      | normal         | sans               | 일반 본문               |
| `bodySm`    | `--font-size-14` 14       | regular  | normal      | normal         | sans               | 여백 메모, 보조 설명    |
| `labelMd`   | `--font-size-15` 15       | medium   | snug        | normal         | sans               | 메뉴, 버튼, 링크        |
| `labelSm`   | `--font-size-12` 12       | semibold | snug        | wide           | sans               | 칩, 태그                |
| `caption`   | `--font-size-13` 13       | regular  | snug        | normal         | sans               | 부가 설명               |
| `monoMd`    | `--font-size-15` 15       | regular  | snug        | normal         | mono, tabular-nums | 연도, 섹션 번호, 기간   |
| `monoSm`    | `--font-size-12` 12       | regular  | snug        | normal         | mono, tabular-nums | 작은 고정폭             |

숫자가 바뀌는 곳(숫자 롤링, 지표)은 `font-variant-numeric: tabular-nums`를 함께 씁니다.

## 간격

`--spacing-{px}`: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 120

| 범위   | 주 용도                         |
| ------ | ------------------------------- |
| 2–8    | 아이콘과 텍스트 사이, 태그 내부 |
| 12–24  | 컴포넌트 내부 패딩, 요소 간 gap |
| 32–64  | 섹션 내부 블록 간격             |
| 80–120 | 섹션 간 간격                    |

## 라운드·테두리·포커스

| 토큰                             | 용도                                 |
| -------------------------------- | ------------------------------------ |
| `--radius-4`                     | 인라인 코드, 작은 태그               |
| `--radius-8`                     | 입력 요소, 작은 버튼                 |
| `--radius-12`                    | 버튼, 카드                           |
| `--radius-16`                    | 큰 카드, 이미지                      |
| `--radius-24`                    | 다이얼로그, 바텀시트                 |
| `--radius-round`                 | pill, 원형 (9999px를 직접 쓰지 않음) |
| `--border-width-1` / `-2`        | 테두리 두께                          |
| `--focus-ring-width` / `-offset` | 포커스 링                            |

## 그림자·블러·투명도

| 토큰                 | 용도                        |
| -------------------- | --------------------------- |
| `--shadow-sm`        | 카드 기본                   |
| `--shadow-md`        | 카드 hover, 드롭다운        |
| `--shadow-lg`        | 팝오버, 커맨드 팔레트       |
| `--shadow-overlay`   | 다이얼로그, 바텀시트        |
| `--blur-floating`    | 플로팅 UI `backdrop-filter` |
| `--blur-overlay`     | 오버레이 딤 블러            |
| `--opacity-disabled` | 비활성 요소                 |

## 유동 토큰

`clamp()`로 뷰포트 360px → 1280px 구간에서 선형 보간합니다. 자세한 계산은 [responsive.md](responsive.md)를 참고합니다.

| 토큰                | clamp 값                                   | 모바일 → 최대 |
| ------------------- | ------------------------------------------ | ------------- |
| `--font-size-48-72` | `clamp(3rem, 2.41rem + 2.61vw, 4.5rem)`    | 48→72px       |
| `--font-size-40-56` | `clamp(2.5rem, 2.11rem + 1.74vw, 3.5rem)`  | 40→56px       |
| `--font-size-28-40` | `clamp(1.75rem, 1.46rem + 1.3vw, 2.5rem)`  | 28→40px       |
| `--font-size-20-24` | `clamp(1.25rem, 1.15rem + 0.43vw, 1.5rem)` | 20→24px       |
| `--spacing-section` | `clamp(3rem, 1.24rem + 7.83vw, 7.5rem)`    | 48→120px      |
| `--layout-gutter`   | `clamp(1.25rem, 0.76rem + 2.17vw, 2.5rem)` | 20→40px       |

## 레이아웃

| 토큰                       | 값                                   | 용도                                                               |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| `--layout-prose-max`       | 720px                                | 본문 글 최대 폭 (본문 18px에서 한 줄 한글 40자 안팎의 가독성 기준) |
| `--layout-prose-min`       | 560px                                | 여백 메모와 나란히 놓일 때 본문 최소 폭                            |
| `--layout-page-max`        | 1200px                               | 프레임 최대 폭. 타임라인, 목록 등은 이 폭을 전부 사용              |
| `--layout-note-width`      | 240px                                | 여백 메모 고정 폭                                                  |
| `--layout-gutter`          | clamp 20→40px                        | 프레임 안쪽 좌우 여백 (유동 토큰)                                  |
| `--layout-frame-peek`      | fine: clamp 48→120px, coarse: 12px   | 옆 프레임 노출 폭. `@media (pointer: coarse)`에서 12px로 재정의    |
| `--layout-frame-gap`       | fine: clamp 24→80px, coarse: 12px    | 프레임 사이 간격. `@media (pointer: coarse)`에서 12px로 재정의     |
| `--layout-floating-top`    | calc(44px + 12px + safe-area) ≈ 68px | 상단 플로팅 UI 영역. scroll-padding, sticky top 계산에 사용        |
| `--layout-floating-bottom` | calc(44px + 20px + safe-area) ≈ 76px | 하단 메뉴 바 영역. scroll-padding, 프레임 끝 안내 위치에 사용      |

## 모션

### 기본

| 토큰                   | 값           | 용도                     |
| ---------------------- | ------------ | ------------------------ |
| `--duration-instant`   | 100ms        | 누름                     |
| `--duration-fast`      | 150ms        | hover, 색 변화           |
| `--duration-normal`    | 250ms        | 대부분의 등장·퇴장       |
| `--duration-slow`      | 400ms        | 스프링 복귀, 페이지 전환 |
| `--duration-slower`    | 600ms        | 테마 원형 확산           |
| `--ease-standard`      | cubic-bezier | 일반 전환                |
| `--ease-out`           | cubic-bezier | 등장                     |
| `--ease-in`            | cubic-bezier | 퇴장                     |
| `--ease-spring-gentle` | `linear()`   | 인디케이터, 바텀시트     |
| `--ease-spring-bounce` | `linear()`   | 누름 후 복귀             |

### 애니메이션별

| 애니메이션               | 토큰                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| 누름 피드백              | `--motion-press-scale`, `--motion-press-duration`, `--motion-release-duration`, `--motion-release-ease` |
| 카드 hover               | `--motion-hover-lift`, `--motion-hover-duration`                                                        |
| 페이지 전환              | `--motion-page-duration`, `--motion-page-ease`                                                          |
| 테마 원형 확산           | `--motion-theme-reveal-duration`, `--motion-theme-reveal-ease`                                          |
| 다이얼로그               | `--motion-dialog-duration`, `--motion-dialog-ease`, `--motion-dialog-scale-from`                        |
| 바텀시트                 | `--motion-sheet-duration`, `--motion-sheet-ease`                                                        |
| 토스트                   | `--motion-toast-duration`                                                                               |
| 레이아웃 모핑 인디케이터 | `--motion-indicator-duration`, `--motion-indicator-ease`                                                |

### reduced motion

`prefers-reduced-motion: reduce`일 때 `tokens.css`에서 한 번에 재정의합니다. scale·이동 값은 중립(1, 0)으로, 스프링 곡선은 `--ease-standard`로 바뀌고, 테마 확산은 즉시 전환됩니다. 컴포넌트는 따로 분기하지 않습니다.

## z-index

| 토큰           | 값  | 대상                                       |
| -------------- | --- | ------------------------------------------ |
| `--z-toast`    | 400 | 토스트                                     |
| `--z-overlay`  | 300 | 직접 구현 오버레이 (바텀시트, 모바일 메뉴) |
| `--z-dropdown` | 200 | 드롭다운, 툴팁                             |
| `--z-sticky`   | 100 | 스크롤 헤더, 읽기 진행률, sticky 목차      |
| `--z-raised`   | 10  | hover로 떠오르는 카드                      |
| `--z-base`     | 0   | 기본                                       |

`<dialog>`(프로젝트 모달, 커맨드 팔레트)는 top layer에 뜨므로 이 표의 대상이 아닙니다.
