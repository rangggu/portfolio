interface Props {
  title: string
  overview?: {
    problem: string[]
    solution: string[]
  }
}

export default function Overview({ overview, title }: Props) {
  return (
    <div className="flex flex-col justify-between w-[45%] h-full">
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-white bg-opacity-10 text-gray100">
        {overview?.problem.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-body1 font-semibold">{`${title}은(는),`}</h4>
        <ul className="flex flex-col gap-2 ml-6">
          {overview?.solution.map((item, index) => (
            <li key={index} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
