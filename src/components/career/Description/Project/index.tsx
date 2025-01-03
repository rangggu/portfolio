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
      subtitle: "인체 균형 능력을 측정하여 개인 맞춤형 솔루션을 제공하는 모바일 앱",
      desc: [
        "각종 데이터 분석 차트 및 PDF 출력 기능 개발",
        "주기적/지속적인 소통으로 고객 요구사항을 업데이트에 반영",
        "프로그램 시연에 참여하여 사용자 유입을 촉진, 재이용률 40% 증가",
      ],
    },
    {
      title: "발형상 균형 분석 서비스",
      subtitle: "발형상 분석을 통해 사용자의 균형 상태를 실시간으로 제공하는 데스크톱 앱",
      desc: [
        "터치 스크린이 탑재된 키오스크에 최적화된 Electron 앱 구현",
        "발형상 감지 센서 프로세스와 실시간 연동 수행",
        "Heatmap 시각화 설계로 고객사 만족도 85% 이상 달성",
      ],
    },
    {
      title: "기업/행사 정보 안내 서비스",
      subtitle: "로컬 환경에 최적화되어 다양한 정보를 표시/제공하는 데스크톱 앱",
      desc: [
        "터치 스크린이 탑재된 키오스크에 최적화된 Electron 앱 구현",
        "오프라인 데이터 관리를 가능하게 하여 유지보수 편의성을 향상, 고객사 만족도 85% 이상 달성",
      ],
    },
  ]

  return (
    <div className="flex flex-col justify-between gap-2.5 w-[48%]">
      <div className="relative flex items-center w-full">
        <h3 className="text-gray100 font-semibold">참여 프로젝트</h3>
        <MoreButton
          right={0}
          onClick={() => {
            scrollToSection(TAB.PROJECT)
          }}
        />
      </div>
      <div className="flex flex-col gap-1.5 w-full h-[422px] text-body2">
        {PROJECT.map((item, index) => (
          <Item {...item} key={index} project={project} setProject={setProject} />
        ))}
      </div>
    </div>
  )
}
