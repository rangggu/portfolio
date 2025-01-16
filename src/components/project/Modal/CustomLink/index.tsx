import Link from "next/link"
import { FaChrome, FaGithub } from "react-icons/fa"

interface Props {
  link?: {
    web?: string
    github: string
    figma?: string
  }
}

export default function CustomLink({ link }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full px-16">
      <h4 className="text-body1 font-semibold">관련된 링크</h4>

      <div className="flex items-center gap-4">
        {link?.web && (
          <Link className="" href={link.web || ""} rel="noopener noreferrer" target="_blank">
            <FaChrome className="w-6 h-6" />
          </Link>
        )}
        {link?.github && (
          <Link className="" href={link.github || ""} rel="noopener noreferrer" target="_blank">
            <FaGithub className="w-6 h-6" />
          </Link>
        )}
        {link?.figma && (
          <Link className="" href={link.figma || ""} rel="noopener noreferrer" target="_blank">
            <img src="/images/icon/figma.png" alt="icon" width={24} height={24} />
          </Link>
        )}
      </div>
    </div>
  )
}
