/**
 * 폰트 서브셋 글자를 모을 파일 (프로젝트 루트 기준 글롭). 스크립트(yarn fonts)와 누락 테스트가 함께 쓴다.
 * 테스트 파일은 화면에 나오지 않으므로 뺀다.
 */
export const GLYPH_SOURCE_PATTERNS = {
  script: ['content/**/*.ts', 'src/**/*.ts', 'src/**/*.tsx'],
  mdx: ['content/**/*.mdx'],
} as const;

export const GLYPH_SOURCE_EXCLUDE = /\.test\.tsx?$/;

/**
 * 소스 문자열에 없어도 화면에 나올 수 있는 글자.
 * ASCII 인쇄 문자 전체(입력·주소·코드)와 런타임 날짜 표기(toLocaleDateString('ko-KR'))의 단위
 */
export const ALWAYS_INCLUDED_TEXT =
  Array.from({ length: 0x7e - 0x20 + 1 }, (_, index) =>
    String.fromCharCode(0x20 + index),
  ).join('') + '년월일';

/** 서브셋 결과 위치 (프로젝트 루트 기준) */
export const SUBSET_FONT_PATH = 'src/styles/fonts/pretendard-subset.woff2';
export const SUBSET_GLYPHS_PATH = 'src/styles/fonts/pretendard-subset.txt';
