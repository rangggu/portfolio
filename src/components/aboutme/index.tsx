import { INTRODUCE } from "@/data/introduce"
import { groupedIntroduce } from "@/utils/commonUtils"
import Item from "./Item"
import Portal from "../_common/Portal"
import Modal from "./Modal"
import { useState } from "react"

export default function Aboutme() {
  const [modal, setModal] = useState<number>(0)

  return (
    <div className="flex items-center justify-center gap-6 w-[70%] h-full mx-auto pt-20">
      {groupedIntroduce(INTRODUCE).map((group, index) => (
        <div
          key={index}
          className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full"
        >
          {group.map((item, innerIdx) => {
            return <Item key={innerIdx} {...item} setModal={setModal} />
          })}
          {index === 1 && INTRODUCE.length % 2 === 1 && <div className="w-full h-24" />}
        </div>
      ))}
      <Portal>
        <Modal modal={modal} setModal={setModal} />
      </Portal>
    </div>
  )
}
