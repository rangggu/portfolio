import { INTRODUCE } from "@/data/introduce"
import { groupedIntroduce } from "@/utils/commonUtils"
import Item from "./Item"

export default function Aboutme() {
  return (
    <div className="flex items-center justify-center gap-6 w-[70%] h-full mx-auto pt-20">
      {groupedIntroduce(INTRODUCE).map((group, index) => (
        <div key={index} className="flex flex-col flex-1 items-center gap-6 w-full h-full pt-20">
          {group.map((item, innerIdx) => (
            <Item key={innerIdx} {...item} />
          ))}
        </div>
      ))}
    </div>
  )
}
