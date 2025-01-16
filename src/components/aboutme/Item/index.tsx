import { cn } from "@/utils/commonUtils"
import { useState } from "react"

interface Props {
  title: string
  info: { title?: string; desc: string }[]
}

export default function Item({ title, info }: Props) {
  const [hover, setHover] = useState<boolean>(false)
  return (
    <div
      className={cn(
        "relative flex flex-col w-full py-5 px-8 bg-black bg-opacity-15 rounded-xl duration-500 transition-all hover:bg-white hover:bg-opacity-5 overflow-hidden",
        hover ? "h-auto max-h-[550px]" : "h-auto max-h-24",
      )}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <h2 className={cn("py-3 transition-all", "text-body1 delay-200")}>{title}</h2>
      <ul
        className={cn(
          "flex flex-col gap-3 text-gray100",
          hover ? "opacity-100 delay-200" : "opacity-0 delay-200",
        )}
      >
        {info.map(({ title, desc }, infoIdx) => (
          <li
            key={infoIdx}
            className={cn("list-disc text-body2 ml-5", infoIdx === info.length - 1 && "mb-3")}
          >
            {title && title}
            <p className="text-body3 mt-0.5" dangerouslySetInnerHTML={{ __html: desc }}></p>
          </li>
        ))}
      </ul>
    </div>
  )
}
