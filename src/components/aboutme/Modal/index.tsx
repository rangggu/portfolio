import { INTRODUCE } from "@/data/introduce"
import { modalVariants } from "@/styles/animations/aboutme"
import { cn } from "@/utils/commonUtils"
import { AnimatePresence, motion } from "framer-motion"
import { Dispatch, memo, SetStateAction } from "react"
import { IoClose } from "react-icons/io5"

interface Props {
  modal: number
  setModal: Dispatch<SetStateAction<number>>
}

export default memo(function Modal({ modal, setModal }: Props) {
  const INFO = INTRODUCE.filter((_, index) => index === modal - 1)[0]

  return (
    <AnimatePresence>
      {!!modal && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed top-0 left-0 flex justify-center items-center w-full h-[calc(100vh-80px)] mt-20 backdrop-blur text-body2 z-10 text-white"
          onClick={() => setModal(0)}
        >
          <div
            className="relative w-[750px] min-h-[50%] p-8 bg-blue900 rounded-3xl rounded-b-none shadow-total"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-9 right-8 w-5 h-5"
              onClick={(e) => {
                e.stopPropagation()
                setModal(0)
              }}
            >
              <IoClose className="w-full h-full" />
            </button>
            <div className="flex flex-col gap-5 w-full h-full">
              <h2 className="transition-all text-body1 delay-200">{INFO.title && INFO.title}</h2>
              <ul className="flex flex-col gap-4 text-gray100">
                {INFO.info.map(({ title, desc }, infoIdx) => (
                  <li
                    key={infoIdx}
                    className={cn(
                      "list-disc text-body2 ml-5",
                      infoIdx === INFO.info.length - 1 && "mb-3",
                    )}
                  >
                    {title && title}
                    <p className="text-body3 mt-0.5" dangerouslySetInnerHTML={{ __html: desc }}></p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
