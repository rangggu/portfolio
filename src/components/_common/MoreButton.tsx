import { useAnimation } from "@/hooks/useAnimation"
import { buttonVariants } from "@/styles/animations/_common"
import { motion } from "framer-motion"
import { MouseEventHandler } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"

interface Props {
  delay?: number
  isVisible?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  left?: number | string
  right?: number | string
  top?: number | string
  bottom?: number | string
}

export default function MoreButton(props: Props) {
  const { delay = 0, isVisible = true, onClick, left, right, top, bottom } = props
  const buttonAnimation = useAnimation(isVisible, buttonVariants(delay))

  return (
    <motion.button
      {...buttonAnimation}
      className="absolute flex items-center lg:text-caption1 text-caption3 font-light text-gray300"
      onClick={onClick}
      style={{
        left: left,
        right: right,
        top: top,
        bottom: bottom,
      }}
    >
      more
      <MdKeyboardArrowRight className="lg:w-5 lg:h-5 w-3 h-3" />
    </motion.button>
  )
}
