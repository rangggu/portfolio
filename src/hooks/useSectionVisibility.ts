import { useState, useEffect } from "react"
import { useSectionsContext } from "@/contexts/SectionContext"
import { TAB } from "@/types"

export const useSectionVisibility = (sectionId: TAB, threshold = 0.5): boolean => {
  const { sectionsRef } = useSectionsContext()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    const section = sectionsRef.current.find((section) => section?.id === sectionId)
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [sectionsRef, sectionId, threshold, isVisible])

  return isVisible // 섹션 표시 여부 반환
}
