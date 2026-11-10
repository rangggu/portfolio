/**
 * 기기 매트릭스(src/lib/devices.ts)의 각 폭에서 홈을 열어
 * 가로 스크롤, 잘린 요소, 첫 화면 가림 여부, 프레임·안쪽 폭, 경력 레인 수를 검사하고 전체 페이지 스크린샷을 남긴다.
 * 매트릭스에 더해 폰 가로 모드, 짧은 랩톱, 브라우저 200% 확대(CSS 뷰포트를 절반으로 줄여 재현)도 검사한다.
 * Phase 4에서 Playwright 테스트(e2e/)로 옮길 예정인 임시 검사 스크립트.
 *
 * 사용법: npm run build && npm start 로 서버를 띄운 뒤
 *   npm run check:responsive
 *   BASE_URL=http://localhost:3123 npm run check:responsive
 *
 * 스크린샷: test-results/responsive/
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { DEVICES } from '../src/lib/devices.ts';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const OUT_DIR = 'test-results/responsive';

/** 매트릭스 밖 점검: 최소 지원 폭, 짧은 랩톱 (responsive.md 너비 외 분기) */
const EXTRA = [
  { name: 'Minimum (320)', category: 'phone-small', width: 320, height: 640 },
  { name: 'Laptop (short)', category: 'laptop', width: 1280, height: 680 },
];

/** 마우스(pointer: fine)로 보는 분류. 나머지는 터치로 흉내 낸다 */
const FINE_CATEGORIES = new Set(['laptop', 'desktop', 'ultrawide']);

/** 가로 모드로도 검사할 분류 */
const LANDSCAPE_CATEGORIES = new Set([
  'phone-small',
  'phone',
  'phone-large',
  'foldable-cover',
]);

/** 200% 확대로도 검사할 분류 (확대하면 CSS 뷰포트가 절반이 된다) */
const ZOOM_CATEGORIES = new Set(['laptop', 'desktop']);

function withVariants(devices) {
  const landscape = devices
    .filter((device) => LANDSCAPE_CATEGORIES.has(device.category))
    .map((device) => ({
      ...device,
      name: `${device.name} (landscape)`,
      width: device.height,
      height: device.width,
    }));
  const zoomed = devices
    .filter((device) => ZOOM_CATEGORIES.has(device.category))
    .map((device) => ({
      ...device,
      name: `${device.name} @200%`,
      width: device.width / 2,
      height: device.height / 2,
    }));

  return [...devices, ...landscape, ...zoomed];
}

function toFileName(device) {
  return `${device.width}x${device.height}-${device.name.replace(/[^\w]+/g, '_')}.png`;
}

async function measure(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const career = document.getElementById('career');
    const container = career.querySelector('[data-width]');
    const containerStyle = getComputedStyle(container);
    const inner =
      container.clientWidth -
      parseFloat(containerStyle.paddingLeft) -
      parseFloat(containerStyle.paddingRight);
    const lanes = career.querySelector(
      '[role="group"][data-lane="company"]',
    ).parentElement;

    // 잘림: 내용을 숨기는(hidden·clip) 요소에서 내용이 넘친 경우 (1px 시각적 숨김 요소는 제외).
    // auto·scroll은 사용자가 밀어서 볼 수 있으므로 잘림이 아니다 (예: 메뉴 바 가로 스크롤)
    const hides = (value) => value === 'hidden' || value === 'clip';
    const clipped = [...document.querySelectorAll('body *')].filter((el) => {
      const style = getComputedStyle(el);
      if (!hides(style.overflowX) && !hides(style.overflowY)) {
        return false;
      }
      if (el.clientWidth <= 1 || el.clientHeight <= 1) return false;
      return (
        el.scrollWidth > el.clientWidth + 1 ||
        el.scrollHeight > el.clientHeight + 1
      );
    });

    // 첫 화면 가림: 첫 화면 텍스트 요소의 중심을 다른 요소가 덮고 있는지
    const heroTexts = [
      ...document.querySelectorAll('#hero h1, #hero p, #hero a'),
    ];
    const covered = heroTexts.filter((el) => {
      // globals.css의 smooth 스크롤이 걸리면 이동 중에 측정되므로 즉시 이동한다
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
      const rect = el.getBoundingClientRect();
      const hit = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      return hit && !el.contains(hit) && !hit.contains(el);
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
    const h1 = document.querySelector('#hero h1').getBoundingClientRect();

    return {
      coarse: matchMedia('(pointer: coarse)').matches,
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      clipped: clipped.length,
      covered: covered.length,
      h1Visible: h1.top >= 0 && h1.bottom <= innerHeight,
      frame: Math.round(career.getBoundingClientRect().width),
      inner: Math.round(inner),
      lanes: getComputedStyle(lanes).gridTemplateColumns.split(' ').length,
    };
  });
}

function mark(ok, detail = '') {
  return ok ? '✅' : `❌${detail}`;
}

async function main() {
  const devices = withVariants(
    [...EXTRA, ...DEVICES].filter((device) => device.width > 0),
  );

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
  const rows = [];

  for (const device of devices) {
    const touch = !FINE_CATEGORIES.has(device.category);
    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      hasTouch: touch,
      isMobile: touch,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    const result = await measure(page);
    await page.screenshot({
      path: `${OUT_DIR}/${toFileName(device)}`,
      fullPage: true,
    });
    await context.close();

    rows.push({
      기기: device.name,
      뷰포트: `${device.width}×${device.height}`,
      입력: result.coarse ? 'coarse' : 'fine',
      가로스크롤: mark(
        result.scrollWidth <= result.clientWidth,
        ` ${result.scrollWidth}/${result.clientWidth}`,
      ),
      잘림: mark(result.clipped === 0, ` ${result.clipped}`),
      첫화면가림: mark(result.covered === 0, ` ${result.covered}`),
      h1보임: mark(result.h1Visible),
      프레임: result.frame,
      안쪽: result.inner,
      경력: result.lanes === 2 ? '두 레인' : '한 레인',
    });
  }

  await browser.close();
  console.table(rows);

  const checks = ['가로스크롤', '잘림', '첫화면가림', 'h1보임'];
  const failed = rows.filter((row) => checks.some((key) => row[key] !== '✅'));
  if (failed.length > 0) {
    console.error(`실패: ${failed.map((row) => row.기기).join(', ')}`);
    process.exit(1);
  }
}

await main();
