import { useSectionsContext } from "@/contexts/SectionContext"
import { TAB } from "@/types"
import { MdKeyboardArrowRight } from "react-icons/md"

export default function Prologue() {
  const { scrollToSection } = useSectionsContext()

  return (
    <div className="flex flex-col items-center justify-center gap-28 w-full h-full">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-title3">
          날 것인 아이디어에
          <strong className="text-title2 text-yellow500"> 저만의 가치와 철학</strong>을 담아냅니다.
        </h2>
        <h3 className="text-subtitle3">
          <strong className="text-subtitle2">사용자 친화적인 경험</strong>과
          <strong className="text-subtitle2"> 최신 기술</strong>을 더해 아이디어를 완성합니다.
        </h3>
      </div>
      <div className="relative flex gap-12 w-3/4 h-fit p-14 text-gray100 bg-black bg-opacity-15 rounded-3xl font-normal text-body1">
        <div className="flex flex-col gap-16 w-1/2 h-full">
          <p>
            학부 시절 간단한 코드 구현 실습을 하면서 코드를 작성하고, 그 결과가 화면에 자유롭게
            구성되는 과정에서 큰 매력을 느꼈습니다. 이 경험을 통해 프론트엔드 직무에 대해 큰 관심을
            갖게 되었습니다.
          </p>
          <p>
            2년차 프론트엔드 개발자로서 다양한 서비스의 기획 단계부터 개발, 배포, 그리고 운영까지의
            <strong className="text-white font-semibold"> 전체 프로세스</strong>를 경험했습니다.
            특히, 하나의 서비스를 <strong className="text-white font-semibold"> 꾸준히 개선</strong>
            하며 사용성을 높이고, <strong className="text-white font-semibold"> 성능 최적화</strong>
            와 <strong className="text-white font-semibold"> 사용자 편의성 강화</strong>를 통해
            서비스 가치를 높인 경험이 있습니다. 앞으로도 필요한 가치를 제공하는 개발자가 되는 것을
            목표로 삼고 있습니다.
          </p>
        </div>
        <div className="flex flex-col gap-16 w-1/2 h-full">
          <p>
            개발에서 <strong className="text-white font-semibold"> 커뮤니케이션</strong>은 매우
            중요하다고 생각합니다. 원활한 소통으로 기획의 의도나 문제의 원인을 파악할 수 있으며,
            생각치 못한 해결 방법을 찾을 수 있습니다. 저는 대화와 문서를 통해 명확하게 전달하는 것을
            지향하며, 커뮤니케이션 문서를 적극적으로 생성하여 팀 구성원의
            <strong className="text-white font-semibold"> 업무 자동화 및 효율성 증대</strong>에
            기여한 경험이 있습니다.
          </p>
          <p>
            새로운 기술 습득과 자기계발을 위해 사이드 프로젝트를 진행하며 다양한 분야에서 경험을
            쌓고 있습니다. 변화하는 기술 환경에 맞춰 지속적으로 성장하며 앞으로도 더 많은 도전과
            경험을 쌓아가고 싶습니다.
          </p>
        </div>
        <button
          className="absolute bottom-3 right-3 flex items-center text-caption1 font-light text-gray300"
          onClick={() => scrollToSection(TAB.ABOUTME)}
        >
          more
          <MdKeyboardArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
