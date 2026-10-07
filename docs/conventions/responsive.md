# Responsive

## 원칙

- 기기 이름이 아니라 너비, 화면 비율, 컨테이너 크기로 분기합니다.
- 페이지 레이아웃은 미디어 쿼리, 컴포넌트는 컨테이너 쿼리(`@container`)를 씁니다.
- 모바일 우선(`min-width`)으로 작성합니다.

### 쿼리 문법: 범위 문법만 사용

미디어 쿼리와 컨테이너 쿼리 모두 범위 문법을 씁니다.

```css
/* Good */
@media (width >= 768px) { ... }
@container (width < 768px) { ... }

/* Bad — 금지 */
@media (min-width: 768px) { ... }
@media (max-width: 767px) { ... }
```

`max-width: 767px` 같은 -1px 방식을 쓰지 않습니다. 브라우저 확대·축소나 폴더블 기기에서 뷰포트가 767.5px처럼 소수점으로 잡히면 `min-width: 768px`과 `max-width: 767px` 사이에 틈이 생겨 어느 조건에도 해당하지 않는 구간이 발생합니다. 범위 문법은 이 문제가 없습니다.

## 기준 기기 매트릭스

CSS viewport 값(논리 픽셀, 세로 모드 기준). 같은 데이터가 `src/lib/devices.ts`에 있으며 Phase 4 Playwright 테스트에서도 사용합니다.

| 분류         | 기기                | CSS 너비 | CSS 높이 | 구간 | 출처                          |
| ------------ | ------------------- | -------- | -------- | ---- | ----------------------------- |
| 소형 폰      | iPhone SE 3         | 375      | 667      | 기본 | Apple Dev, ios-resolution.com |
| 일반 폰      | iPhone 15           | 393      | 852      | 기본 | Apple Dev, ios-resolution.com |
| 일반 폰      | Galaxy S24          | 360      | 780      | 기본 | yesviz.com                    |
| 대형 폰      | iPhone 16 Pro Max   | 440      | 956      | 기본 | Apple Dev, ios-resolution.com |
| 대형 폰      | Galaxy S24 Ultra    | 412      | 891      | 기본 | yesviz.com                    |
| 폴더블 커버  | Galaxy Z Fold 6     | 360      | 879      | 기본 | TODO: 실기기 검증 필요        |
| 폴더블 내부  | Galaxy Z Fold 6     | 928      | 1080     | md   | TODO: 물리 해상도/DPR 추정    |
| 폴더블       | Galaxy Z Flip 6     | 412      | 1005     | 기본 | TODO: 추정값                  |
| 폴더블 접힘  | iPhone Duo (5.4")   | TODO     | TODO     | TODO | TODO: 미출시                  |
| 폴더블 펼침  | iPhone Duo (7.6")   | TODO     | TODO     | TODO | TODO: 미출시                  |
| 태블릿       | iPad mini 7 (세로)  | 744      | 1133     | 기본 | Apple Dev, ios-resolution.com |
| 태블릿       | iPad Air 11" (세로) | 820      | 1180     | md   | ios-resolution.com            |
| 태블릿       | iPad Pro 11" (세로) | 834      | 1194     | md   | ios-resolution.com            |
| 태블릿       | iPad Pro 13" (세로) | 1024     | 1366     | lg   | ios-resolution.com            |
| 태블릿       | iPad mini 7 (가로)  | 1133     | 744      | lg   | ios-resolution.com            |
| 태블릿       | iPad Air 11" (가로) | 1180     | 820      | lg   | ios-resolution.com            |
| 태블릿       | iPad Pro 11" (가로) | 1194     | 834      | lg   | ios-resolution.com            |
| 태블릿       | iPad Pro 13" (가로) | 1366     | 1024     | lg   | ios-resolution.com            |
| 랩톱         | 소형                | 1280     | 800      | lg   | 일반 사양                     |
| 랩톱         | 중형                | 1440     | 900      | lg   | 일반 사양                     |
| 데스크톱     | FHD                 | 1920     | 1080     | lg   | 표준                          |
| 울트라와이드 | UWQHD               | 2560     | 1080     | lg   | 표준                          |

출처 링크:

- https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/
- https://www.ios-resolution.com/
- https://yesviz.com/viewport/

## 브레이크포인트

| 이름 | 조건              | 뷰포트 범위 |
| ---- | ----------------- | ----------- |
| 기본 | `width < 768px`   | 0–767px     |
| md   | `width >= 768px`  | 768px 이상  |
| lg   | `width >= 1024px` | 1024px 이상 |

md와 lg 두 개만 씁니다. 컴포넌트별 세밀한 분기는 컨테이너 쿼리로 처리합니다.

## 너비 외 분기

| 상황         | 쿼리                                                    |
| ------------ | ------------------------------------------------------- |
| 폰 가로 모드 | `@media (orientation: landscape) and (height <= 440px)` |
| 짧은 랩톱    | `@media (width >= 1024px) and (height <= 700px)`        |

- `height <= 440px`은 가장 큰 폰(iPhone 16 Pro Max, 440px)의 가로 높이 기준입니다. 이 이하면 확실히 폰 가로 모드입니다.
- `height <= 700px`은 1024px 이상 너비에서 브라우저 UI를 뺀 실제 뷰포트 높이가 짧은 경우(13" 맥북 기본 해상도 등)를 감지합니다.

## 폭 개념

| 토큰                   | 값     | 용도                                                                                                      |
| ---------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `--layout-prose-max`   | 720px  | 본문 글 최대 폭. 본문 18px에서 한 줄 한글 40자 안팎의 가독성 기준. 소개, 케이스 스터디처럼 긴 글에만 적용 |
| `--layout-page-max`    | 1200px | 프레임 최대 폭(좌우 여백 포함). `Container width="page"` 최대 폭과 같음                                   |
| 콘텐츠 최대 폭         | 1120px | `--layout-page-max`(1200) − 양쪽 `--layout-gutter` 최대값(40×2). 타임라인, 목록 등은 이 폭을 전부 사용    |
| 유동 토큰 최대 도달 폭 | 1280px | 유동 토큰의 보간 구간(360→1280px) 끝. 이 뷰포트 폭 이상에서 유동 토큰이 최대값에 도달                     |

## 유동 타이포그래피·간격

`clamp()`로 뷰포트 360px → 1280px 구간에서 선형 보간합니다. 값은 `tokens.css`에 정의합니다.

| 토큰                | clamp 값                                   | 모바일 → 최대 |
| ------------------- | ------------------------------------------ | ------------- |
| `--font-size-48-72` | `clamp(3rem, 2.41rem + 2.61vw, 4.5rem)`    | 48→72px       |
| `--font-size-36-56` | `clamp(2.25rem, 1.76rem + 2.17vw, 3.5rem)` | 36→56px       |
| `--font-size-28-40` | `clamp(1.75rem, 1.46rem + 1.3vw, 2.5rem)`  | 28→40px       |
| `--font-size-20-24` | `clamp(1.25rem, 1.15rem + 0.43vw, 1.5rem)` | 20→24px       |
| `--layout-gutter`   | `clamp(1.25rem, 0.76rem + 2.17vw, 2.5rem)` | 20→40px       |

계산 공식: `slope = (max - min) / (1280 - 360)`, `intercept = min - slope × 360`

### 주요 뷰포트에서의 실제 값 (px)

| 토큰                | 360px | 768px | 1024px | 1280px | 1920px |
| ------------------- | ----- | ----- | ------ | ------ | ------ |
| `--font-size-48-72` | 48    | 59    | 66     | 72     | 72     |
| `--font-size-36-56` | 36    | 45    | 50     | 56     | 56     |
| `--font-size-28-40` | 28    | 33    | 37     | 40     | 40     |
| `--font-size-20-24` | 20    | 22    | 23     | 24     | 24     |
| `--layout-gutter`   | 20    | 29    | 34     | 40     | 40     |

## 기기 특성 대응

### viewport-fit과 safe area

`viewport-fit=cover`를 설정하고, 노치·Dynamic Island·하단 바를 침범하지 않도록 `env(safe-area-inset-*)`를 씁니다.

```css
.root {
  padding-left: max(var(--layout-gutter), env(safe-area-inset-left));
  padding-right: max(var(--layout-gutter), env(safe-area-inset-right));
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 100vh 대신 dvh/svh

`100vh`는 모바일 브라우저에서 주소창을 포함한 높이를 반환합니다. 첫 화면 같은 풀스크린 영역에는 `100dvh`를, 최소 높이에는 `100svh`를 씁니다.

### 가로 모드

가로 모드에서 높이가 부족하면 첫 화면의 수직 간격을 줄이고, 스크롤이 가능하도록 합니다.

### 세션 중 뷰포트 변경 (폴더블)

접힘 ↔ 펼침, 가로 ↔ 세로처럼 세션 중에 뷰포트가 바뀌어도 아래가 유지되어야 합니다:

- 스크롤 위치
- 열린 모달 (`<dialog>`)
- 클라이언트 상태 (`useState`, 스토어)

CSS가 뷰포트에 반응하면 레이아웃은 자동으로 바뀝니다. JS로 `window.innerWidth`를 캐싱해두고 쓰는 패턴은 피합니다.

## 폴더블 전용 CSS

`viewport segments`와 `device-posture` API는 지원 브라우저에서만 점진적 향상으로 적용합니다. 기본 레이아웃은 이 API 없이 동작해야 합니다.

```css
/* 점진적 향상: 폴드 힌지 영역에 간격 추가 */
@media (horizontal-viewport-segments: 2) {
  .twoPane {
    gap: env(viewport-segment-left 1 0) - env(viewport-segment-right 0 0);
  }
}
```

## 캔버스 프레임 레이아웃

### 이동 방식 전환 기준

화면 폭이 아니라 **입력 방식**으로 결정합니다.

| 조건                       | 방식          | 설명                                                   |
| -------------------------- | ------------- | ------------------------------------------------------ |
| `@media (pointer: fine)`   | 카메라 이동   | 사용자는 아래로만 스크롤. 프레임 간 이동은 카메라 연출 |
| `@media (pointer: coarse)` | 좌우 스와이프 | 프레임 안 세로 스크롤, 프레임 사이 좌우 스와이프       |

폴더블 기기는 접힘·펼침 모두 `pointer: coarse`이므로 항상 스와이프 방식입니다. 접힘 ↔ 펼침으로 뷰포트가 바뀌어도 이동 방식이 전환되지 않습니다.

### 프레임 폭 계산

프레임 폭 = 뷰포트 - (노출 + 간격) × 2, 최대 `--layout-page-max`(1200px).

**pointer: fine (카메라 이동):**

- 노출: `--layout-frame-peek` = `clamp(3rem, 8.3vw, 7.5rem)` (48→120px)
- 간격: `--layout-frame-gap` = `clamp(1.5rem, 5.6vw, 5rem)` (24→80px)

**pointer: coarse (스와이프):**

- `@media (pointer: coarse)`에서 `--layout-frame-peek`, `--layout-frame-gap`을 각각 12px로 재정의

### 기기별 프레임 폭·안쪽 폭·레이아웃

| 기기/뷰포트              | 입력  | 노출 | 간격 | 프레임 폭 | gutter | 안쪽 폭 | 두 레인 (≥768) | 메모 옆 (≥832) |
| ------------------------ | ----- | ---- | ---- | --------- | ------ | ------- | -------------- | -------------- |
| iPhone SE 3 (375)        | touch | 12   | 12   | 327       | 20     | 287     | ✗              | ✗              |
| iPhone 16 Pro Max (440)  | touch | 12   | 12   | 392       | 22     | 348     | ✗              | ✗              |
| iPad mini 세로 (744)     | touch | 12   | 12   | 696       | 28     | 640     | ✗              | ✗              |
| iPad Air 세로 (820)      | touch | 12   | 12   | 772       | 30     | 712     | ✗              | ✗              |
| Z Fold 6 내부 (928)      | touch | 12   | 12   | 880       | 33     | 814     | ✓              | ✗              |
| iPad Pro 13" 세로 (1024) | touch | 12   | 12   | 976       | 34     | 908     | ✓              | ✓              |
| 뷰포트 1024              | fine  | 85   | 57   | 740       | 34     | 672     | ✗              | ✗              |
| 뷰포트 1280              | fine  | 106  | 72   | 924       | 40     | 844     | ✓              | ✓              |
| 뷰포트 1440              | fine  | 120  | 80   | 1040      | 40     | 960     | ✓              | ✓              |
| 뷰포트 1920              | fine  | 120  | 80   | 1200*     | 40     | 1120    | ✓              | ✓              |

\* `--layout-page-max`(1200px)로 캡

1280px 이상 fine pointer에서 두 레인 + 메모 옆 배치가 보장됩니다. Z Fold 펼침(928, touch)은 두 레인이지만 메모는 문단 아래 펼침(814 < 832)으로 전환됩니다.

### 구현 원칙

**스크롤은 진짜, 카메라 이동은 연출.** 실제 문서는 프레임 순서대로 이어지는 일반 페이지이고, 화면의 카메라 이동만 스크롤 위치에 연동된 효과로 처리합니다.

- `prefers-reduced-motion: reduce`에서는 카메라 이동 없이 일반 세로 페이지
- 인쇄 시 캔버스와 플로팅 UI 없이 A4 이력서
- 접힘 ↔ 펼침으로 뷰포트가 바뀌어도 현재 프레임과 스크롤 위치 유지

## 프레임별 반응형

### 경력 타임라인 (컨테이너 쿼리)

프레임 안쪽 폭(프레임 폭 - gutter×2) 기준. 전환 기준: **768px**.

| 컨테이너 조건                 | 레이아웃                                 |
| ----------------------------- | ---------------------------------------- |
| `@container (width >= 768px)` | 회사 레인(60%) + 사이드 레인(40%) 나란히 |
| `@container (width < 768px)`  | 한 레인, 상단에 레인 라벨                |

### 여백 메모 (컨테이너 쿼리)

메모는 본문의 특정 텍스트에 연결됩니다. 연결된 텍스트는 점선 밑줄 등으로 표시합니다.

전환 기준: **컨테이너 832px** = `--layout-prose-min`(560) + gap(32) + `--layout-note-width`(240).

| 컨테이너 조건                 | 표시 방식                                               |
| ----------------------------- | ------------------------------------------------------- |
| `@container (width >= 832px)` | 본문 오른쪽에 항상 표시                                 |
| `@container (width < 832px)`  | 숨김. 연결 텍스트를 누르면 해당 문단 바로 아래에 펼쳐짐 |

**넓은 프레임 (832px 이상):**

- 메모 폭 240px 고정(`--layout-note-width`), 간격 32px
- 본문은 560~720px 사이에서 유동 (`--layout-prose-min` ~ `--layout-prose-max`)
- 메모나 연결 텍스트에 hover/focus 시 서로 강조
- 본문이 최대 폭(720px)에 도달한 뒤 남는 공간은 바깥 여백. 본문+메모 묶음은 가운데 정렬

**좁은 프레임 (832px 미만):**

- 메모는 숨김. 연결 텍스트를 누르면 해당 문단 바로 아래에 인라인 블록으로 펼쳐짐 (팝오버 아님)
- 좁은 프레임에서는 연결 텍스트 표시를 더 분명하게 (밑줄 두께, 색상 강조)
- 연결 텍스트는 `<button>`으로 구현하고 `aria-expanded`, `aria-controls`로 상태 전달
- 문장 속 인라인 텍스트라 44px 터치 영역 규칙의 예외이지만, 줄 간격(`--line-height-relaxed: 1.75`)으로 오터치를 방지

## 입력 방식 분기

너비와 별개로 입력 방식에 따라 분기합니다.

### hover

```css
@media (hover: hover) {
  .card:hover { ... }
}
```

hover로만 볼 수 있는 정보를 두지 않습니다. hover로 보여주는 내용은 focus나 다른 방법으로도 접근 가능해야 합니다.

### 터치 영역

- 기본 최소 크기: **44×44px** (Apple HIG, WCAG 2.5.5)
- 보이는 크기가 작아도 패딩이나 가상 요소(`::before`, `::after`)로 터치 영역을 넓힙니다.
- 공간이 불가피하게 부족한 경우에도 **24×24px** 이상 + 인접 요소와 간격 확보 (WCAG 2.5.8)

```css
.iconButton {
  position: relative;
}

.iconButton::before {
  content: '';
  position: absolute;
  inset: -8px;
}
```

### 복합 입력

태블릿 + 마우스, 터치스크린 노트북처럼 너비와 입력 방식이 엇갈리는 조합을 고려합니다.

```css
@media (pointer: coarse) {
  .target {
    min-height: 44px;
    min-width: 44px;
  }
}
```

## 이미지

`next/image`의 `sizes` 값을 브레이크포인트와 맞춰서 모바일에서 불필요하게 큰 이미지를 받지 않도록 합니다.

```tsx
<Image
  src={src}
  alt={alt}
  sizes="(width >= 1024px) 720px, (width >= 768px) 80vw, 100vw"
  fill
/>
```

- `sizes`의 브레이크포인트는 이 문서의 브레이크포인트와 일치시킵니다.
- 프로젝트 카드 썸네일처럼 작게 쓰이는 이미지는 최대 크기를 명시합니다.

## 개발 도구

`src/components/dev/ViewportIndicator.tsx`는 개발 모드에서만 화면 좌하단에 현재 뷰포트 너비×높이, 비율, 브레이크포인트 이름을 표시합니다. 프로덕션 빌드에는 포함되지 않습니다.
