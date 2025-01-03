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

export const bounceVariants = {
  initial: { y: 0 },
  animate: {
    y: ["-10px", "10px", "-10px"],
    transition: {
      y: {
        duration: 1.3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  },
}
