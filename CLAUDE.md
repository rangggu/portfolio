# CLAUDE.md

개인 포트폴리오 사이트 프로젝트입니다. 코드를 작성하거나 수정하기 전에 이 파일과, 작업과 관련된 `docs/conventions/` 문서를 먼저 읽습니다.

## 기술 스택

Next.js App Router, React 19, TypeScript(strict), React Compiler, CSS Modules + CSS 변수 토큰, MDX + Shiki, Motion(필요한 곳만), Vitest, Playwright, axe, Lighthouse CI, Vercel

## 명령어

```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run lint         # ESLint + Stylelint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest
npm run check:responsive  # 기기 매트릭스 반응형 검사 (서버 실행 후)
npm run screenshot        # 1512×823·393×852(터치) 라이트·다크 스크린샷 (서버 실행 후)
```

## 반드시 지킬 규칙

1. **스타일 값은 토큰만 사용합니다.** 색상, 간격, 폰트, 라운드, 그림자, 모션, z-index는 `src/styles/tokens.css`의 변수를 씁니다. 맞는 토큰이 없으면 하드코딩하지 말고 토큰 추가를 먼저 제안합니다.
2. **컴포넌트에서는 semantic 토큰을 우선합니다.** primitive 토큰(`--color-gray-500` 등)은 `tokens.css` 안에서만 참조합니다.
3. **서버 컴포넌트가 기본입니다.** `'use client'`는 상호작용이 필요한 가장 작은 단위에만 붙입니다.
4. **variant는 `data-*` 속성으로 표현합니다.** 클래스 조합 헬퍼(clsx 등)에 의존하지 않습니다.
5. **모든 모션은 모션 토큰을 쓰고 `prefers-reduced-motion`을 지원합니다.**
6. **`components/ui`에는 비즈니스 로직을 넣지 않습니다.** props만으로 동작해야 합니다.
7. **`_` 접두사 폴더는 부모 밖에서 import하지 않습니다.**
8. **접근성 기본기를 지킵니다.** 네이티브 요소 우선, 모달은 `<dialog>`, 포커스 링 제거 금지.
9. **새 라이브러리 추가 전에 먼저 확인을 요청합니다.** 기준: 흔한 기능은 라이브러리, 감각을 보여주는 기능은 직접 구현.
10. **`src/lib`의 순수 로직을 추가·수정하면 Vitest 테스트를 함께 작성합니다.**

## 기획 문서

| 문서                       | 내용                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| [product](docs/product.md) | 컨셉, 섹션 구성, 타임라인, 프로젝트 글 구조, 문체, 공개 금지 정보 |

## 컨벤션 문서

| 문서                                                               | 내용                                                     |
| ------------------------------------------------------------------ | -------------------------------------------------------- |
| [project-structure](docs/conventions/project-structure.md)         | 디렉토리 구조, 배치 원칙, 데이터 흐름                    |
| [naming](docs/conventions/naming.md)                               | 파일, 폴더, 변수, 타입, 토큰 네이밍                      |
| [component-patterns](docs/conventions/component-patterns.md)       | 컴포넌트 선언, 훅, 서버/클라이언트 경계, 접근성          |
| [styling](docs/conventions/styling.md)                             | 토큰 우선 규칙, CSS Modules, 모션, 반응형, 다크 모드     |
| [design-tokens](docs/conventions/design-tokens.md)                 | 토큰 카탈로그 (값의 원천은 `src/styles/tokens.css`)      |
| [typescript-and-import](docs/conventions/typescript-and-import.md) | 타입 규칙, 경로 별칭, import 순서                        |
| [data-and-rendering](docs/conventions/data-and-rendering.md)       | 렌더링 전략, 데이터 연동, 상태, 에러 처리                |
| [code-quality](docs/conventions/code-quality.md)                   | 린트, 포맷, 커밋, 테스트, PR 체크리스트                  |
| [seo](docs/conventions/seo.md)                                     | 메타데이터, OG 이미지, JSON-LD, sitemap, 검색 인증       |
| [responsive](docs/conventions/responsive.md)                       | 브레이크포인트, 기기 매트릭스, 입력 방식, 폴더블, 이미지 |

## 작업 방식

- 화면이나 콘텐츠 작업 전에는 `docs/product.md`를 먼저 읽습니다.
- 작업 전에 관련 문서를 읽고, 문서와 기존 코드가 다르면 문서를 기준으로 하되 차이를 알려줍니다.
- 컨벤션을 바꾸는 작업이면 해당 문서도 같은 커밋에서 수정합니다.
- 새 토큰이나 새 z-index 계층을 추가하면 `design-tokens.md`도 함께 갱신합니다.
