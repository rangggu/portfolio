import type { DesignToken } from '@/lib/design-tokens/parseTokens';
import { TokenPreview } from '../TokenPreview/TokenPreview';
import styles from './TokenTable.module.css';

interface TokenTableProps {
  /** 표 이름 (보조기기용, 가로 스크롤 영역 이름) */
  label: string;
  tokens: DesignToken[];
}

/**
 * 토큰 표: 이름 · 견본 · 값(라이트/다크/조건부) · 메모.
 * 좁은 화면에서는 표가 가로로 밀린다. 스크롤 영역은 키보드로도 밀 수 있게 포커스를 받는다.
 */
export function TokenTable({ label, tokens }: TokenTableProps) {
  const hasDark = tokens.some((token) => token.dark);
  const hasOverride = tokens.some((token) => token.overrides.length > 0);

  return (
    <div
      className={styles.scroll}
      role="region"
      aria-label={label}
      // 가로로 넘치는 표를 키보드로 밀 수 있게 스크롤 영역이 포커스를 받는다 (axe scrollable-region-focusable)
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.headCell}>
              토큰
            </th>
            <th scope="col" className={styles.headCell}>
              견본
            </th>
            <th scope="col" className={styles.headCell}>
              {hasDark ? '라이트' : '값'}
            </th>
            {hasDark && (
              <th scope="col" className={styles.headCell}>
                다크
              </th>
            )}
            {hasOverride && (
              <th scope="col" className={styles.headCell}>
                조건부
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name}>
              <th scope="row" className={styles.name}>
                <code>{token.name}</code>
                {token.note && (
                  <span className={styles.note}>{token.note}</span>
                )}
              </th>
              <td className={styles.preview}>
                <TokenPreview name={token.name} />
              </td>
              <td className={styles.valueCell}>
                <code className={styles.value}>{token.light}</code>
              </td>
              {hasDark && (
                <td className={styles.valueCell}>
                  {token.dark && (
                    <code className={styles.value}>{token.dark}</code>
                  )}
                </td>
              )}
              {hasOverride && (
                <td className={styles.valueCell}>
                  {token.overrides.map((override) => (
                    <span key={override.condition} className={styles.override}>
                      <span className={styles.condition}>
                        {override.condition}
                      </span>
                      <code className={styles.value}>{override.value}</code>
                    </span>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
