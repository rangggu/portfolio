# Code Quality

## Prettier

```json
// .prettierrc.json
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80
}
```

## ESLint

ESLint 9 flat config(`eslint.config.mjs`)를 사용합니다. `eslint-config-next`가 flat config 배열을 직접 export하므로 `FlatCompat` 없이 import합니다.

- **base:** `eslint-config-next` (core-web-vitals + typescript 포함)
- **jsx-a11y:** `eslint-config-next`에 플러그인이 번들되어 있으므로, recommended rules 전체를 rules로 병합
- **@typescript-eslint/strict:** 플러그인 스코프 충돌을 피하기 위해 프리셋의 rules만 추출하여 병합

| 규칙                                         | 설정                         |
| -------------------------------------------- | ---------------------------- |
| `@typescript-eslint/strict` 프리셋 rules     | 28개 전체 적용               |
| `@typescript-eslint/no-explicit-any`         | error                        |
| `@typescript-eslint/no-unused-vars`          | error (`_` 접두사 예외)      |
| `@typescript-eslint/consistent-type-imports` | error                        |
| `jsx-a11y/*`                                 | recommended 전체 (34개 규칙) |

품질을 보여주는 프로젝트라 주요 규칙은 끄지 않습니다.

## Stylelint

`stylelint-config-standard`와 `stylelint-config-css-modules`를 확장합니다. 토큰 우선 규칙을 도구로 지킵니다.

- `color-no-hex`, `color-named: never` — `tokens.css` 외 파일에서 색상 하드코딩 금지
- `stylelint-declaration-strict-value` — 아래 속성은 `var()`만 허용:
  `color`, `background-color`, `border-color`, `outline-color`, `fill`, `z-index`, `transition-duration`, `transition-timing-function`, `animation-duration`, `animation-timing-function`, `box-shadow`
- `stylelint-config-css-modules` — `composes`, `:global` 허용, CSS Modules camelCase 클래스명 허용
- `tokens.css`, `globals.css`는 위 규칙의 예외로 둡니다.

## Git Hooks

- pre-commit: lint-staged로 변경 파일에 Prettier, ESLint, Stylelint 실행
- pre-push: `typecheck` 실행

## 커밋 메시지

```
<Type>: <Subject>
```

| Type     | 용도                |
| -------- | ------------------- |
| Feature  | 새 기능             |
| Fix      | 버그 수정           |
| Refactor | 리팩토링            |
| Style    | 스타일, 토큰 변경   |
| Test     | 테스트 추가·수정    |
| Chore    | 설정, 의존성, 빌드  |
| Docs     | 문서 (컨벤션 포함)  |
| Rename   | 파일·폴더 이름 변경 |

- Type은 영어 그대로, Subject는 한글로 작성
- Subject는 50자 이내, 마침표 없음
- 예시: `Chore: Next.js 16 및 React Compiler 세팅`

## 테스트

| 대상                   | 도구                 | 위치                     |
| ---------------------- | -------------------- | ------------------------ |
| `src/lib`의 순수 로직  | Vitest               | 대상 파일 옆 `*.test.ts` |
| 사용자 흐름, 시각 회귀 | Playwright           | `e2e/*.spec.ts`          |
| 접근성                 | @axe-core/playwright | 주요 페이지 E2E 안에서   |
| 성능                   | Lighthouse CI        | CI                       |

- 커버리지 수치를 목표로 두지 않습니다. 로직이 있는 곳을 테스트합니다.
- 요소 탐색 우선순위: `getByRole` > `getByText` > `getByTestId`
- 컴포넌트 테스트가 필요하면 `userEvent`를 씁니다 (`fireEvent` 지양).
- 시각 회귀 스냅샷은 라이트·다크, 모바일·데스크톱 조합으로 찍습니다.

## CI

PR마다 아래가 모두 통과해야 합니다.

1. lint (ESLint + Stylelint)
2. typecheck
3. Vitest
4. Playwright (시각 회귀 + axe)
5. Lighthouse CI

### Lighthouse CI (`.github/workflows/lighthouse.yml`)

- 기존 CI(`ci.yml`)와 별도 워크플로로 돌립니다. 설정은 `lighthouserc.cjs`입니다.
- `SHOW_DRAFTS=true`로 빌드해 초안 샘플 글까지 포함한 뒤 `next start`로 띄워 측정합니다. 이 변수는 측정 전용이며 배포 빌드에는 쓰지 않습니다.
- 대상: 홈, 프로젝트 글 페이지. 모바일·데스크톱 프리셋을 각각 3회 실행해 중앙값으로 판정합니다.
- 기준: performance·accessibility·best-practices·seo 각 0.9 미만이면 실패, accessibility는 1.0 미만이면 경고.
- 리포트는 임시 공개 저장소(며칠 뒤 만료)에 올리고, PR에는 점수표와 리포트 링크를 댓글로 남깁니다(같은 댓글을 갱신). 원본 결과는 워크플로 아티팩트로 보관합니다.
- 프리셋은 `LIGHTHOUSE_FORM_FACTOR`로 고릅니다. `LHCI_`로 시작하는 환경 변수는 lhci가 자기 옵션으로 읽으므로 쓰지 않습니다.

## PR 체크리스트

- [ ] 하드코딩된 스타일 값이 없고 semantic 토큰을 썼다
- [ ] 새 토큰을 추가했다면 `design-tokens.md`를 갱신했다
- [ ] 모션이 reduced motion 설정에서 자연스럽게 대체된다
- [ ] 키보드만으로 사용할 수 있다
- [ ] 라이트·다크 모드에서 모두 확인했다
- [ ] `'use client'` 범위가 최소한이다
