export const headingVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.5,
    },
  },
}

export const pgVariants = {
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
