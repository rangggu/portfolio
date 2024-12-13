import { TAB } from "@/types"
import { useEffect } from "react"

export const useScrollObserver = (
  sectionsRef: (HTMLDivElement | null)[],
  updateUrl: (sectionId: TAB, newUrl: string) => void,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as TAB
            const newUrl = sectionId === TAB.MAIN ? "/" : `/${sectionId}`
            updateUrl(sectionId, newUrl)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    )

    sectionsRef.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [sectionsRef, updateUrl])
}
