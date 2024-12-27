import { useTyping } from "@/hooks/useTyping"
import { mainHeadingVariants } from "@/styles/animations/variants"
import { motion } from "framer-motion"

export default function Main() {
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
          <motion.span variants={mainHeadingVariants()}>
            <strong>아이디어</strong>를 <strong>현실</strong>로
          </motion.span>
          <br />
          <motion.span variants={mainHeadingVariants(1)}>연결하는 프론트엔드 개발자,</motion.span>
          <br />
          <motion.span variants={mainHeadingVariants(2)}>김규리입니다.</motion.span>
        </motion.h1>
      </div>
    </div>
  )
}
