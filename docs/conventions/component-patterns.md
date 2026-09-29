# Component Patterns

## 디렉토리별 역할

| 위치 | 역할 | 규칙 |
| --- | --- | --- |
| `components/ui/` | 디자인 시스템 기초 컴포넌트 | 도메인 무관, props만으로 동작, 비즈니스 로직 금지 |
| `components/layout/` | 사이트 공통 레이아웃 | Header, Footer, TableOfContents |
| `components/mdx/` | MDX 본문 전용 | CodeBlock, Callout, Figure |
| `features/{feature}/` | 기능 단위 | 상태, 서버 연동, 로직 포함 가능 |

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
- `className`은 바깥 배치(margin, 위치)용으로만 허용하고, 내부 스타일을 덮어쓰는 용도로 쓰지 않습니다.
- variant, size, 상태는 `data-*` 속성으로 표현합니다.
- IconButton처럼 텍스트가 없는 컴포넌트는 `aria-label`을 필수 prop으로 둡니다.

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
- 모달은 네이티브 `<dialog>`를 `showModal()`로 엽니다. 직접 만드는 오버레이(바텀시트, 모바일 메뉴)는 열려 있는 동안 배경에 `inert`를 겁니다.
- 포커스 링은 `:focus-visible`로 표시하고 절대 `outline: none`만 남기지 않습니다.
- 모든 기능은 키보드만으로 사용할 수 있어야 합니다.
- 이미지는 의미가 있으면 `alt`를 쓰고, 장식이면 `alt=""`를 씁니다.
- 헤딩 순서(h1 → h2 → h3)를 건너뛰지 않습니다.
