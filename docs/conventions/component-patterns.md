# Component Patterns

## 디렉토리별 역할

| 위치                  | 역할                        | 규칙                                              |
| --------------------- | --------------------------- | ------------------------------------------------- |
| `components/ui/`      | 디자인 시스템 기초 컴포넌트 | 도메인 무관, props만으로 동작, 비즈니스 로직 금지 |
| `components/layout/`  | 사이트 공통 레이아웃        | Header, Footer, TableOfContents                   |
| `components/mdx/`     | MDX 본문 전용               | CodeBlock, Callout, Figure                        |
| `features/{feature}/` | 기능 단위                   | 상태, 서버 연동, 로직 포함 가능                   |

## 컴포넌트 선언

- 컴포넌트는 `export function`(named export)으로 선언하고 `index.ts`에서 다시 내보냅니다.
- Next.js가 요구하는 파일(`page.tsx`, `layout.tsx`, `default.tsx`, `error.tsx` 등)만 `export default`를 씁니다.
- Props 타입은 컴포넌트 바로 위에 선언합니다.

```tsx
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const rootClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <button
      className={rootClassName}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}
```

## 컴포넌트 내부 순서

1. Props 구조분해
2. 훅 호출 (관심사별로 여러 개 가능)
3. 파생 값, 상수, 변수
4. 부수 효과
5. 핸들러
6. return JSX

### 파생 값은 return 이전에 정의

JSX 안에서 인라인으로 계산하지 않고 return 전에 `const`로 뺍니다.

```tsx
// Good
const periodText = `${formatDate(project.startedAt)} – ${formatDate(project.endedAt)}`;
const shouldShowDemo = project.hasDemo && !isMobile;

return (
  <article className={styles.root}>
    <p className={styles.period}>{periodText}</p>
    {shouldShowDemo && <DemoLink href={project.demoUrl} />}
  </article>
);

// Bad
return (
  <article className={styles.root}>
    <p>{`${formatDate(project.startedAt)} – ${formatDate(project.endedAt)}`}</p>
    {project.hasDemo && !isMobile && <DemoLink href={project.demoUrl} />}
  </article>
);
```

### 조건부 렌더링

- 단순 조건은 `&&`를 씁니다.
- 조건이 두 개 이상 섞이면 `should*` 변수로 추출합니다.
- 숫자를 `&&` 앞에 두지 않습니다 (`0`이 렌더링됨). `count > 0 &&`처럼 boolean으로 만듭니다.

## ui 컴포넌트 규칙

- 네이티브 요소의 props를 확장하고 `...props`로 전달합니다.
- `ref`는 React 19 방식대로 일반 prop으로 받습니다 (`forwardRef` 사용 안 함).
  - 예외: `as`로 렌더링 태그를 바꾸는 `Text`, `Stack`, `Container`는 `ref`를 받지 않습니다. 태그마다 ref 요소 타입이 달라 하나의 타입으로 안전하게 표현할 수 없기 때문입니다. ref가 필요하면 네이티브 요소를 직접 쓰거나 감싸는 요소에 겁니다.
- `className`은 바깥 배치(margin, 위치)용으로만 허용하고, 내부 스타일을 덮어쓰는 용도로 쓰지 않습니다.
  - 예외: `Link variant="plain"`은 꾸밈 없는 링크라, 메뉴 항목처럼 링크 자체가 큰 클릭 영역이 될 때 크기·배경을 `className`으로 줍니다 (예: `FrameMenu`).
- variant, size, 상태는 `data-*` 속성으로 표현합니다.
  - 예외: size에 따라 텍스트 스타일이 달라지면 CSS Modules `composes` 제약 때문에 텍스트 스타일만 size별 클래스로 고르고, `data-size`도 함께 붙입니다. 자세한 내용은 [styling](styling.md#css-modules-규칙)을 봅니다.
- IconButton처럼 텍스트가 없는 컴포넌트는 `aria-label`을 필수 prop으로 둡니다.
- 입력 요소(`Input`·`Textarea`)는 `label`이 필수이고, `description`·`error`를 주면 id로 연결(`aria-describedby`, 오류면 `aria-invalid`)합니다. 라벨을 숨겨야 하면 `hideLabel`을 씁니다.
- 상호작용 컴포넌트(`Tabs`, `Tooltip`, `Toaster`, `Dialog`)의 계산·상태 로직은 `src/lib/ui`의 순수 함수로 두고 Vitest로 테스트합니다.
- 컴포넌트 이벤트를 자식이나 비상호작용 요소(`li`, 감싸는 `span`)에 달아야 하면 JSX 핸들러 대신 `useEffect`에서 네이티브 리스너를 답니다 (jsx-a11y 규칙과 React Compiler의 렌더 중 ref 접근 금지 때문).

## 훅 설계

- 하나의 거대한 훅 대신 관심사별로 나눕니다.
- feature 훅은 `{ states, actions }` 형태로 반환합니다.

```tsx
export function useStreamDemo() {
  // ...
  return {
    states: { events, status, isStreaming },
    actions: { handleStart, handleAbort, handleRetry },
  };
}

// 사용
const { states: streamStates, actions: streamActions } = useStreamDemo();
```

## React Compiler

- `useMemo`, `useCallback`, `React.memo`를 기본으로 쓰지 않습니다. 컴파일러가 처리합니다.
- 측정으로 필요성이 확인된 경우에만 쓰고, 이유를 주석으로 남깁니다.

## 서버·클라이언트 경계

- 서버 컴포넌트가 기본이고, `'use client'`는 상호작용이 필요한 가장 작은 컴포넌트에만 붙입니다.
- 데이터는 서버 컴포넌트에서 불러와 props로 내려줍니다.
- 서버 전용 모듈(`lib/api/` 등)은 `import 'server-only'`로 클라이언트 번들 유입을 막습니다.

## 접근성

- 클릭 가능한 요소는 `<button>`과 `<a>`를 씁니다. `div`에 `onClick`을 달지 않습니다.
- 모달은 네이티브 `<dialog>`를 `showModal()`로 엽니다. 가운데 모달은 `Dialog`, 화면 아래 시트는 `BottomSheet`(둘 다 `components/ui/Dialog`)를 씁니다. 컴포넌트 안에서 기기를 나누지 않으므로, 어느 쪽을 쓸지는 쓰는 쪽이 기기에 맞게 고릅니다 (예: 데스크톱 `Dialog`, 폰 `BottomSheet`). 두 컴포넌트는 `open`·`onClose`로 제어하고, Esc·바깥 누르기·닫기 버튼이 모두 `onClose`를 부릅니다. 열린 동안 배경 스크롤은 `globals.css`가 잠급니다. 그 밖에 직접 만드는 오버레이(모바일 메뉴 등)는 열려 있는 동안 배경에 `inert`를 겁니다.
- 짧은 알림은 `toast(message, { tone })`(`components/ui/Toast`)로 띄웁니다. 표시 영역 `Toaster`는 루트 레이아웃에 하나 있고, `aria-live`로 보조기기에 알리며 모달이 열려 있으면 그 안으로 옮겨집니다. 알림에만 있는 정보를 두지 않습니다 (몇 초 뒤 사라짐).
- 보조 설명은 `Tooltip`으로 붙입니다. 자식은 포커스할 수 있는 요소 하나이고 `aria-describedby`로 연결됩니다. 마우스 hover·키보드 포커스·터치 길게 누르기로 보이므로, 꼭 필요한 정보나 버튼 이름을 툴팁에만 두지 않습니다 (아이콘 버튼 이름은 `aria-label`).
- 포커스 링은 `:focus-visible`로 표시하고 절대 `outline: none`만 남기지 않습니다. 기본 링은 `globals.css`의 전역 `:focus-visible` 규칙(포커스 링 토큰)이 그리므로, 컴포넌트는 모양이 달라야 할 때만 재정의합니다.
- 모든 페이지의 `<main>`에는 `id="main"`과 `tabIndex={-1}`을 붙입니다. `layout.tsx`의 본문 바로가기(`SkipLink`)가 이 요소로 포커스를 옮깁니다.
- 프레임은 `<section aria-labelledby="{프레임 제목 id}">`로 제목과 연결합니다. 첫 화면 이름만 `h1`, 나머지 프레임 제목은 `h2`입니다.
- 새 탭으로 열리는 링크는 "(새 탭에서 열림)"을 보조기기에 알립니다 (`Link`가 자동 처리).
- 캔버스의 `header`(왼쪽 위 위치 표시)와 `nav aria-label="프레임 이동"`(하단 메뉴 바)은 플로팅 UI가 맡습니다. 메뉴 바는 화면 아래에 있어도 DOM에서는 `main` 앞에 둬서 키보드로 본문보다 먼저 닿게 합니다. 현재 프레임 항목에 `aria-current="page"`를 붙입니다.
- 아직 동작하지 않는 기능의 버튼은 `disabled` 대신 `aria-disabled="true"`로 포커스는 받게 하고, 「준비 중」을 화면과 보조기기에 함께 알립니다 (`Button`이 `aria-disabled` 스타일을 지원).
- 모든 기능은 키보드만으로 사용할 수 있어야 합니다.
- 이미지는 의미가 있으면 `alt`를 쓰고, 장식이면 `alt=""`를 씁니다.
- 헤딩 순서(h1 → h2 → h3)를 건너뛰지 않습니다.
