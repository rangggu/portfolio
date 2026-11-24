import type { DesignTokenGroup } from '@/lib/design-tokens/parseTokens';

/**
 * tokens.css 그룹 제목 → 문서 섹션 (보여 줄 순서·제목·설명).
 * 컴포넌트가 실제로 쓰는 semantic 토큰을 먼저 둔다. 여기 없는 새 그룹은 맨 뒤에 원래 제목으로 붙는다.
 */
interface TokenSectionInfo {
  id: string;
  title: string;
  description: string;
}

const SECTIONS: Record<string, TokenSectionInfo> = {
  'Semantic: Light (기본)': {
    id: 'tokens-semantic',
    title: '의미 토큰 (색·그림자·그라데이션)',
    description:
      '컴포넌트는 이 토큰만 씁니다. 다크 열은 [data-theme="dark"]에서 바뀌는 값이고, 견본은 지금 테마로 그려집니다.',
  },
  'Primitive: Color': {
    id: 'tokens-color',
    title: '원시 색',
    description:
      '의미 토큰이 참조하는 팔레트입니다. 컴포넌트에서 직접 쓰지 않습니다.',
  },
  'Primitive: Typography': {
    id: 'tokens-typography',
    title: '타이포그래피',
    description:
      '글꼴·크기·굵기·줄 높이·자간. 컴포넌트는 이 값을 직접 쓰지 않고 아래 텍스트 스타일을 씁니다.',
  },
  'Fluid: 360px → 1280px 선형 보간': {
    id: 'tokens-fluid',
    title: '유동 크기',
    description: '화면 폭 360px에서 1280px 사이를 선형으로 잇는 크기입니다.',
  },
  'Primitive: Spacing / Radius / Border': {
    id: 'tokens-spacing',
    title: '간격·라운드·테두리',
    description: '여백, 모서리, 선 두께, 포커스 링, 흐림, 비활성 불투명도.',
  },
  Layout: {
    id: 'tokens-layout',
    title: '레이아웃',
    description:
      '페이지·본문 폭, 캔버스 프레임 간격, 터치 영역, 플로팅 UI 높이. 조건부 열은 터치 기기 등에서 바뀌는 값입니다.',
  },
  'Motion: 기본': {
    id: 'tokens-motion',
    title: '모션: 시간·곡선',
    description:
      '줄에 마우스를 올리면 견본이 그 시간·곡선으로 움직입니다 (움직임 줄이기에서는 움직이지 않습니다).',
  },
  'Motion: 애니메이션별': {
    id: 'tokens-motion-usage',
    title: '모션: 애니메이션별',
    description:
      '누름, hover, 대화상자, 시트, 토스트 등 쓰임새별 값. 조건부 열은 움직임 줄이기에서 바뀌는 값입니다.',
  },
  'z-index': {
    id: 'tokens-z-index',
    title: '쌓임 순서 (z-index)',
    description:
      '<dialog>와 popover는 맨 위 레이어(top layer)에 뜨므로 z-index를 쓰지 않습니다.',
  },
};

export interface TokenSection extends TokenSectionInfo {
  group: DesignTokenGroup;
}

export function toTokenSections(groups: DesignTokenGroup[]): TokenSection[] {
  const order = Object.keys(SECTIONS);
  const known = order.flatMap((title) => {
    const group = groups.find((item) => item.title === title);
    const info = SECTIONS[title];
    return group && info ? [{ ...info, group }] : [];
  });
  const unknown = groups
    .filter((group) => !order.includes(group.title))
    .map((group, index) => ({
      id: `tokens-extra-${index + 1}`,
      title: group.title,
      description: '',
      group,
    }));
  return [...known, ...unknown];
}
