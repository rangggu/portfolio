import { Heading } from '@/components/ui/Heading/Heading';
import { Text } from '@/components/ui/Text/Text';
import styles from './ComponentDoc.module.css';

export interface ComponentDocData {
  id: string;
  /** 컴포넌트 이름 (import 이름) */
  name: string;
  /** 한 줄 설명 */
  summary: string;
  /** 주요 props: [이름, 설명] */
  props: [string, string][];
  /** 접근성·사용 메모 */
  notes: string[];
  example: React.ReactNode;
}

/** 컴포넌트 한 개의 문서: 이름·설명, 예시, 주요 props, 메모 */
export function ComponentDoc({
  id,
  name,
  summary,
  props,
  notes,
  example,
}: ComponentDocData) {
  return (
    <section aria-labelledby={`${id}-title`} id={id} className={styles.root}>
      <Heading level={3} variant="headingMd" id={`${id}-title`}>
        {name}
      </Heading>
      <Text tone="secondary">{summary}</Text>
      <div className={styles.example}>{example}</div>
      {props.length > 0 && (
        <dl className={styles.props}>
          {props.map(([prop, description]) => (
            <div key={prop} className={styles.prop}>
              <dt>
                <code>{prop}</code>
              </dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      )}
      {notes.length > 0 && (
        <ul className={styles.notes}>
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
