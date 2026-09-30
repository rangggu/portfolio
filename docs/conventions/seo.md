# SEO

## 사이트 정보 원천

사이트 이름, URL, 설명, 인물 정보 등 SEO에 사용하는 값은 `src/lib/site.ts`에 모아둡니다. 이력서 데이터 연동 시 이 파일로 통합됩니다.

## 메타데이터

`app/layout.tsx`에서 `metadata` export로 기본값을 설정합니다.

| 항목                  | 값                                    |
| --------------------- | ------------------------------------- |
| metadataBase          | `https://www.lily-developer.me`       |
| title 기본값          | `김규리 · 프론트엔드 개발자`          |
| title 템플릿          | `%s · 김규리`                         |
| description           | 포트폴리오 소개 (site.ts 참조)        |
| openGraph description | `작은 불편을 그냥 지나치지 않습니다.` |
| openGraph type        | `website`                             |
| locale                | `ko_KR`                               |
| twitter card          | `summary_large_image`                 |

- 하위 페이지는 `metadata` export에서 `title`만 지정하면 템플릿이 적용됩니다.
- `alternates.canonical`은 각 페이지 경로 기준으로 설정합니다.

## viewport & theme-color

`viewport` export에서 라이트/다크별 `theme-color`를 설정합니다. 값은 `tokens.css`의 `--color-bg-base`와 일치시킵니다.

| 모드  | 색상                 |
| ----- | -------------------- |
| light | `#ffffff` (gray-0)   |
| dark  | `#111316` (gray-950) |

## 아이콘

Next.js 파일 규칙을 사용합니다.

| 파일                 | 용도                             |
| -------------------- | -------------------------------- |
| `app/icon.svg`       | 브라우저 파비콘                  |
| `app/apple-icon.tsx` | Apple Touch Icon (ImageResponse) |

디자인 확정 후 정적 파일로 교체합니다.

## OG 이미지

`app/opengraph-image.tsx`에서 `next/og`의 `ImageResponse`로 생성합니다. Phase 2에서 프로젝트별 OG 이미지를 추가할 예정입니다.

## sitemap & robots

| 파일             | 설명                                                 |
| ---------------- | ---------------------------------------------------- |
| `app/sitemap.ts` | 홈 + 프로젝트 경로. content/ 목록 기반으로 확장 예정 |
| `app/robots.ts`  | 전체 허용, sitemap 경로 명시                         |

## JSON-LD

루트 레이아웃에 `Person`과 `WebSite` 스키마를 삽입합니다. `src/components/seo/JsonLd.tsx` 컴포넌트를 사용하며, 값은 `src/lib/site.ts`에서 가져옵니다.

- Person: 이름, jobTitle, description, url, sameAs
- WebSite: name, url
- 페이지별 구조화 데이터(Article 등)가 필요하면 같은 JsonLd 컴포넌트를 재사용합니다.

## 검색 엔진 인증

`metadata.verification`에 Google Search Console과 네이버 서치어드바이저 인증 코드 자리를 TODO로 남겨둡니다. 인증 코드를 받으면 채웁니다.
