"use client"

import { useEffect, useRef, useState } from "react"
import { scrollToSection } from "@/utils/scrollUtils"
import { useScrollObserver } from "@/hooks/useScrollObserver"
import Main from "@/components/main/Main"
import Prologue from "@/components/prologue/Prologue"
import Background from "@/components/_common/Background"
import Header from "@/components/_common/Header"
import { TAB } from "@/types"
import Profile from "@/components/profile/Profile"

const sections = [
  { id: "main", component: Main },
  { id: "prologue", component: Prologue },
  { id: "profile", component: Profile },
]

export default function Page() {
  const [tab, setTab] = useState<TAB>(TAB.MAIN)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  // @NOTE: 리다이렉트 설정 및 기존 section으로 스크롤
  useEffect(() => {
    const sectionId = (window.location.pathname.slice(1) as TAB) || TAB.MAIN // 기존 경로 추출
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/")
    }
    scrollToSection(sectionId, sectionsRef.current)
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
        <Header tab={tab} ref={sectionsRef} />
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
