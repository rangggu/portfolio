/**
 * 기준 기기 매트릭스
 * Phase 4 Playwright 테스트와 docs/conventions/responsive.md에서 같은 목록을 사용한다.
 * CSS viewport 값(논리 픽셀). 태블릿은 세로·가로를 모두 둔다.
 *
 * 출처:
 * - Apple: https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/
 * - iOS Resolution: https://www.ios-resolution.com/
 * - YesViz: https://yesviz.com/viewport/
 */

export interface Device {
  name: string;
  category:
    | 'phone-small'
    | 'phone'
    | 'phone-large'
    | 'foldable-cover'
    | 'foldable-inner'
    | 'tablet'
    | 'laptop'
    | 'desktop'
    | 'ultrawide';
  width: number;
  height: number;
  note?: string;
}

export const DEVICES = [
  // --- 폰 ---
  { name: 'iPhone SE 3', category: 'phone-small', width: 375, height: 667 },
  { name: 'iPhone 15', category: 'phone', width: 393, height: 852 },
  { name: 'Galaxy S24', category: 'phone', width: 360, height: 780 },
  {
    name: 'iPhone 16 Pro Max',
    category: 'phone-large',
    width: 440,
    height: 956,
  },
  {
    name: 'Galaxy S24 Ultra',
    category: 'phone-large',
    width: 412,
    height: 891,
  },

  // --- 폴더블 ---
  {
    name: 'Galaxy Z Fold 6 (cover)',
    category: 'foldable-cover',
    width: 360,
    height: 879,
    note: 'TODO: 브라우저 보고 값 미확인, 실기기 검증 필요',
  },
  {
    name: 'Galaxy Z Fold 6 (inner)',
    category: 'foldable-inner',
    width: 928,
    height: 1080,
    note: 'TODO: 물리 해상도 / DPR 추정값, 실기기 검증 필요',
  },
  {
    name: 'Galaxy Z Flip 6',
    category: 'phone',
    width: 412,
    height: 1005,
    note: 'TODO: 추정값, 실기기 검증 필요',
  },
  {
    name: 'iPhone Fold',
    category: 'foldable-inner',
    width: 0,
    height: 0,
    note: 'TODO: 2026년 9월 기준 미출시',
  },

  // --- 태블릿 ---
  {
    name: 'iPad mini 7 (portrait)',
    category: 'tablet',
    width: 744,
    height: 1133,
  },
  {
    name: 'iPad Air 11" (portrait)',
    category: 'tablet',
    width: 820,
    height: 1180,
  },
  {
    name: 'iPad Pro 11" (portrait)',
    category: 'tablet',
    width: 834,
    height: 1194,
  },
  {
    name: 'iPad Pro 13" (portrait)',
    category: 'tablet',
    width: 1024,
    height: 1366,
  },
  {
    name: 'iPad mini 7 (landscape)',
    category: 'tablet',
    width: 1133,
    height: 744,
  },
  {
    name: 'iPad Air 11" (landscape)',
    category: 'tablet',
    width: 1180,
    height: 820,
  },
  {
    name: 'iPad Pro 11" (landscape)',
    category: 'tablet',
    width: 1194,
    height: 834,
  },
  {
    name: 'iPad Pro 13" (landscape)',
    category: 'tablet',
    width: 1366,
    height: 1024,
  },

  // --- 랩톱·데스크톱 ---
  { name: 'Laptop (small)', category: 'laptop', width: 1280, height: 800 },
  { name: 'Laptop (medium)', category: 'laptop', width: 1440, height: 900 },
  { name: 'Desktop (FHD)', category: 'desktop', width: 1920, height: 1080 },
  {
    name: 'Ultrawide (UWQHD)',
    category: 'ultrawide',
    width: 2560,
    height: 1080,
  },
] as const satisfies ReadonlyArray<Device>;
