import { Dispatch, SetStateAction, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/commonUtils"

interface Props {
  index: number
  title: string
  subtitle: string
  summary: string
  desc: string[]
  project: number
  setProject: Dispatch<SetStateAction<number>>
}

export default function Item(props: Props) {
  const { index, title, subtitle, summary, desc, project, setProject } = props
  const active = useMemo(() => project === index, [project, title])

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-3 w-full h-20 px-5 py-7 rounded-lg bg-black bg-opacity-15 font-light cursor-default transition-all duration-500 overflow-hidden",
        active ? "h-auto max-h-[280px] bg-opacity-25" : "h-auto max-h-[83px]",
      )}
      onMouseOver={() => setProject(index)}
    >
      <ul className="flex flex-col gap-2">
        <p>{index !== 3 ? subtitle : title}</p>
        <p className={cn("text-gray300", active ? "opacity-100" : "opacity-0 delay-300")}>
          {summary}
        </p>
      </ul>
      <ul
        className={cn(
          "flex flex-col gap-1 text-body3 ml-6",
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
