import { getProjectsByGroup } from "@/utils/commonUtils"
import { Dispatch, SetStateAction } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { modalVariants } from "@/styles/animations/project"

interface Props {
  modal: number
  setModal: Dispatch<SetStateAction<number>>
}

export default function Modal({ modal, setModal }: Props) {
  const PROJECT = getProjectsByGroup([modal])
  console.log(PROJECT)

  return (
    <AnimatePresence>
      {!!modal && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed top-0 left-0 flex justify-center items-end w-full h-[calc(100%-80px)] mt-20 backdrop-blur"
          onClick={() => setModal(0)}
        >
          <div className="flex flex-col w-[70%] h-[calc(100%-60px)] p-6 bg-blue900 rounded-3xl rounded-b-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
