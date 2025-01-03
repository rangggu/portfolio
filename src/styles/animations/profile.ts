export const infoVariants = {
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

export const descVariants = {
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
