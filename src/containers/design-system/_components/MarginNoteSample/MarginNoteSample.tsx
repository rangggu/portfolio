import { MarginNote } from '@/components/ui/MarginNote/MarginNote';
import { MarginNoteAnchor } from '@/components/ui/MarginNote/MarginNoteAnchor';
import { MarginNoteGroup } from '@/components/ui/MarginNote/MarginNoteGroup';
import { Prose } from '@/components/ui/Prose/Prose';

/** 여백 메모 예시: 연결 텍스트와 메모가 이어지는 문단 하나 */
export function MarginNoteSample() {
  return (
    <Prose>
      <MarginNoteGroup>
        <p>
          연결 텍스트는{' '}
          <MarginNoteAnchor note="ds-why">왜 그렇게 했는지</MarginNoteAnchor>를
          짧게 적은 메모와 이어집니다.
        </p>
        <MarginNote id="ds-why">
          넓은 영역에서는 본문 오른쪽에 항상 보이고, 좁으면 눌렀을 때 문단
          아래에 펼쳐집니다.
        </MarginNote>
      </MarginNoteGroup>
    </Prose>
  );
}
