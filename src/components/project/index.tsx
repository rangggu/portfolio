import Item from "./Item"

export interface ProjectCardType {
  title: string
  subtitle: string
  background: string
  desc: string[]
  date: string
  tag: "직장" | "사이드" | "개인"
}

export default function Project() {
  const LEFT_PROJECT: ProjectCardType[] = [
    {
      title: "Bitlight",
      subtitle: "디지털 사이니지 통합 관제 플랫폼",
      background: "/images/project/bitlight.png",
      desc: [
        "10+ 공공기관 및 기업 대상으로 안정적 서비스 제공",
        "리액트 마이그레이션 후 안정성 향상 및 장애 발생률 50% 감소",
        "컴포넌트 및 구조 재설계로 개발 생산성 향상",
      ],
      date: "@2023. 09 ~ 2024. 12",
      tag: "직장",
    },
    {
      title: "Lily-Portfolio",
      subtitle: "개인 포트폴리오 사이트",
      background: "/images/project/portfolio.png",
      desc: [
        "1人 개인 프로젝트",
        "Figma를 통한 디자인 시안 제작",
        "Git Action을 활용한 CI/CD 구축 및 배포 자동화",
      ],
      date: "@2024. 12 ~ ing",
      tag: "개인",
    },
    {
      title: "SuperPosition",
      subtitle: "온라인 전시 및 작품 거래 서비스 플랫폼",
      background: "/images/project/superposition.png",
      desc: [
        "개발팀(FE 2명, BE 3명) 프론트엔드 총괄",
        "MVP 출시 및 스케일업",
        "실제 서비스 페이지 및 백오피스 개발",
        "QR 스캔 도입으로 사용자 유입률 30% 향상",
      ],
      date: "@2023. 11 ~ 2024. 08",
      tag: "사이드",
    },
  ]
  const MIDDIE_PROJECT: ProjectCardType[] = [
    {
      title: "Dynamic Balance",
      subtitle: "인체 균형 능력측정 및 맞춤 솔루션을 제공하는 모바일 앱",
      background: "/images/project/balance.png",
      desc: [
        "연령 모드에 따른 서비스 화면 개선",
        "측정 장치와의 연동 기능 구현",
        "각종 데이터 차트 및 PDF 출력 기능 개발",
      ],
      date: "@2023. 09 ~ 2024. 12",
      tag: "직장",
    },
    {
      title: "말랑트립",
      subtitle: "택시 카풀 여행 플랫폼",
      background: "/images/project/mallang.png",
      desc: [
        "개발팀(FE 2명, BE 3명) 프론트엔드 팀원",
        "초기 스타트업 프로세스를 경험",
        "ver 1.0 유지보수 및 버그/장애 픽스",
        "ver 2.0 마이그레이션 진행",
      ],
      date: "@2024. 11 ~ ing",
      tag: "사이드",
    },
    {
      title: "What's in my basket",
      subtitle: "상품 확인 및 장바구니 구매 사이트",
      background: "/images/project/whatsinmybasket.png",
      desc: ["1人 개인 프로젝트", "기존 프로젝트 리팩토링 경험", "반응형 디자인 설계"],
      date: "@2023. 07.",
      tag: "개인",
    },
  ]
  const RIGHT_PROJECT: ProjectCardType[] = [
    {
      title: "기업/행사 정보 안내 프로그램",
      subtitle: "다양한 정보를 표시/제공하는 키오스크 전용 데스크톱 앱",
      background: "/images/project/black.jpg",
      desc: [
        "Electron을 통한 데스크톱 앱 구현",
        "오프라인 데이터 관리를 가능하게 하여 유지보수 편의성을 향상, 고객사 만족도 85% 이상 달성",
      ],
      date: "@2024. 01.",
      tag: "직장",
    },
    {
      title: "MineSweeper Game",
      subtitle: "지뢰찾기 게임",
      background: "/images/project/minesweeper.png",
      desc: ["1人 개인 프로젝트", "게임 디자인 및 개발", "재귀 및 스택을 통한 지뢰 찾기 로직 설계"],
      date: "@2024. 10.",
      tag: "개인",
    },
    {
      title: "HeyTossMe",
      subtitle: "예약 서비스 통합 거래 플랫폼",
      background: "/images/project/heytoss.png",
      desc: [
        "개발팀(FE 2명, BE 3명) 프론트엔드 총괄",
        "KaKao 소셜 로그인 개발",
        "stompJS를 통한 실시간 채팅 로직 구현",
        "FCM 도입으로 실시간 알림 시스템 구축",
      ],
      date: "@2023. 02 ~ 2023. 04",
      tag: "사이드",
    },
  ]

  return (
    <div className="flex items-center justify-center gap-6 w-[70%] h-full mx-auto pt-20">
      <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
        {LEFT_PROJECT.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
      <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
        {MIDDIE_PROJECT.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
      <div className="flex flex-col flex-1 items-center justify-center gap-6 w-full h-full">
        {RIGHT_PROJECT.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </div>
    </div>
  )
}
