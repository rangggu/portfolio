/**
 * Lighthouse CI 결과 요약. 프리셋별 결과 폴더의 lhr-*.json에서 URL·카테고리별 중앙값을 내고,
 * links.json(임시 공개 저장소 리포트 링크)이 있으면 함께 마크다운 표로 출력한다.
 *
 * 사용법: node scripts/lhci-summary.mjs mobile=lhci-results/mobile desktop=lhci-results/desktop
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const CATEGORIES = [
  ['performance', 'Performance'],
  ['accessibility', 'Accessibility'],
  ['best-practices', 'Best Practices'],
  ['seo', 'SEO'],
];

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return null;
  }
}

async function summarize(dir) {
  const files = (await readdir(dir)).filter((file) =>
    /^lhr-.*\.json$/.test(file),
  );
  const byUrl = new Map();
  for (const file of files) {
    const lhr = await readJson(path.join(dir, file));
    if (!lhr) continue;
    const url = new URL(lhr.requestedUrl).pathname;
    const runs = byUrl.get(url) ?? [];
    runs.push(lhr);
    byUrl.set(url, runs);
  }
  const links = (await readJson(path.join(dir, 'links.json'))) ?? {};
  return [...byUrl.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([url, runs]) => ({
      url,
      runs: runs.length,
      scores: Object.fromEntries(
        CATEGORIES.map(([id]) => [
          id,
          Math.round(
            median(runs.map((lhr) => lhr.categories[id]?.score ?? 0)) * 100,
          ),
        ]),
      ),
      report: Object.entries(links).find(
        ([key]) => new URL(key).pathname === url,
      )?.[1],
    }));
}

const sections = [];
for (const arg of process.argv.slice(2)) {
  const [preset, dir] = arg.split('=');
  const rows = await summarize(dir);
  const header = `| URL | ${CATEGORIES.map(([, label]) => label).join(' | ')} | 리포트 |`;
  const divider = `| --- | ${CATEGORIES.map(() => '---:').join(' | ')} | --- |`;
  const lines = rows.map(
    (row) =>
      `| \`${row.url}\` | ${CATEGORIES.map(([id]) => row.scores[id]).join(' | ')} | ${
        row.report ? `[보기](${row.report})` : '-'
      } |`,
  );
  sections.push(
    [
      `### ${preset} (각 ${rows[0]?.runs ?? 0}회 중앙값)`,
      '',
      header,
      divider,
      ...lines,
    ].join('\n'),
  );
}

console.log(sections.join('\n\n'));
