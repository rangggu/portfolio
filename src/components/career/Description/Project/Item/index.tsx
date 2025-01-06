import { Dispatch, SetStateAction, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/commonUtils"

interface Props {
  title: string
  subtitle: string
  desc: string[]
  project: string
  setProject: Dispatch<SetStateAction<string>>
}

export default function Item({ title, subtitle, desc, project, setProject }: Props) {
  const active = useMemo(() => project === title, [project, title])

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-4 w-full h-20 px-5 py-7 rounded-lg bg-black bg-opacity-15 font-light cursor-default transition-all duration-500 overflow-hidden",
        active ? "h-auto max-h-[219px] bg-opacity-25" : "h-auto max-h-[83px]",
      )}
      onMouseOver={() => setProject(title)}
    >
      <ul className="flex flex-col gap-2">
        <p>{title}</p>
        <p className={cn("text-gray300", active ? "opacity-100" : "opacity-0 delay-300")}>
          {subtitle}
        </p>
      </ul>
      <ul
        className={cn(
          "flex flex-col gap-1 text-gray300 ml-6",
          active ? "opacity-100" : "opacity-0 delay-500",
        )}
      >
        {desc.map((item, index) => (
          <li key={index} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
