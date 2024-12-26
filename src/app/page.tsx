"use client"

import { useEffect, useRef, useState } from "react"
import { useScrollObserver } from "@/hooks/useScrollObserver"
import Main from "@/components/main/Main"
import Prologue from "@/components/prologue/Prologue"
import Background from "@/components/_common/Background"
import Header from "@/components/_common/Header"
import { TAB } from "@/types"
import Profile from "@/components/profile/Profile"
import { useSectionsContext } from "@/contexts/SectionContext"

const sections = [
  { id: "main", component: Main },
  { id: "prologue", component: Prologue },
  { id: "profile", component: Profile },
]

export default function Page() {
  const [tab, setTab] = useState<TAB>(TAB.MAIN)
  const { sectionsRef, scrollToSection } = useSectionsContext()

  // @NOTE: 리다이렉트시 기존 section으로 스크롤
  useEffect(() => {
    const sectionId = (window.location.pathname.slice(1) as TAB) || TAB.MAIN // 기존 경로 추출
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/")
    }
    scrollToSection(sectionId)
    setTab(sectionId)
  }, [])

  // @NOTE: 해당 section이 표시될 때 마다 url 업데이트
  useScrollObserver(sectionsRef.current, (sectionId, newUrl) => {
    if (window.location.pathname !== newUrl) {
      window.history.replaceState(null, "", newUrl)
      setTab(sectionId)
    }
  })

  return (
    <main className="relative text-white">
      <Background />
      <div className="w-full h-screen">
        <Header tab={tab} />
        {sections.map(({ id, component: Component }, index) => (
          <section
            key={id}
            ref={(el: any) => (sectionsRef.current[index] = el)}
            id={id}
            className="relative w-full h-screen px-20"
          >
            <Component />
          </section>
        ))}
      </div>
    </main>
  )
}
