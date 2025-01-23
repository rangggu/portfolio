import { BITLIGHT } from "./project/bitlight"
import { DYNAMIC } from "./project/dynamic"
import { ELECTRON } from "./project/electron"
import { HEYTOSSME } from "./project/heytossme"
import { MALLANG } from "./project/mallang"
import { MINE } from "./project/mine"
import { PORTFOLIO } from "./project/portfolio"
import { SUPERPOSITION } from "./project/superposition"
import { WHAT } from "./project/what"

interface CommonType {
  index: number
  title: string
  subtitle: string
  background: string
  desc: string[]
  date: string
  contribution: number
  overview?: { problem: string[]; solution: string[] }
  preview?: PreviewType
  skill?: { src?: string; name: string }[]
  context?: string[]
  result?: { title: string; desc: string[] }[]

  meaning?: string[]
  link?: {
    web?: string
    github: string
    figma?: string
  }
}

interface CareerType extends CommonType {
  tag: "직장"
  summary: string
  function?: {
    image?: {
      url: string
      landscape: boolean
    }
    name: string
    icon: string
    info?: { title?: string; desc: string }[]
    code?: string[]
  }[]
}

interface NotCareerType extends CommonType {
  tag: "개인" | "사이드"
  function?: {
    image?: {
      url: string
      landscape: boolean
    }
    name: string
    icon: string
    info?: { title?: string; desc: string; contribution?: number }[]
    code?: string[]
  }[]
}

export type PreviewType = { type: "youtube"; link: string } | { type: "image"; link: string[] }
export type ProjectType = CareerType | NotCareerType

export const PROJECT: ProjectType[] = [
  BITLIGHT,
  DYNAMIC,
  ELECTRON,
  PORTFOLIO,
  MALLANG,
  MINE,
  SUPERPOSITION,
  WHAT,
  HEYTOSSME,
]
