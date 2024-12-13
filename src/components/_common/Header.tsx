import { TAB } from "@/types"
import { cn } from "@/utils/commonUtils"
import { memo } from "react"

interface HeaderProps {
  tab: TAB
}

export default memo(function Header(props: HeaderProps) {
  const { tab } = props

  return (
    <header
      className={cn(
        "fixed top-0 left-0 flex items-center justify-center gap-20 w-full h-20 px-10 text-caption1 duration-200 transition-all",
        tab === TAB.MAIN ? "opacity-0 pointer-events-none bg-transparent" : "opacity-100",
      )}
    >
      <span>PROLOGUE</span>
      <span>PROFILE</span>
      <span>SKILL</span>
      <span>CAREER</span>
      <span>PROJECT</span>
      <span>ABOUT ME</span>
    </header>
  )
})
