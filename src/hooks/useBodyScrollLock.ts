import { useEffect } from "react"

export function useBodyScrollLock(isModalOpen: boolean) {
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isModalOpen])
}
