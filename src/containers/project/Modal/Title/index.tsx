import { ProjectType } from "@/data/project"
import Image from "next/image"

interface Props {
  background: string
  title: string
  subtitle: string
}

export default function Title({ background, title, subtitle }: Props) {
  return (
    <div className="w-full h-48 overflow-hidden rounded-3xl rounded-b-none">
      <div className="relative flex flex-col justify-center w-full h-40 px-16">
        <Image
          className="absolute top-0 left-0 w-full h-40 object-cover opacity-30 blur-md"
          src={background}
          alt="프로젝트 이미지"
          quality={100}
          width={1920}
          height={1080}
        />
        <h3 className="relative top-1 pt-4 whitespace-nowrap text-body3">{subtitle}</h3>
        <h2 className="text-h3 font-bold">{title}</h2>
      </div>
    </div>
  )
}
