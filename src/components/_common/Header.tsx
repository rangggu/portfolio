import { TAB } from "@/types"
import { cn } from "@/utils/commonUtils"
import { scrollToSection } from "@/utils/scrollUtils"
import { ForwardedRef, forwardRef } from "react"

interface HeaderProps {
  tab: TAB
}

export default forwardRef(function Header(
  props: HeaderProps,
  ref: ForwardedRef<(HTMLDivElement | null)[]>,
) {
  const { tab } = props

  // @NOTE: 각 탭 정의
  const tabs = [
    { label: "PROLOGUE", section: "prologue", activeTab: TAB.PROLOGUE },
    { label: "PROFILE", section: "profile", activeTab: TAB.PROFILE },
    { label: "SKILL", section: "skill", activeTab: TAB.SKILL },
    { label: "CAREER", section: "career", activeTab: TAB.CAREER },
    { label: "PROJECT", section: "project", activeTab: TAB.PROJECT },
    { label: "ABOUT ME", section: "aboutme", activeTab: TAB.ABOUTME },
  ]

  // @NOTE: 공통 클릭 핸들러 함수
  const handleScroll = (section: string) => {
    if (ref && "current" in ref && ref.current) {
      scrollToSection(section, ref.current)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 flex items-center justify-center gap-20 w-full h-20 px-10 text-caption1 duration-200 transition-all z-10",
        tab === TAB.MAIN
          ? "opacity-0 pointer-events-none bg-transparent"
          : "opacity-100 bg-blue700",
      )}
    >
      {tabs.map(({ label, section, activeTab }) => (
        <button
          key={section}
          className={cn("text-gray700 font-semibold", tab === activeTab && "text-white")}
          onClick={() => handleScroll(section)}
        >
          {label}
        </button>
      ))}
    </header>
  )
})
