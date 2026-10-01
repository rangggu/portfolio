# Project Structure

## 기술 스택

| 항목      | 기술                                                                                  |
| --------- | ------------------------------------------------------------------------------------- |
| Framework | Next.js App Router                                                                    |
| UI        | React 19 + React Compiler                                                             |
| Language  | TypeScript (strict)                                                                   |
| Styling   | CSS Modules + CSS 변수 토큰                                                           |
| Motion    | CSS (`linear()`, scroll-driven animations, View Transitions) 기본, 필요한 곳만 Motion |
| Content   | MDX + Shiki (빌드 타임 하이라이팅)                                                    |
| Test      | Vitest, Playwright, @axe-core/playwright, Lighthouse CI                               |
| Deploy    | Vercel                                                                                |

## 디렉토리 구조

```
CLAUDE.md
docs/conventions/            # 컨벤션 문서
content/                     # MDX 케이스 스터디
e2e/                         # Playwright 테스트
src/
  ├── app/                   # 라우트 (조합만 담당)
  │   ├── layout.tsx         # 캔버스 공유 레이아웃, 플로팅 UI
  │   ├── page.tsx           # 첫 화면 (/)
  │   ├── about/page.tsx
  │   ├── career/page.tsx
  │   ├── projects/
  │   │   ├── page.tsx       # 프로젝트 목록 프레임 (/projects)
  │   │   └── [slug]/page.tsx  # 케이스 스터디 (직접 접근 시 단독 페이지)
  │   ├── skills/page.tsx
  │   ├── education/page.tsx
  │   ├── contact/page.tsx
  │   ├── @modal/            # Intercepting Routes 모달 슬롯 (Phase 3~4)
  │   │   ├── (.)projects/[slug]/page.tsx
  │   │   └── default.tsx
  │   └── api/               # Route Handler (Phase 3~4)
  │
  ├── components/
  │   ├── ui/                # 디자인 시스템 기초 컴포넌트 (도메인 무관)
  │   │   └── Button/
  │   │       ├── Button.tsx
  │   │       ├── Button.module.css
  │   │       └── index.ts
  │   ├── layout/            # Header, Footer, TableOfContents
  │   └── mdx/               # CodeBlock, Callout, Figure
  │
  ├── features/              # 기능 단위 코드
  │   ├── actions/           # 사이트 액션 레지스트리 (Phase 3~4)
  │   └── {feature}/         # 예: command-palette, streaming-demo
  │       ├── {Feature}.tsx
  │       ├── {Feature}.module.css
  │       ├── actions.ts     # Server Actions
  │       ├── _components/
  │       ├── _shared/       # 이 feature 안 여러 곳에서 공유
  │       ├── _hooks/
  │       ├── _lib/          # 이 feature 전용 유틸·상수
  │       └── _state/        # 이 feature 전용 클라이언트 상태 (필요할 때만)
  │
  ├── lib/                   # 전역 순수 로직 (Vitest 대상)
  │   ├── api/{domain}/      # 외부 API 연동 (서버 전용)
  │   └── {기능명}/          # 예: format/, physics/, motion/
  │
  ├── styles/
  │   ├── tokens.css         # 디자인 토큰 (primitive → semantic)
  │   ├── typography.module.css
  │   └── globals.css
  │
  └── types/                 # 여러 곳에서 공유하는 타입만
```

## 핵심 원칙

### `_` 접두사 = 내부 전용

`_components`, `_hooks`, `_lib`, `_state`, `_shared`는 부모 폴더 밖에서 import하지 않습니다. App Router도 `_` 폴더를 라우팅에서 제외하므로 `app/` 안에서도 같은 규칙을 씁니다.

### 컴포넌트 승격 단계

한 곳에서만 쓰는 것은 옆에 두고, 사용처가 늘어날 때 한 단계씩 올립니다.

| 사용 범위                 | 위치                                                        |
| ------------------------- | ----------------------------------------------------------- |
| 부모 컴포넌트 1개         | 부모 폴더의 `_components/` (재귀 중첩 가능, 깊이 제한 없음) |
| 같은 feature의 여러 곳    | `features/{feature}/_shared/`                               |
| 여러 feature, 도메인 무관 | `components/ui/`                                            |

### 사이트 액션 레지스트리 (`features/actions/`)

프로젝트 열기, 테마 전환, 이메일 복사, 이력서 다운로드 등 사이트 전역에서 실행할 수 있는 액션을 하나의 레지스트리로 관리합니다. Cmd+K 커맨드 팔레트와 AI 에이전트 도구가 같은 레지스트리를 공유합니다. 구현은 Phase 3~4에서 진행합니다.

### 캔버스 라우트 구조

7개 프레임 라우트(`/`, `/about`, `/career`, `/projects`, `/skills`, `/education`, `/contact`)는 같은 캔버스 레이아웃(`layout.tsx`)을 공유하고, 초기 프레임만 다르게 시작합니다. 모두 정적 생성됩니다.

`/projects`(프레임)와 `/projects/[slug]`(케이스 스터디)의 공존:

- `/projects`는 프로젝트 목록 프레임으로 캔버스 안에 표시됩니다.
- `/projects/[slug]`에 직접 접근하면 단독 페이지로 표시됩니다.
- 프로젝트 목록 프레임에서 케이스 스터디를 열면 `@modal` Intercepting Routes로 모달 형태로 표시됩니다 (Phase 3~4).

### page.tsx는 조합만

`page.tsx`와 `layout.tsx`는 서버에서 데이터를 불러오고 컴포넌트를 조합하는 역할만 합니다. 로직은 `features/`나 `lib/`에 둡니다.

### 데이터 흐름

```
외부 API 응답 (snake_case)
  → lib/api/{domain}/{domain}Api.ts   (서버 전용 fetch)
    → lib/api/{domain}/{domain}Mapper.ts   (camelCase UI 모델로 변환)
      → page.tsx / 서버 컴포넌트
        → props로 클라이언트 컴포넌트에 전달
```
