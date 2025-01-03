import { useAnimation } from "@/hooks/useAnimation"
import { headingVariants } from "@/styles/animations/prologue"
import { childVariants } from "@/styles/animations/_common"
import { motion } from "framer-motion"

interface Props {
  isVisible: boolean
}

export default function Heading({ isVisible }: Props) {
  const headingAnimation = useAnimation(isVisible, headingVariants)

  return (
    <motion.div {...headingAnimation} className="flex flex-col items-center gap-5">
      <motion.h2 className="text-title3" variants={childVariants}>
        날 것인 아이디어에
        <strong className="text-title2 text-yellow500"> 저만의 가치와 철학</strong>을 담아냅니다.
      </motion.h2>
      <motion.h3 className="text-subtitle3" variants={childVariants}>
        <strong className="text-subtitle2">사용자 친화적인 경험</strong>과
        <strong className="text-subtitle2"> 최신 기술</strong>을 더해 아이디어를 완성합니다.
      </motion.h3>
    </motion.div>
  )
}
