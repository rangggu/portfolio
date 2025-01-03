export const headingVariants = (dalay = 0) => {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delay: dalay },
    },
  }
}
