# Naming

## 파일명

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| React 컴포넌트 | PascalCase, 같은 이름의 폴더 안 | `Button/Button.tsx` |
| 컴포넌트 스타일 | `{Component}.module.css` | `Button.module.css` |
| 배럴 | `index.ts` (컴포넌트 폴더에만) | `Button/index.ts` |
| 커스텀 훅 | `use` + camelCase | `useScrollDirection.ts` |
| 유틸 | 기능명 camelCase, `utils` 접미사 지양 | `format.ts`, `spring.ts` |
| Server Actions | 고정명 | `actions.ts` |
| API 연동 | `{domain}Api.ts`, `{domain}Dto.ts`, `{domain}Mapper.ts` | `projectApi.ts` |
| 클라이언트 스토어 | camelCase + `State` | `paletteState.ts` |
| 단위 테스트 | 대상 파일 옆 `*.test.ts` | `spring.test.ts` |
| E2E 테스트 | `e2e/*.spec.ts` | `e2e/project-modal.spec.ts` |

## 디렉토리명

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 컴포넌트 폴더 | PascalCase | `BottomSheet/` |
| feature, 라우트, lib 폴더 | kebab-case | `command-palette/`, `streaming-demo/` |
| 내부 전용 | `_` 접두사 | `_components/`, `_hooks/` |
| Route Group | 괄호 | `(site)/` |

## 컴포넌트

| 접미사 | 역할 | 예시 |
| --- | --- | --- |
| `*Section` | 페이지의 주요 섹션 | `HeroSection`, `ProjectListSection` |
| (없음) | 일반 컴포넌트 | `ProjectCard`, `ThemeToggle` |

## CSS Modules

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 클래스명 | camelCase, 루트 요소는 `.root` | `.root`, `.title`, `.iconWrapper` |
| variant | `data-variant` | `data-variant="ghost"` |
| 크기 | `data-size` | `data-size="sm"` |
| 상태 | 네이티브 속성·ARIA 우선, 없으면 `data-state` | `:disabled`, `[aria-expanded='true']`, `data-state="open"` |

## 변수·함수

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 이벤트 핸들러 (내부) | `handle*` | `handleCopy` |
| 이벤트 핸들러 (props) | `on*` | `onClose` |
| boolean | `is*`, `has*`, `should*`, `can*` | `isOpen`, `shouldReduceMotion` |
| Mapper 함수 | `to*` | `toProjectList()` |
| Fetch 함수 | `get*`, `post*` | `getProjects()` |
| 유틸 함수 | 동사로 시작 | `formatDate()`, `calcVelocity()` |
| 상수 | SCREAMING_SNAKE_CASE | `MAX_RETRY_COUNT` |
| enum 대용 객체 | SCREAMING_SNAKE_CASE + `as const` | `STREAM_STATUS.DONE` |

## 타입

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 일반 타입 | PascalCase, `I` 접두사 금지 | `Project`, `StreamEvent` |
| Props | `{Component}Props` | `ButtonProps` |
| API 응답·요청 | `*Response`, `*Request` | `ProjectListResponse` |

## 디자인 토큰

`--{카테고리}-{이름}` 형식입니다. semantic 색상은 `--color-{도메인}-{의미}`, 수치형 토큰은 px 값을 이름에 씁니다.

| 예시 | 설명 |
| --- | --- |
| `--color-text-primary` | semantic 색상 |
| `--color-gray-500` | primitive 색상 |
| `--spacing-16`, `--radius-12`, `--font-size-14` | 수치형 |
| `--motion-press-scale` | 애니메이션별 토큰 |
