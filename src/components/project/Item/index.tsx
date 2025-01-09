import { cn } from "@/utils/commonUtils"
import Image from "next/image"
import { memo, useState } from "react"
import { ProjectCardType } from ".."

export default memo(function Item(props: ProjectCardType) {
  const { title, subtitle, background, desc, date, tag } = props
  const [hover, setHover] = useState<boolean>(false)

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 w-full p-5 bg-black bg-opacity-15 rounded-xl duration-500 transition-all hover:bg-white hover:bg-opacity-5 overflow-hidden",
        hover ? "h-auto max-h-96" : "h-auto max-h-48",
      )}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Image
        className="w-full h-full object-cover -z-10 opacity-30 blur-md"
        src={background}
        alt="프로젝트 이미지"
        quality={100}
        fill
      />
      <div className="relative flex flex-col gap-1 w-full">
        <h2 className="text-subtitle4 font-semibold text-yellow500">{title}</h2>
        <p className="text-body3">{subtitle}</p>
        <div className="flex items-center gap-2 text-body4">
          <span className="text-gray300">{date}</span>
          <span className="font-semibold px-1.5 py-0.5 text-xs bg-blue700 rounded-md">{tag}</span>
        </div>
      </div>
      <ul
        className={cn(
          "flex flex-col gap-0.5 text-body4 text-gray100",
          hover ? "opacity-100 delay-200" : "opacity-0 delay-200",
        )}
      >
        {desc.map((item, index) => (
          <li key={index} className="list-disc ml-5">
            {item}
          </li>
        ))}
      </ul>
      <button
        className={cn(
          "flex justify-center items-center w-full h-12 text-body4 bg-blue900 bg-opacity-50 rounded-md",
          hover ? "opacity-100" : "opacity-0 delay-200",
        )}
      >
        자세히 보기
      </button>
    </div>
  )
})
