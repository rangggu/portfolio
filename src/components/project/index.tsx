import { Dispatch, SetStateAction, useState } from "react"
import Item from "./Item"
import { getProjectsByGroup } from "@/utils/commonUtils"

interface Props {
  setModal: Dispatch<SetStateAction<number>>
}

export default function Project({ setModal }: Props) {
  const LEFT_PROJECT = getProjectsByGroup([1, 4, 7])
  const MIDDIE_PROJECT = getProjectsByGroup([2, 5, 8])
  const RIGHT_PROJECT = getProjectsByGroup([3, 6, 9])

  return (
    <>
      <div className="flex items-center justify-center gap-6 2xl:w-[70%] w-[80%] h-full mx-auto pt-20">
        <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
          {LEFT_PROJECT.map((item) => (
            <Item {...item} key={item.index} setModal={setModal} />
          ))}
        </div>
        <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
          {MIDDIE_PROJECT.map((item) => (
            <Item {...item} key={item.index} setModal={setModal} />
          ))}
        </div>
        <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
          {RIGHT_PROJECT.map((item) => (
            <Item {...item} key={item.index} setModal={setModal} />
          ))}
        </div>
      </div>
    </>
  )
}
