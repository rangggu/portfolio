import Heading from "./Heading"
import Paragraph from "./Paragraph"
import { TAB } from "@/types"
import { useSectionVisibility } from "@/hooks/useSectionVisibility"

export default function Prologue() {
  const { isVisible } = useSectionVisibility(TAB.PROLOGUE)

  return (
    <div className="flex flex-col items-center justify-center lg:gap-28 gap-10 w-full h-full lg:pt-20 pt-16 lg:pb-0 pb-8">
      <Heading isVisible={isVisible} />
      <Paragraph isVisible={isVisible} />
    </div>
  )
}
