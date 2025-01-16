import { getProjectsByGroup, groupedMeaning } from "@/utils/commonUtils"
import { Dispatch, memo, SetStateAction, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { modalVariants } from "@/styles/animations/project"
import Overview from "./Overview"
import Preview from "./Preview"
import Title from "./Title"
import Task from "./Task"
import Skill from "./Skill"
import Background from "./Background"
import Function from "./Function"
import Meaning from "./Meaning"
import CustomLink from "./CustomLink"
import Result from "./Result"

interface Props {
  modal: number
  setModal: Dispatch<SetStateAction<number>>
}

export default memo(function Modal({ modal, setModal }: Props) {
  const [project] = useMemo(() => getProjectsByGroup([modal]), [modal])

  return (
    <AnimatePresence>
      {!!modal && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed top-0 left-0 flex justify-center items-end w-full h-[calc(100vh-80px)] mt-20 backdrop-blur text-body2 z-10 text-white"
          onClick={() => setModal(0)}
        >
          <div
            className="flex flex-col w-[70%] h-full pb-4 bg-blue900 rounded-3xl rounded-b-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Title {...project} />
            <div className="w-full h-[calc(100%-192px)] pt-8 pb-16 overflow-auto">
              <div className="flex flex-col gap-20 w-full">
                <div className="flex items-center justify-between w-full h-[290px] px-16">
                  <Overview {...project} />
                  <Preview preview={project.preview} />
                </div>
                <div className="flex justify-between w-full px-16">
                  <Task desc={project.desc} tag={project.tag} />
                  <Skill skill={project.skill} />
                </div>
                {project.tag === "직장" ? (
                  <Result result={project.result} />
                ) : (
                  <Background context={project.context} />
                )}
                <Function functions={project.function} tag={project.tag} />
                <Meaning meaning={project.meaning} />
                {project.tag !== "직장" && <CustomLink link={project.link} />}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
