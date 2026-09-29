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

`next/core-web-vitals`, `@typescript-eslint/strict`, `jsx-a11y`를 기반으로 합니다. 품질을 보여주는 프로젝트라 주요 규칙은 끄지 않습니다.

| 규칙 | 설정 |
| --- | --- |
| `@typescript-eslint/no-explicit-any` | error |
| `@typescript-eslint/no-unused-vars` | error (`_` 접두사 예외) |
| `@typescript-eslint/consistent-type-imports` | error |
| `jsx-a11y/*` | recommended |

## Stylelint

토큰 우선 규칙을 사람이 아니라 도구로 지키게 합니다.

- `color-no-hex`, `color-named: never` — `tokens.css` 외 파일에서 색상 하드코딩 금지
- `stylelint-declaration-strict-value` — `color`, `background-color`, `z-index`, `transition-duration` 등은 `var()`만 허용
- `tokens.css`, `globals.css`는 예외로 둡니다.

## Git Hooks

- pre-commit: lint-staged로 변경 파일에 Prettier, ESLint, Stylelint 실행
- pre-push: `typecheck` 실행

## 커밋 메시지

```
<Type>: <Subject>
```

| Type | 용도 |
| --- | --- |
| Feature | 새 기능 |
| Fix | 버그 수정 |
| Refactor | 리팩토링 |
| Style | 스타일, 토큰 변경 |
| Test | 테스트 추가·수정 |
| Chore | 설정, 의존성, 빌드 |
| Docs | 문서 (컨벤션 포함) |
| Rename | 파일·폴더 이름 변경 |

- Type은 영어 그대로, Subject는 한글로 작성
- Subject는 50자 이내, 마침표 없음
- 예시: `Chore: Next.js 16 및 React Compiler 세팅`

## 테스트

| 대상 | 도구 | 위치 |
| --- | --- | --- |
| `src/lib`의 순수 로직 | Vitest | 대상 파일 옆 `*.test.ts` |
| 사용자 흐름, 시각 회귀 | Playwright | `e2e/*.spec.ts` |
| 접근성 | @axe-core/playwright | 주요 페이지 E2E 안에서 |
| 성능 | Lighthouse CI | CI |

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

## PR 체크리스트

- [ ] 하드코딩된 스타일 값이 없고 semantic 토큰을 썼다
- [ ] 새 토큰을 추가했다면 `design-tokens.md`를 갱신했다
- [ ] 모션이 reduced motion 설정에서 자연스럽게 대체된다
- [ ] 키보드만으로 사용할 수 있다
- [ ] 라이트·다크 모드에서 모두 확인했다
- [ ] `'use client'` 범위가 최소한이다
