import IconButton from "@/components/_common/IconButton"

interface Props {
  skill?: { src?: string; name: string }[]
}

export default function Skill({ skill }: Props) {
  return (
    <div className="flex flex-col gap-2 w-[50%]">
      <h4 className="text-body1 font-semibold">기술 스택</h4>
      <ul className="flex flex-wrap items-center gap-2">
        {skill?.map((item, index) => (
          <IconButton key={index} src={item.src} text={item.name} />
        ))}
      </ul>
    </div>
  )
}
