import { toast } from '@/components/ui/Toast/toastStore';

/**
 * 연락처 프레임과 오른쪽 위 더보기가 함께 쓰는 동작.
 * 결과는 토스트로 알린다 (Toaster가 role="status"로 보조기기에도 읽힌다).
 */

/** 글자를 클립보드에 복사한다. 클립보드를 쓸 수 없으면 값을 그대로 보여 준다. 성공 여부를 돌려준다 */
export async function copyText(text: string, name: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    toast(`${name}를 복사했어요`, { tone: 'success' });
    return true;
  } catch {
    toast(`복사하지 못했어요. ${text}`, { tone: 'danger' });
    return false;
  }
}

/** 이메일 주소 복사 */
export function copyEmail(email: string) {
  return copyText(email, '이메일 주소');
}

/** 이력서 인쇄. 인쇄 스타일에서 캔버스 대신 이력서가 찍힌다 (docs/product.md 「인쇄」) */
export function printResume() {
  window.print();
}
