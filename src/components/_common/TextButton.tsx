import { useAnimation } from "@/hooks/useAnimation"
import { buttonVariants } from "@/styles/animations/variants"
import { motion } from "framer-motion"
import { MouseEventHandler } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"

interface Props {
  text: string
  delay: number
  isVisible: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function TextButton(props: Props) {
  const { text, delay, isVisible = true, onClick } = props
  const buttonAnimation = useAnimation(isVisible, buttonVariants(delay))

  return (
    <motion.button
      {...buttonAnimation}
      className="absolute bottom-3 right-3 flex items-center text-caption1 font-light text-gray300"
      onClick={onClick}
    >
      {text}
      <MdKeyboardArrowRight className="w-5 h-5" />
    </motion.button>
  )
}
