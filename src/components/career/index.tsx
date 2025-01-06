import { motion } from "framer-motion"
import { useAnimation } from "@/hooks/useAnimation"
import { useSectionVisibility } from "@/hooks/useSectionVisibility"
import { TAB } from "@/types"
import { childVariants } from "@/styles/animations/_common"
import { careerVariants } from "@/styles/animations/career"
import Description from "./Description"

export default function Career() {
  const { isVisible } = useSectionVisibility(TAB.CAREER)
  const careerAnimation = useAnimation(isVisible, careerVariants)

  return (
    <motion.div
      {...careerAnimation}
      className="flex flex-col items-center justify-center gap-14 w-[70%] h-full mx-auto pt-20"
    >
      <motion.div className="flex items-center gap-2 w-full" variants={childVariants}>
        <h2 className="text-title4 whitespace-nowrap text-yellow500 font-semibold">
          (주)빛가람시스템
        </h2>
        <hr className="w-full border-t-[2px] border-dashed border-gray700" />
      </motion.div>
      <motion.div className="flex flex-col gap-3.5 w-full text-body1" variants={childVariants}>
        <div className="flex items-center justify-between w-full">
          <h3 className="text-gray100 font-semibold">부서 및 직책</h3>
          <p className="font-bold">기업부설연구소 개발부 연구원</p>
        </div>
        <div className="flex items-center justify-between  w-full">
          <h3 className="text-gray100 font-semibold">재직기간</h3>
          <p>2023. 09 ~ 2024. 12 (1년 3개월)</p>
        </div>
      </motion.div>
      <Description />
    </motion.div>
  )
}