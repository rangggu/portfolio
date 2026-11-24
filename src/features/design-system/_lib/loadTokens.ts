import 'server-only';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  parseTokens,
  type DesignTokenGroup,
} from '@/lib/design-tokens/parseTokens';

/** tokens.css를 읽어 파싱한다. 페이지가 정적 생성이라 빌드 때 한 번 읽는다 */
export function loadTokens(): DesignTokenGroup[] {
  const css = readFileSync(
    path.join(process.cwd(), 'src/styles/tokens.css'),
    'utf8',
  );
  return parseTokens(css);
}
