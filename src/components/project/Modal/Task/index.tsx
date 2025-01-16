interface Props {
  desc: string[]
  tag: "개인" | "사이드" | "직장"
}

export default function Task({ desc, tag }: Props) {
  return (
    <div className="flex flex-col gap-2 w-[45%]">
      <h4 className="text-body1 font-semibold">{tag === "직장" ? "주요 성과" : "주요 업무"}</h4>
      <ul className="flex flex-col gap-2 ml-6">
        {desc.map((item, index) => (
          <li key={index} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
