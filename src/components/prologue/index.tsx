import Heading from "./Heading"
import Paragraph from "./Paragraph"
import { TAB } from "@/types"
import { useSectionVisibility } from "@/hooks/useSectionVisibility"

export default function Prologue() {
  const { isVisible } = useSectionVisibility(TAB.PROLOGUE)

  return (
    <div className="flex flex-col items-center justify-center gap-28 w-full h-full">
      <Heading isVisible={isVisible} />
      <Paragraph isVisible={isVisible} />
    </div>
  )
}
