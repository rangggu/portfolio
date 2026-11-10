/**
 * 작업 확인용 스크린샷. 데스크톱(마우스)·폰(터치) 두 뷰포트를 라이트·다크로 찍는다.
 * 첫 화면(뷰포트)과 전체 페이지를 각각 남긴다.
 * Phase 4에서 Playwright 시각 회귀 테스트(e2e/)가 생기면 그쪽으로 옮길 예정인 임시 스크립트.
 *
 * 사용법: npm run build && npm start 로 서버를 띄운 뒤
 *   npm run screenshot
 *   SCREENSHOT_PATHS=/,/career npm run screenshot
 *   BASE_URL=http://localhost:3123 npm run screenshot
 *
 * 스크린샷: test-results/screenshots/
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT_DIR = 'test-results/screenshots';
const PATHS = (process.env.SCREENSHOT_PATHS ?? '/')
  .split(',')
  .map((path) => path.trim())
  .filter(Boolean);

const VIEWPORTS = [
  { name: 'desktop', width: 1512, height: 823, touch: false },
  { name: 'phone', width: 393, height: 852, touch: true },
];

const THEMES = ['light', 'dark'];

function toSlug(path) {
  return path === '/'
    ? 'home'
    : path.replace(/^\/|\/$/g, '').replace(/\//g, '_');
}

async function main() {
  try {
    await fetch(BASE_URL);
  } catch {
    console.error(
      `서버에 연결할 수 없습니다: ${BASE_URL} (npm run build && npm start)`,
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const saved = [];

  for (const viewport of VIEWPORTS) {
    for (const theme of THEMES) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        hasTouch: viewport.touch,
        isMobile: viewport.touch,
        deviceScaleFactor: 1,
        colorScheme: theme,
        reducedMotion: 'no-preference',
      });
      const page = await context.newPage();

      for (const path of PATHS) {
        await page.goto(new URL(path, BASE_URL).href, {
          waitUntil: 'networkidle',
        });
        const base = `${OUT_DIR}/${toSlug(path)}-${viewport.width}x${viewport.height}-${theme}`;
        await page.screenshot({ path: `${base}.png` });
        await page.screenshot({ path: `${base}-full.png`, fullPage: true });
        saved.push(`${base}.png`, `${base}-full.png`);
      }

      await context.close();
    }
  }

  await browser.close();
  console.log(saved.join('\n'));
}

await main();
