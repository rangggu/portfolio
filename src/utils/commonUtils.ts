import { twMerge } from "tailwind-merge"
import clsx, { ClassValue } from "clsx"
import { PROJECT } from "@/data/project"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getProjectsByGroup = (category: number[]) => {
  return PROJECT.filter((project) => category.includes(project.index))
}

export const groupedMeaning = (meaning: string[]) => {
  const groupSize = Math.ceil(meaning.length / 2)
  return meaning.reduce((result: string[][], current, index) => {
    if (index % groupSize === 0) result.push([])
    result[result.length - 1].push(current)
    return result
  }, [])
}

export const groupedResult = (result: { title: string; desc: string[] }[]) => {
  const groupSize = Math.ceil(result.length / 2)
  return result.reduce((result: { title: string; desc: string[] }[][], current, index) => {
    if (index % groupSize === 0) result.push([])
    result[result.length - 1].push(current)
    return result
  }, [])
}
