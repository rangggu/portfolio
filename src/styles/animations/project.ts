export const modalVariants = {
  hidden: { opacity: 0, y: 200 }, // 초기 위치 (스크롤 위치 아래쪽)
  visible: {
    opacity: 1,
    y: 0, // 애니메이션이 끝난 위치 (정상 위치)
    transition: {
      opacity: { duration: 0.5 },
      y: { type: "spring", stiffness: 120, damping: 20 }, // 부드러운 spring 애니메이션
    },
  },
  exit: {
    opacity: 0,
    y: 200, // 모달이 닫히면 내려가는 위치
    transition: {
      opacity: { duration: 0.3 },
      y: { type: "spring", stiffness: 120, damping: 20 },
    },
  },
}
