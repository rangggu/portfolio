/**
 * Lighthouse CI 설정. LIGHTHOUSE_FORM_FACTOR=mobile | desktop 으로 프리셋을 고른다 (기본 mobile).
 * LHCI_로 시작하는 환경 변수는 lhci가 자기 옵션으로 읽으므로 쓰지 않는다.
 * 측정 대상: 홈 + 샘플 프로젝트 글 (초안이라 SHOW_DRAFTS=true로 빌드한 서버에서만 존재)
 * 각 URL을 3회 실행하고 중앙값으로 판정한다.
 */
const preset = process.env.LIGHTHOUSE_FORM_FACTOR === 'desktop' ? 'desktop' : 'mobile';
const PORT = 9001;

/** 0.9 미만이면 실패 */
const FLOOR = { minScore: 0.9, aggregationMethod: 'median' };

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npm run start -- --port ${PORT}`,
      startServerReadyPattern: 'Ready',
      url: [
        `http://localhost:${PORT}/`,
        `http://localhost:${PORT}/projects/bitlight`,
        `http://localhost:${PORT}/projects/superposition`,
      ],
      numberOfRuns: 3,
      settings: {
        ...(preset === 'desktop' && { preset: 'desktop' }),
        // CI 러너에서 Chrome을 띄우기 위한 옵션
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      // 같은 URL에 두 묶음을 모두 적용한다: 0.9 미만은 실패, 접근성은 1.0 미만이면 경고
      assertMatrix: [
        {
          matchingUrlPattern: '.*',
          assertions: {
            'categories:performance': ['error', FLOOR],
            'categories:accessibility': ['error', FLOOR],
            'categories:best-practices': ['error', FLOOR],
            'categories:seo': ['error', FLOOR],
          },
        },
        {
          matchingUrlPattern: '.*',
          assertions: {
            'categories:accessibility': [
              'warn',
              { minScore: 1, aggregationMethod: 'median' },
            ],
          },
        },
      ],
    },
    upload: {
      // 리포트를 임시 공개 저장소에 올린다 (며칠 뒤 만료). 링크는 .lighthouseci/links.json
      target: 'temporary-public-storage',
    },
  },
};
