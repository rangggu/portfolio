import Item from "./Item"
import { getProjectsByGroup } from "@/utils/commonUtils"

export default function Project() {
  const LEFT_PROJECT = getProjectsByGroup([1, 4, 7])
  const MIDDIE_PROJECT = getProjectsByGroup([2, 5, 8])
  const RIGHT_PROJECT = getProjectsByGroup([3, 6, 9])

  return (
    <div className="flex items-center justify-center gap-6 w-[70%] h-full mx-auto pt-20">
      <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
        {LEFT_PROJECT.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
      <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
        {MIDDIE_PROJECT.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
      <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
        {RIGHT_PROJECT.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
    </div>
  )
}
