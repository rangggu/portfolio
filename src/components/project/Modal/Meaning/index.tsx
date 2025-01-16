import { cn, groupedMeaning } from "@/utils/commonUtils"

interface Props {
  meaning?: string[]
}

export default function Meaning({ meaning }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full px-16">
      <h4 className="text-body1 font-semibold">느낀 점</h4>
      <div className="flex gap-[5%] w-full">
        {meaning &&
          groupedMeaning(meaning).map((group, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col gap-8 font-light text-gray100",
                index === 0 ? "w-[48%]" : "w-[51%]",
              )}
            >
              {group.map((item, innerIndex) => (
                <p key={innerIndex} dangerouslySetInnerHTML={{ __html: item }}></p>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
