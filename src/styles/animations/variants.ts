export const mainHeadingVariants = (dalay = 0) => {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: dalay },
    },
  }
}

export const prologueHeadingVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
}

export const prologuePgVariants = {
  initial: { opacity: 0, backgroundColor: "rgba(0, 0, 0, 0)" },
  animate: {
    opacity: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    transition: {
      opacity: { duration: 0.5 },
      backgroundColor: { duration: 0.2, delay: 1.2 },
      staggerChildren: 0.2,
      delayChildren: 1,
    },
  },
}

export const profileInfoVariants = {
  initial: { opacity: 0, x: -40, y: 0 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      opacity: { duration: 0.5 },
    },
  },
}

export const profileDescVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.5 },
      staggerChildren: 0.5,
      delayChildren: 0.7,
    },
  },
}

export const skillLabelVariants = {
  initial: { opacity: 0, x: -15 },
  animate: { opacity: 1, x: 0 },
}

export const skillVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.4 },
      staggerChildren: 0.2,
    },
  },
}

export const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const buttonVariants = (delay = 0) => {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        opacity: { delay: delay },
      },
    },
  }
}

export const bottomButtonVariants = {
  initial: { y: 0 },
  animate: {
    y: ["-10px", "10px", "-10px"], // 바운스 효과
    transition: {
      y: {
        duration: 1.3, // 애니메이션 전체 시간
        repeat: Infinity, // 무한 반복
        repeatType: "loop", // 반복되는 애니메이션 방식
        ease: "easeInOut", // 애니메이션의 easing 효과
      },
    },
  },
}
