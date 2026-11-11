'use client';

import { Button } from '@/components/ui/Button';

/** 이력서 인쇄. 인쇄 스타일에서 캔버스·플로팅 UI·버튼이 빠진다 (docs/product.md 「인쇄」) */
export function PrintButton() {
  const handleClick = () => {
    window.print();
  };

  return (
    <Button variant="secondary" type="button" onClick={handleClick}>
      이력서 인쇄
    </Button>
  );
}
