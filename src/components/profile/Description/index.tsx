import { TAB } from "@/types"
import { useSectionsContext } from "@/contexts/SectionContext"
import { childVariants } from "@/styles/animations/_common"
import { useAnimation } from "@/hooks/useAnimation"
import { motion } from "framer-motion"
import MoreButton from "@/components/_common/MoreButton"
import { descVariants } from "@/styles/animations/profile"
import { PROFILE } from "@/data/profile"
import { CAREER } from "@/data/career"

interface Props {
  isVisible: boolean
}

export default function Description({ isVisible }: Props) {
  const { scrollToSection } = useSectionsContext()
  const descAnimation = useAnimation(isVisible, descVariants)
  const { education, certificate } = PROFILE
  const { company, period, position, task } = CAREER

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
            <h4 className="text-subtitle4 font-semibold">{company}</h4>
            <p className="text-body2 text-gray300">{period.org}</p>
          </div>
          <div className="flex flex-col gap-2 items-end text-body2 text-gray300">
            <p className="text-white text-body1">{position}</p>
            {task.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className="flex flex-col gap-3.5" variants={childVariants}>
        <h3 className="text-subtitle2 font-semibold text-yellow500">Education</h3>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-body2 text-gray300">
            {education.map((item, index) => (
              <p key={index}>{item.date}</p>
            ))}
          </div>
          <div className="flex flex-col gap-2 items-end text-body2">
            {education.map((item, index) => (
              <p key={index}>{item.desc}</p>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div className="flex flex-col gap-3.5" variants={childVariants}>
        <h3 className="text-subtitle2 font-semibold text-yellow500">Certificate</h3>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2 text-body2 text-gray300">
            {certificate.map((item, index) => (
              <p key={index}>{item.date}</p>
            ))}
          </div>
          <div className="flex flex-col gap-2 items-end text-body2">
            {certificate.map((item, index) => (
              <p key={index}>{item.desc}</p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
