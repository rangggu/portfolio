import { useSectionsContext } from "@/contexts/SectionContext"
import { TAB } from "@/types"
import { cn } from "@/utils/commonUtils"
import { memo } from "react"

interface HeaderProps {
  tab: TAB
}

export default memo(function Header(props: HeaderProps) {
  const { tab } = props
  const { scrollToSection } = useSectionsContext()

  // @NOTE: 각 탭 정의
  const tabs = [
    { label: "PROLOGUE", activeTab: TAB.PROLOGUE },
    { label: "PROFILE", activeTab: TAB.PROFILE },
    { label: "SKILL", activeTab: TAB.SKILL },
    { label: "CAREER", activeTab: TAB.CAREER },
    { label: "PROJECT", activeTab: TAB.PROJECT },
    { label: "ABOUT ME", activeTab: TAB.ABOUTME },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 flex items-center justify-center gap-20 w-full h-20 px-10 text-caption1 duration-200 transition-all z-10",
        tab === TAB.MAIN
          ? "opacity-0 pointer-events-none bg-transparent"
          : "opacity-100 bg-blue700",
      )}
    >
      {tabs.map(({ label, activeTab }) => (
        <button
          key={activeTab}
          className={cn("text-gray700 font-semibold", tab === activeTab && "text-white")}
          onClick={() => scrollToSection(activeTab)}
        >
          {label}
        </button>
      ))}
    </header>
  )
})
