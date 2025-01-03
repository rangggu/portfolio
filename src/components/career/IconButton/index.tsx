import { skillLabelVariants } from "@/styles/animations/variants"
import { cn } from "@/utils/commonUtils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface Props {
  src: string
  text: string
}

export default function IconButton({ src, text }: Props) {
  return (
    <button
      className={cn(
        "flex items-center gap-1.5 py-1.5 px-2.5 bg-black bg-opacity-20 rounded-lg cursor-default",
      )}
    >
      <img src={src} alt="icon" width={20} height={20} />
      <span className="text-body4">{text}</span>
    </button>
  )
}
