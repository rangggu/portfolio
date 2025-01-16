import { useEffect, useRef } from "react"
import { TAB } from "@/types"

interface SectionsType {
  id: string
  component: React.ElementType
}

export function useFullPageScroll(
  modal: number,
  tab: TAB,
  setTab: (value: TAB) => void,
  sections: SectionsType[],
  scrollToSection: (sectionId: TAB) => void,
) {
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 모달이 열려 있다면 풀페이지 스크롤 중단
      if (modal > 0) {
        return
      }

      event.preventDefault()

      // 연속 스크롤 방지
      if (isScrollingRef.current) return
      isScrollingRef.current = true

      setTimeout(() => {
        isScrollingRef.current = false
      }, 800)

      const currentIndex = sections.findIndex((sec) => sec.id === tab)
      if (currentIndex === -1) return

      // 아래로 스크롤
      if (event.deltaY > 0) {
        const nextIndex = currentIndex + 1
        if (nextIndex < sections.length) {
          const nextTab = sections[nextIndex].id as TAB
          setTab(nextTab)
          scrollToSection(nextTab)
        }
      } else {
        // 위로 스크롤
        const prevIndex = currentIndex - 1
        if (prevIndex >= 0) {
          const prevTab = sections[prevIndex].id as TAB
          setTab(prevTab)
          scrollToSection(prevTab)
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [modal, tab, setTab, sections, scrollToSection])
}
