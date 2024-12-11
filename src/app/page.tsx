"use client"

import { useEffect, useRef } from "react"
import { scrollToSection } from "@/utils/scrollUtils"
import { useScrollObserver } from "@/hooks/useScrollObserver"
import Main from "@/components/main/Main"
import Prologue from "@/components/prologue/Prologue"
import Background from "@/components/_common/Background"

const sections = [
  { id: "main", component: Main },
  { id: "prologue", component: Prologue },
]

export default function Page() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  // @NOTE: 리다이렉트 설정 및 기존 section으로 스크롤
  useEffect(() => {
    const targetId = window.location.pathname.slice(1) || "main" // 기존 경로 추출
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/")
    }

    scrollToSection(targetId, sectionsRef.current)
  }, [])

  // @NOTE: 해당 section이 표시될 때 마다 url 업데이트
  useScrollObserver(sectionsRef.current, (newUrl) => {
    if (window.location.pathname !== newUrl) {
      window.history.replaceState(null, "", newUrl)
    }
  })

  return (
    <main className="relative">
      <Background />
      {sections.map(({ id, component: Component }, index) => (
        <section
          key={id}
          ref={(el: any) => (sectionsRef.current[index] = el)}
          id={id}
          className="w-full h-screen"
        >
          <Component />
        </section>
      ))}
    </main>
  )
}
