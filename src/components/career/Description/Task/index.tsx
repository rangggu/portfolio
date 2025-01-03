export default function Task() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <h3 className="text-gray100 font-semibold">담당 업무</h3>
      <ul className="flex flex-col gap-2.5 w-full ml-5 font-light">
        <li className="list-disc">자사 서비스 프론트엔드 엔지니어로 근무</li>
        <li className="list-disc">신규 기능 개발 및 유지 보수</li>
        <li className="list-disc">사용 기술 및 서비스 화면 대규모 업데이트 진행</li>
        <li className="list-disc">생산성 증대를 위한 레거시 청산 및 컴포넌트 재설계</li>
      </ul>
    </div>
  )
}
