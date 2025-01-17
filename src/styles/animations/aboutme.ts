export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8, // 초기 크기
  },
  visible: {
    opacity: 1,
    scale: 1, // 정상 크기
    transition: {
      opacity: { duration: 0.5 },
      y: { type: "spring", stiffness: 120, damping: 20 },
      scale: { type: "spring", stiffness: 120, damping: 20 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8, // 작아지는 크기
    transition: {
      opacity: { duration: 0.3 },
      y: { type: "spring", stiffness: 120, damping: 20 },
      scale: { type: "spring", stiffness: 120, damping: 20 },
    },
  },
}
