"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useScrollObserver } from "@/hooks/useScrollObserver"
import { TAB } from "@/types"
import { useSectionsContext } from "@/contexts/SectionContext"
import Main from "@/components/main"
import Prologue from "@/components/prologue"
import Background from "@/components/_common/Background"
import Header from "@/components/_common/Header"
import Profile from "@/components/profile"
import Skill from "@/components/skill"
import Career from "@/components/career"
import Project from "@/components/project"
import Modal from "@/components/project/Modal"
import Portal from "@/components/_common/Portal"
import Aboutme from "@/components/aboutme"

interface SectionsType {
  id: string
  component: React.ElementType
}

export default function Page() {
  const { sectionsRef, scrollToSection } = useSectionsContext()
  const [tab, setTab] = useState<TAB>(TAB.MAIN)
  const [modal, setModal] = useState<number>(0)

  const sections: SectionsType[] = useMemo(
    () => [
      { id: "main", component: Main },
      { id: "prologue", component: Prologue },
      { id: "profile", component: Profile },
      { id: "skill", component: Skill },
      { id: "career", component: Career },
      { id: "project", component: Project },
      { id: "aboutme", component: Aboutme },
    ],
    [],
  )

  // @NOTE: 리다이렉트시 기존 section으로 스크롤
  useEffect(() => {
    const sectionId = (window.location.pathname.slice(1) as TAB) || TAB.MAIN // 기존 경로 추출
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/")
    }
    scrollToSection(sectionId)
    setTab(sectionId)
  }, [])

  // @NOTE: 해당 section이 표시될 때마다 url 업데이트
  useScrollObserver((sectionId, newUrl) => {
    if (window.location.pathname !== newUrl) {
      window.history.replaceState(null, "", newUrl)
      setTab(sectionId)
    }
  })

  return (
    <main className="relative text-white">
      <Background />
      <div className="w-full">
        <Header tab={tab} modal={modal} setModal={setModal} />
        {sections.map(({ id, component: Component }, index) => (
          <section
            key={id}
            id={id}
            ref={(el: any) => (sectionsRef.current[index] = el)}
            className="relative w-full h-screen px-20"
          >
            <Component setModal={id === "project" ? setModal : undefined} />
          </section>
        ))}
        <Portal>
          <Modal modal={modal} setModal={setModal} />
        </Portal>
      </div>
    </main>
  )
}
