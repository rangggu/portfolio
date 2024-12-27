import { useMemo } from "react"
import { useSectionVisibility } from "@/hooks/useSectionVisibility"
import { TAB } from "@/types"

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
