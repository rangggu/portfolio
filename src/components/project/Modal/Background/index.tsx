import { cn } from "@/utils/commonUtils"

interface Props {
  context?: string[]
}

export default function Background({ context }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full px-16">
      <h4 className="text-body1 font-semibold">프로젝트 배경</h4>
      <div className="flex gap-[5%] font-light text-gray100">
        {context?.map((item, index) => (
          <p key={index} className={cn(index === 0 ? "w-[47%]" : "w-[52%]")}>
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}
