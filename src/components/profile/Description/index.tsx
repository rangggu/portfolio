import { TAB } from "@/types"
import { useSectionsContext } from "@/contexts/SectionContext"
import { childVariants, profileDescVariants } from "@/styles/animations/variants"
import { useAnimation } from "@/hooks/useAnimation"
import { motion } from "framer-motion"
import MoreButton from "@/components/_common/MoreButton"

interface Props {
  isVisible: boolean
}

export default function Description({ isVisible }: Props) {
  const { scrollToSection } = useSectionsContext()
  const descAnimation = useAnimation(isVisible, profileDescVariants)

  return (
    <motion.div {...descAnimation} className="flex flex-col justify-between w-[860px] h-[88%] py-1">
      <motion.div className="flex flex-col gap-3.5" variants={childVariants}>
        <div className="relative flex items-center justify-between w-full">
          <h3 className="text-subtitle2 font-semibold text-yellow500">Career</h3>
          <MoreButton
            right={0}
            onClick={() => {
              scrollToSection(TAB.CAREER)
            }}
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            <h4 className="text-subtitle4 font-semibold">(주)빛가람시스템</h4>
            <p className="text-body2 text-gray300">2023. 09 ~ 2024. 12</p>
          </div>
          <div className="flex flex-col gap-2 items-end text-body2 text-gray300">
            <p className="text-white text-body1">기업부설연구소 개발부 연구원</p>
            <p>자사 서비스 프론트엔드 엔지니어로 근무</p>
            <p>신규 기능 개발 및 유지 보수</p>
            <p>사용 기술 및 서비스 화면 대규모 업데이트 진행</p>
            <p>생산성 증대를 위한 레거시 청산 및 컴포넌트 재설계</p>
          </div>
        </div>
      </motion.div>
      <motion.div className="flex flex-col gap-3.5" variants={childVariants}>
        <h3 className="text-subtitle2 font-semibold text-yellow500">Education</h3>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-body2 text-gray300">
            <p>2016. 03 ~ 2019. 02</p>
            <p>2019. 03 ~ 2023. 08</p>
            <p>2022. 02 ~ 2022. 03</p>
            <p>2022. 09 ~ 2023. 04</p>
          </div>
          <div className="flex flex-col gap-2 items-end text-body2">
            <p>경주여자고등학교 졸업</p>
            <p>부산대학교 경제학부 경제학과 졸업</p>
            <p>스파르타코딩클럽 웹개발 종합반 과정 수료</p>
            <p>제로베이스 프론트엔드 스쿨 수료</p>
          </div>
        </div>
      </motion.div>
      <motion.div className="flex flex-col gap-3.5" variants={childVariants}>
        <h3 className="text-subtitle2 font-semibold text-yellow500">Certificate</h3>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-body2 text-gray300">
            <p>2021. 09</p>
            <p>2021. 09</p>
            <p>2022. 03</p>
          </div>
          <div className="flex flex-col gap-2 items-end text-body2">
            <p>한국사능력검정시험 심화 취득</p>
            <p>컴퓨터활용능력 1급 취득</p>
            <p>데이터분석준전문가(ADsP) 취득</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
