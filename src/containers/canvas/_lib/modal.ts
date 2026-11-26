/** 이벤트 대상이 열린 모달(<dialog>) 안인지. 캔버스 입력 처리기가 모달 안 휠·키를 가로채지 않게 쓴다 */
export function isInsideOpenModal(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest('dialog[open]') !== null;
}
