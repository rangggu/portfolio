import { TAB } from "@/types"
import { useSectionVisibility } from "@/hooks/useSectionVisibility"
import { useAnimation } from "@/hooks/useAnimation"
import { skillVariants } from "@/styles/animations/variants"
import { motion } from "framer-motion"
import Language from "./Language"
import Framework from "./Framework"
import Library from "./Library"
import Style from "./Style"
import Tool from "./Tool"

export default function Skill() {
  const { isVisible } = useSectionVisibility(TAB.SKILL)
  const skillAnimation = useAnimation(isVisible, skillVariants)

  return (
    <motion.div
      {...skillAnimation}
      className="flex flex-col items-center justify-center gap-[52px] w-[70%] h-full mx-auto pt-20"
    >
      <Language />
      <Framework />
      <Library />
      <Style />
      <Tool />
    </motion.div>
  )
}
