import { cn, groupedResult } from "@/utils/commonUtils"

interface Props {
  result?: { title: string; desc: string[] }[]
}

export default function Result({ result }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full px-16">
      <h4 className="text-body1 font-semibold">상세 성과</h4>
      <div className="flex gap-[5%] w-full">
        {result &&
          groupedResult(result).map((group, index) => (
            <div
              key={index}
              className={cn("flex flex-col gap-8", index === 0 ? "w-[47%]" : "w-[52%]")}
            >
              {group.map(({ title, desc }, innerIndex) => (
                <div key={innerIndex} className="flex flex-col gap-2 w-full">
                  <h4>{title}</h4>
                  <ul className="flex flex-col gap-2 ml-6 font-light text-gray100 text-body3">
                    {desc.map((item, descIndex) => (
                      <li
                        key={descIndex}
                        className="list-disc"
                        dangerouslySetInnerHTML={{ __html: item }}
                      ></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  )
}
