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
      staggerChildren: 1,
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
      backgroundColor: { duration: 0.5, delay: 1.6 },
      staggerChildren: 0.4,
      delayChildren: 1.6,
    },
  },
}

export const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const moreButtonVariants = (delay = 0) => {
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
