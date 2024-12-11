"use client"

import { useEffect, useRef } from "react"
import { scrollToSection } from "@/utils/scrollUtils"
import { useScrollObserver } from "@/hooks/useScrollObserver"
import Main from "@/components/main/Main"
import Prologue from "@/components/prologue/Prologue"

const sections = [
  { id: "main", component: Main },
  { id: "prologue", component: Prologue },
]

export default function Page() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  // URL 리다이렉트 및 초기 섹션 스크롤
  useEffect(() => {
    const targetId = window.location.pathname.slice(1) || "main" // 현재 경로 추출
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/")
    }

    scrollToSection(targetId, sectionsRef.current)
  }, [])

  // 스크롤 이벤트로 URL 업데이트
  useScrollObserver(sectionsRef.current, (newUrl) => {
    if (window.location.pathname !== newUrl) {
      window.history.replaceState(null, "", newUrl)
    }
  })

  return (
    <main>
      {sections.map(({ id, component: Component }, index) => (
        <section
          key={id}
          ref={(el: any) => (sectionsRef.current[index] = el)}
          id={id}
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Component />
        </section>
      ))}
    </main>
  )
}
