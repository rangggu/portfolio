import { useMemo } from "react"

export const useAnimation = (isVisible: boolean, variants: any) => {
  return useMemo(
    () => ({
      variants,
      initial: "initial",
      animate: isVisible ? "animate" : "initial",
    }),
    [isVisible, variants],
  )
}
