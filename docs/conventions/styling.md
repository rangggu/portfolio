# Styling

## 토큰 우선 원칙

스타일 값을 정할 때는 아래 순서를 따릅니다.

1. **semantic 토큰** (`--color-text-primary`, `--color-bg-subtle` 등)을 먼저 찾습니다.
2. 맞는 semantic 토큰이 없으면 **토큰 추가를 먼저 제안**합니다. primitive 토큰을 컴포넌트에서 바로 참조하지 않습니다.
3. **하드코딩은 금지**입니다. 색상, 간격, 폰트 크기, 라운드, 그림자, duration, easing, z-index 모두 해당합니다.

토큰 없이 써도 되는 값: `0`, `100%`, `auto`, `1fr`, `currentColor`, `inherit`, 레이아웃용 `%`·`fr`·`vw`·`vh`

### 토큰 도메인과 CSS 속성

| 토큰               | 적용 속성                                |
| ------------------ | ---------------------------------------- |
| `--color-text-*`   | `color`                                  |
| `--color-bg-*`     | `background`, `background-color`, `fill` |
| `--color-border-*` | `border-color`, `outline-color`          |
| `--gradient-*`     | `background-image`                       |
| `--shadow-*`       | `box-shadow`                             |

도메인이 맞지 않는 토큰을 빌려 쓰지 않습니다. 예를 들어 텍스트 색에 `--color-bg-*`를 쓰지 않습니다.

### var() fallback 생략

`var(--color-text-primary, #191f28)`처럼 fallback 값을 같이 쓰지 않습니다. 토큰은 전역으로 로드되므로 필요 없고, fallback 값이 실제 토큰과 어긋날 위험만 생깁니다.

## CSS Modules 규칙

- 컴포넌트 하나에 `{Component}.module.css` 하나를 둡니다.
- 루트 요소 클래스는 `.root`로 통일합니다.
- variant, size는 `data-*` 속성 선택자로 분기합니다.
- 상태는 네이티브 의사 클래스와 ARIA 속성을 먼저 씁니다 (`:disabled`, `:focus-visible`, `[aria-expanded='true']`). 없을 때만 `data-state`를 씁니다.
- 비활성 상태는 `opacity: var(--opacity-disabled)` 하나로 통일합니다. 색을 따로 바꾸지 않고, 비활성 전용 색 토큰도 만들지 않습니다.
- `:global`은 `globals.css`에서만 씁니다.
- 네이티브 CSS 중첩은 2단계까지만 씁니다.
- `transition: all`을 쓰지 않고 속성을 명시합니다.
- **예외 — size별 텍스트 스타일:** `composes`는 단순 클래스 선택자에서만 쓸 수 있어 `[data-size]` 안에서 텍스트 스타일을 가져올 수 없습니다. size에 따라 텍스트 스타일이 달라질 때만 size별 클래스(`.sizeMd`, `.sizeSm`)를 두고 `composes`로 base와 텍스트 스타일만 가져옵니다. 높이·패딩·라운드 등 나머지는 `[data-size]` 선택자로 처리합니다. (예: `Button`)
- **예외 — `src/app/dev/`:** 확인용 임시 페이지라 inline style 금지 등 스타일 규칙을 적용하지 않습니다.

```css
/* Button.module.css */
.root {
  padding: var(--spacing-12) var(--spacing-20);
  border-radius: var(--radius-12);
  background-color: var(--color-bg-accent);
  color: var(--color-text-on-accent);
  transition: transform var(--motion-release-duration)
    var(--motion-release-ease);

  &:active {
    transform: scale(var(--motion-press-scale));
    transition-duration: var(--motion-press-duration);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--color-border-focus);
    outline-offset: var(--focus-ring-offset);
  }
}

.root[data-variant='ghost'] {
  background-color: transparent;
  color: var(--color-text-primary);
}
```

### 런타임 값 전달

JS에서 계산한 값은 inline style의 CSS 변수로 넘기고, CSS에서 `var()`로 받습니다. 스타일 속성 자체를 inline으로 쓰지 않습니다.

```tsx
<div
  className={styles.bar}
  style={{ '--progress': progress } as CSSProperties}
/>
```

```css
.bar {
  transform: scaleX(var(--progress));
}
```

## 타이포그래피

- 컴포넌트에서 `--font-size-*` 토큰을 직접 쓰지 않습니다. 크기 토큰을 참조하는 곳은 `typography.module.css` 하나뿐이어야 합니다.
- `Text`, `Heading` 컴포넌트를 쓰거나, `typography.module.css`의 텍스트 스타일을 `composes`로 가져옵니다.
- `font-size: inherit`, `1em`처럼 부모 크기를 따르는 경우만 예외입니다.
- 새 크기가 필요하면 토큰을 직접 쓰지 말고 텍스트 스타일을 추가한 뒤 `design-tokens.md`에 기록합니다.
- 굵기만 다른 변형(`bodyMdBold` 등)은 만들지 않습니다. 본문 속 강조는 `<strong>`에 전역 스타일로 처리합니다.

```css
.title {
  composes: headingMd from '@/styles/typography.module.css';
  color: var(--color-text-primary);
}
```

## 모션

- duration과 easing은 모션 토큰만 씁니다. 애니메이션별 토큰(`--motion-*`)이 있으면 그것을 우선합니다.
- 애니메이션은 `transform`과 `opacity` 위주로 만듭니다.
- reduced motion은 토큰 재정의로 한 곳에서 처리합니다 (`tokens.css` 참고). 컴포넌트에서 개별로 분기하지 않습니다.
- Motion 라이브러리를 쓰는 곳은 `src/lib/motion/`의 상수를 쓰고, `useReducedMotion`으로 분기합니다. 상수 값은 CSS 토큰과 맞춥니다.

## z-index

- `--z-*` 토큰만 씁니다. 임의 숫자를 쓰지 않습니다.
- 네이티브 `<dialog>`는 top layer에 뜨므로 z-index 대상이 아닙니다.
- 새 계층이 필요하면 `design-tokens.md`의 z-index 표를 먼저 갱신합니다.

## 반응형

브레이크포인트, 기기 매트릭스, 입력 방식 분기, 섹션별 규칙 등 반응형 전체 규칙은 [responsive.md](responsive.md)를 참고합니다.

## 다크 모드

- semantic 토큰만 쓰면 테마 전환은 자동입니다.
- 컴포넌트 CSS에서 `[data-theme='dark']` 선택자를 쓰지 않습니다. 필요하면 semantic 토큰을 추가합니다.
- `data-theme`은 `<html>`에 붙입니다.
