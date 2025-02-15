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
    <div className="relative flex items-center justify-center w-full h-full lg:py-20 py-6">
      <div className="absolute left-0 flex items-center justify-between w-full lg:top-20 top-6">
        <h3 className="lg:text-caption1 text-caption3">FRONTEND DEVELOPER</h3>
        <menu className="lg:text-caption1 text-caption3">KIM GYU RI</menu>
      </div>
      <div className="flex flex-col w-full lg:gap-0 gap-2">
        <h2 className="text-subtitle5 text-yellow500">
          {useTyping("Turning ideas to reality", 50)}
        </h2>
        <motion.h1 className="lg:text-h1 text-h4" initial="initial" animate="animate">
          <motion.span variants={headingVariants()}>
            <strong>아이디어</strong>를 <strong>현실</strong>로
          </motion.span>
          <br />
          <motion.span variants={headingVariants(1)} className="lg:tracking-normal tracking-tight">
            연결하는 프론트엔드 개발자,
          </motion.span>
          <br />
          <motion.span variants={headingVariants(2)}>김규리입니다.</motion.span>
        </motion.h1>
      </div>
      <div className="absolute bottom-6 flex items-center justify-center w-full">
        <motion.div
          {...bounceAnimation}
          className="lg:w-12 lg:h-12 w-10 h-10 text-gray300"
          transition={{
            type: "spring",
            bounce: 0.25,
          }}
        >
          <RiArrowDownDoubleFill
            className={cn(
              "w-full h-full transition-all duration-300",
              isInView ? "opacity-100" : "opacity-0",
            )}
          />
        </motion.div>
      </div>
    </div>
  )
}
