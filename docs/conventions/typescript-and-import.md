# TypeScript & Import

## 컴파일러 설정

- `strict: true`, `noUncheckedIndexedAccess: true`를 켭니다.
- 경로 별칭은 `@/*` → `src/*` 하나만 씁니다.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

## 타입 규칙

- `any`를 쓰지 않습니다. 모르는 값은 `unknown`으로 받고 좁혀서 씁니다.
- non-null assertion(`!`)은 쓰지 않습니다. 불가피하면 이유를 주석으로 남깁니다.
- 객체 형태와 Props는 `interface`, 유니온·조합은 `type`을 씁니다.
- TypeScript `enum` 대신 `as const` 객체와 파생 유니온 타입을 씁니다.
- 설정 객체처럼 형태 검사와 리터럴 추론이 모두 필요하면 `satisfies`를 씁니다.

```ts
export const STREAM_STATUS = {
  IDLE: 'idle',
  STREAMING: 'streaming',
  DONE: 'done',
  ERROR: 'error',
} as const;

export type StreamStatus = (typeof STREAM_STATUS)[keyof typeof STREAM_STATUS];
```

## 타입 위치

| 상황 | 위치 |
| --- | --- |
| 한 컴포넌트에서만 쓰는 타입 | 해당 컴포넌트 파일 |
| 한 feature 안에서 공유 | `features/{feature}/_lib/types.ts` |
| 외부 API 요청·응답 (snake_case) | `lib/api/{domain}/{domain}Dto.ts` |
| 화면에서 쓰는 모델 (camelCase) | 사용하는 feature 또는 `src/types/` |
| 여러 곳에서 공유 | `src/types/` |

### DTO와 UI 모델 분리

외부 API 응답은 DTO 그대로 컴포넌트에 넘기지 않고, mapper로 camelCase UI 모델로 바꿔서 씁니다.

```ts
// lib/api/project/projectDto.ts
export interface ProjectResponse {
  project_id: number;
  like_count: number;
}

// lib/api/project/projectMapper.ts
export const toProject = (dto: ProjectResponse): Project => ({
  id: dto.project_id,
  likeCount: dto.like_count,
});
```

## Import 순서

그룹 사이는 한 줄 띄웁니다. 타입만 가져올 때는 `import type`을 씁니다.

```ts
// 1. React, Next.js
import { useState } from 'react';
import Link from 'next/link';

// 2. 외부 라이브러리
import { motion } from 'motion/react';

// 3. 전역 컴포넌트
import { Button } from '@/components/ui/Button';

// 4. features, lib, types
import { formatDate } from '@/lib/format/date';
import type { Project } from '@/types/project';

// 5. 로컬 (상대 경로)
import { useCardPress } from './_hooks/useCardPress';

// 6. 스타일 (항상 마지막)
import styles from './ProjectCard.module.css';
```

스타일을 마지막에 두는 이유는 CSS 적용 순서가 import 순서를 따르기 때문입니다. 하위 컴포넌트 스타일보다 현재 컴포넌트 스타일이 뒤에 오도록 합니다.
