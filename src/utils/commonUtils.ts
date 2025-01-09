import { twMerge } from "tailwind-merge"
import clsx, { ClassValue } from "clsx"
import { PROJECT } from "@/data/project"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getProjectsByGroup = (category: number[]) => {
  return PROJECT.filter((project) => category.includes(project.index))
}
