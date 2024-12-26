import { useEffect } from "react"
import { useSectionsContext } from "@/contexts/SectionContext"
import { TAB } from "@/types"

export const useScrollObserver = (updateUrl: (sectionId: TAB, newUrl: string) => void) => {
  const { sectionsRef } = useSectionsContext() // Context에서 sectionsRef 가져오기

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

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [sectionsRef, updateUrl])
}
