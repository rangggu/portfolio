import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // AI 에이전트 안에서 next dev를 띄울 때 CLAUDE.md에 Next.js 안내 블록을 자동으로 붙이는 동작을 끈다.
  // 이 레포는 CLAUDE.md와 docs/conventions/로 규칙을 직접 관리한다.
  agentRules: false,
};

export default nextConfig;
