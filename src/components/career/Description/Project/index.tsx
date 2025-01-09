import MoreButton from "@/components/_common/MoreButton"
import { useSectionsContext } from "@/contexts/SectionContext"
import { TAB } from "@/types"
import Item from "./Item"
import { useState } from "react"
import { PROJECT } from "@/data/project"

export default function Project() {
  const [project, setProject] = useState<number>(1)
  const { scrollToSection } = useSectionsContext()

  const CAREER_PROJECT = PROJECT.filter((item) => item.tag === "직장")

  return (
    <div className="flex flex-col justify-between gap-3 w-[48%]">
      <div className="relative flex items-center w-full">
        <h3 className="text-gray100 font-semibold">참여 프로젝트</h3>
        <MoreButton
          right={0}
          onClick={() => {
            scrollToSection(TAB.PROJECT)
          }}
        />
      </div>
      <div className="flex flex-col gap-3 w-full h-[422px] text-body2">
        {CAREER_PROJECT.map((item) => (
          <Item {...item} key={item.index} project={project} setProject={setProject} />
        ))}
      </div>
    </div>
  )
}
