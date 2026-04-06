import { motion } from "framer-motion"
import Task from "./Task"
import Skill from "./Skill"
import Project from "./Project"
import { childVariants } from "@/styles/animations/_common"

export default function Description() {
  return (
    <motion.div className="flex justify-between w-full text-body1" variants={childVariants}>
      <div className="flex flex-col justify-between gap-14 w-[48%]">
        <Task />
        <Skill />
      </div>
      <Project />
    </motion.div>
  )
}
