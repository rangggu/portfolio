import { useAnimation } from "@/hooks/useAnimation"
import { useSectionVisibility } from "@/hooks/useSectionVisibility"
import { useTyping } from "@/hooks/useTyping"
import { headingVariants } from "@/styles/animations/main"
import { bounceVariants } from "@/styles/animations/_common"
import { TAB } from "@/types"
import { cn } from "@/utils/commonUtils"
import { motion } from "framer-motion"
import { RiArrowDownDoubleFill } from "react-icons/ri"

export default function Main() {
  const { isInView } = useSectionVisibility(TAB.MAIN)
  const bounceAnimation = useAnimation(isInView, bounceVariants)

  return (
    <div className="relative flex items-center justify-center w-full h-full py-20">
      <div className="absolute top-20 left-0 flex items-center justify-between w-full">
        <h3 className="text-caption1">FRONTEND DEVELOPER</h3>
        <menu className="text-caption1">KIM GYU RI</menu>
      </div>
      <div className="flex flex-col w-full">
        <h2 className="text-subtitle3 text-yellow500">
          {useTyping("Turning ideas to reality", 50)}
        </h2>
        <motion.h1 className="text-h1" initial="initial" animate="animate">
          <motion.span variants={headingVariants()}>
            <strong>아이디어</strong>를 <strong>현실</strong>로
          </motion.span>
          <br />
          <motion.span variants={headingVariants(1)}>연결하는 프론트엔드 개발자,</motion.span>
          <br />
          <motion.span variants={headingVariants(2)}>김규리입니다.</motion.span>
        </motion.h1>
      </div>
      <motion.div
        {...bounceAnimation}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 text-gray300"
        transition={{
          type: "spring",
          bounce: 0.25,
        }}
      >
        <RiArrowDownDoubleFill
          className={cn(
            "w-full h-full  transition-all duration-300",
            isInView ? "opacity-100" : "opacity-0",
          )}
        />
      </motion.div>
    </div>
  )
}
