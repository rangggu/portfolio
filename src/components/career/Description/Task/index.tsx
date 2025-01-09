import { CAREER } from "@/data/career"

export default function Task() {
  const { task } = CAREER
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h3 className="text-gray100 font-semibold">담당 업무</h3>
      <ul className="flex flex-col gap-2.5 w-full ml-5 font-light">
        {task.map((item, index) => (
          <li className="list-disc" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
