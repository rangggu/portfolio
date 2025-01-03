import { useAnimation } from "@/hooks/useAnimation"
import { buttonVariants } from "@/styles/animations/variants"
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
      className="absolute flex items-center text-caption1 font-light text-gray300"
      onClick={onClick}
      style={{
        left: left,
        right: right,
        top: top,
        bottom: bottom,
      }}
    >
      more
      <MdKeyboardArrowRight className="w-5 h-5" />
    </motion.button>
  )
}