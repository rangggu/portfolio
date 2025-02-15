import { useSectionVisibility } from "@/hooks/useSectionVisibility"
import Description from "./Description"
import Information from "./Information"
import { TAB } from "@/types"

export default function Profile() {
  const { isVisible } = useSectionVisibility(TAB.PROFILE)

  return (
    <div className="flex items-center justify-between gap-5 2xl:w-[70%] w-[80%] h-full mx-auto pt-20">
      <Information isVisible={isVisible} />
      <Description isVisible={isVisible} />
    </div>
  )
}
