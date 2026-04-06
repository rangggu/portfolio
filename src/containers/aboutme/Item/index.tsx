import { Dispatch, SetStateAction } from "react"

interface Props {
  title: string
  info: { title?: string; desc: string }[]
  idx?: number
  setModal: Dispatch<SetStateAction<number>>
}

export default function Item({ title, idx, setModal }: Props) {
  return (
    <div
      className="relative flex w-full h-auto max-h-24 py-5 px-8 bg-black bg-opacity-15 rounded-xl duration-500 transition-all hover:bg-white hover:bg-opacity-5 overflow-hidden cursor-pointer"
      onClick={() => setModal(idx || 0)}
    >
      <h2 className="py-3 transition-all text-body1 delay-200">{title}</h2>
    </div>
  )
}
