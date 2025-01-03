import { labelVariants } from "@/styles/animations/skill"
import { cn } from "@/utils/commonUtils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface Props {
  src: string
  text: string
  desc: string
}

export default function IconButton({ src, text, desc }: Props) {
  const [hover, setHover] = useState(false)

  return (
    <div onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <button
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-3 bg-black bg-opacity-20 rounded-xl hover:bg-white hover:bg-opacity-5 transition-colors duration-150 cursor-default",
        )}
      >
        <img src={src} alt="icon" width={28} height={28} />
        <span className="text-body3 font-semibold">{text}</span>
      </button>
      <AnimatePresence mode="wait">
        {hover && (
          <motion.label
            key={desc}
            className="absolute -bottom-[120%] left-0 flex items-center w-auto py-1.5 pl-3 text-gray300 font-light whitespace-nowrap"
            variants={labelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {desc}
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  )
}
