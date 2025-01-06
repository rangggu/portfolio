import MoreButton from "@/components/_common/MoreButton"
import { useSectionsContext } from "@/contexts/SectionContext"
import { TAB } from "@/types"
import Item from "./Item"
import { useState } from "react"

export default function Project() {
  const [project, setProject] = useState<string>("디지털 사이니지 통합 관제 플랫폼")
  const { scrollToSection } = useSectionsContext()

  const PROJECT = [
    {
      title: "디지털 사이니지 통합 관제 플랫폼",
      subtitle: "DID, LED 등의 다양한 디지털 사이니지를 통합 관제 및 제어하는 솔루션",
      desc: [
        "10+ 공공기관 및 기업 대상으로 안정적 서비스 제공",
        "리액트 마이그레이션 후 안정성 향상 및 장애 발생률 50% 감소",
        "컴포넌트 및 구조 재설계로 개발 생산성 향상",
      ],
    },
    {
      title: "인체 균형 능력 분석 서비스",
      subtitle: "인체 균형 능력측정 및 맞춤 솔루션을 제공하는 모바일 앱",
      desc: [
        "연령 모드에 따른 서비스 화면 개선",
        "측정 장치와의 연동 기능 구현",
        "각종 데이터 차트 및 PDF 출력 기능 개발",
      ],
    },
    {
      title: "기업/행사 정보 안내 서비스",
      subtitle: "다양한 정보를 표시/제공하는 키오스크 전용 데스크톱 앱",
      desc: [
        "Electron을 통한 데스크톱 앱 구현",
        "오프라인 데이터 관리를 가능하게 하여 유지보수 편의성을 향상, 고객사 만족도 85% 이상 달성",
      ],
    },
  ]

  return (
    <div className="flex flex-col justify-between gap-3 w-[48%]">
      <div className="relative flex items-center w-full">
        <h3 className="text-gray100 font-semibold">참여 프로젝트</h3>
        <MoreButton
          right={0}
          onClick={() => {
            scrollToSection(TAB.PROJECT)
          }}
        />
      </div>
      <div className="flex flex-col gap-3 w-full h-[422px] text-body2">
        {PROJECT.map((item, index) => (
          <Item {...item} key={index} project={project} setProject={setProject} />
        ))}
      </div>
    </div>
  )
}
