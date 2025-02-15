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
      <motion.h2
        className="lg:text-title3 lg:text-left text-title6 text-center"
        variants={childVariants}
      >
        날 것인 아이디어에 <br className="lg:hidden block" />
        <strong className="lg:text-title2 text-title5 text-yellow500"> 저만의 가치와 철학</strong>을
        담아냅니다.
      </motion.h2>
      <motion.h3
        className="lg:text-subtitle3 lg:text-left text-subtitle5 text-center"
        variants={childVariants}
      >
        <strong className="lg:text-subtitle2 text-subtitle4">사용자 친화적인 경험</strong>과
        <strong className="lg:text-subtitle2 text-subtitle4"> 최신 기술</strong>을 더해{" "}
        <br className="lg:hidden block" />
        아이디어를 완성합니다.
      </motion.h3>
    </motion.div>
  )
}
