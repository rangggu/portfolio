export const labelVariants = {
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
