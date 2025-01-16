interface CommonType {
  index: number
  title: string
  subtitle: string
  background: string
  desc: string[]
  date: string
  overview?: { problem: string[]; solution: string[] }
  preview?: PreviewType
  skill?: { src?: string; name: string }[]
  context?: string[]
  result?: { title: string; desc: string[] }[]
  function?: {
    image?: {
      url: string
      landscape: boolean
    }
    name: string
    icon: string
    info?: { title?: string; desc: string }[]
    code?: string[]
  }[]
  meaning?: string[]
  link?: {
    web?: string
    github: string
    figma?: string
  }
}

interface CareerType extends CommonType {
  tag: "직장"
  summary: string
}

interface NotCareerType extends CommonType {
  tag: "개인" | "사이드"
}

export type PreviewType = { type: "youtube"; link: string } | { type: "image"; link: string[] }
export type ProjectType = CareerType | NotCareerType

export const PROJECT: ProjectType[] = [
  {
    index: 1,
    title: "Bitlight",
    subtitle: "디지털 사이니지 통합 관제 플랫폼",
    summary: "DID, LED 등의 다양한 디지털 사이니지를 통합 관제 및 제어하는 솔루션",
    background: "/images/project/bitlight.png",
    desc: [
      "10+ 공공기관 및 기업 대상으로 안정적 서비스 제공",
      "리액트 마이그레이션 후 안정성 향상 및 장애 발생률 50% 감소",
      "AI 기술 도입을 주도하여 서비스의 품질 향상",
    ],
    date: "@2023. 09 ~ 2024. 12",
    tag: "직장",
    overview: {
      problem: [
        "다양한 디지털 사이니지 장치를 한 번에 관리할 수 없어서 관리자가 매번 개별적으로 설정해야 해요 😩",
        "긴급 재난 및 상황이 일어나도 확인할 방법이 없어요! 😕",
      ],
      solution: [
        "DID, LED 등의 다양한 장치를 한 눈에 관리할 수 있어요",
        "실시간 장치 모니터링으로 긴급 상황 발생 시 빠르게 대응할 수 있어요!",
      ],
    },
    preview: {
      type: "image",
      link: [""],
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Recoil", src: "/images/icon/recoil.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "StompJS", src: "/images/icon/socket-io.png" },
      { name: "Figma", src: "/images/icon/figma.png" },
      { name: "Apexchart.js" },
      { name: "GCP" },
      { name: "openAI Dall-e3" },
      { name: "React Icons" },
      { name: "React Datepicker" },
      { name: "React beautiful dnd" },
      { name: "Kakao map API" },
      { name: "Daum postcode" },
    ],
    result: [
      {
        title: "사용자 경험 대폭 개선",
        desc: [
          "콘텐츠 편집 기능에 UX적으로 필요한 기능을 추가하여 사용자 편의성 향상",
          `긴급 알림 기능을 통해 각종 재난 상황에서 <strong class="font-semibold text-yellow500">50+건 이상의 알림</strong>을 실시간 전송`,
          `PC, 태블릿, 모바일 등 다양한 기기에서 <strong class="font-semibold text-yellow500">반응형 웹</strong> 구현`,
        ],
      },
      {
        title: "서비스 품질 및 신뢰성 향상",
        desc: [
          `Dall-e 이미지 생성과 GCP STT 등의 <strong class="font-semibold text-yellow500">AI 기술 도입</strong>을 주도하여 서비스 업그레이드`,
          "7가지 위젯(기상청 데이터, 뉴스, 웹뷰 등) 추가로 정보 제공의 폭 확장",
          `실시간 LED 모니터링으로 재난 상황 감지 시간을 <strong class="font-semibold text-yellow500">평균 3초 이내</strong>로 단축`,
          `<strong class="font-semibold text-yellow500">10+</strong> 공공기관과 기업에 서비스를 안정적으로 제공하여 신뢰도 향상`,
          `<strong class="font-semibold text-yellow500">기술 인증</strong> (CSAP, GS, 성능 인증 등)증명에 참여하여 서비스 신뢰성 향상에 기여`,
        ],
      },
      {
        title: "마이그레이션 및 개발 효율성 강화",
        desc: [
          `React와 TypeScript로 전환해 장애 발생 건수 <strong class="font-semibold text-yellow500">50% 이상 감소</strong>`,
          "컴포넌트를 재설계하여 개발 속도 기존 대비 향상",
          "Notion 매뉴얼 작성으로 팀원 10명의 협업 및 업무가 원활하도록 기여",
        ],
      },
      {
        title: "배포 관리 및 장애 해결",
        desc: [
          "내부 서버 업데이트 자동화로 배포 시간을 절약",
          `CS 팀과 협력해 <strong class="font-semibold text-yellow500">30+</strong>건의 장애를 신속히 해결하여 서비스 중단 시간을 감소`,
        ],
      },
    ],
    function: [
      {
        name: "레거시 시스템 개편 및 리팩토링",
        icon: "🔧",
        info: [
          {
            title: "코드 구조 리팩토링",
            desc: `사이니지 내부 PC에 설치되는 프로그램의 코드 구조를 유지보수가 
            쉽도록 리팩토링했습니다. 특히, 하나에 몰려 있던 index.js 파일을 
            기능별로 나눠 정리해 가독성을 크게 개선했습니다. 또한, 컴포넌트와 
            전체 구조를 재설계하여 개발 생산성을 높이고 확장성을 강화했습니다.`,
          },
          {
            title: "TypeScript와 React로 개편",
            desc: `기존 프로젝트를 TypeScript와 React 기반으로 전환해 개발 효율성과 
            안정성을 높였습니다. 리액트 마이그레이션 후 장애 발생률이 50% 줄어들어 
            안정성이 크게 향상되었습니다.`,
          },
          {
            title: "UI/UX 리뉴얼",
            desc: `UI와 UX를 새롭게 기획하고 리뉴얼을 진행했습니다. 우선 타 플랫폼의 
            사례를 조사하고 비용을 분석하여 리뉴얼을 제안하였고, 이후 팀원들과 ver 1.1을 
            구현하며 사용자 경험을 개선했습니다.`,
          },
          {
            title: "콘텐츠 편집 기능 개선",
            desc: `사용자가 콘텐츠를 쉽게 편집할 수 있도록 에디터 기능을 
            개선했습니다. drag&drop, 콘텐츠 회전, 확대/축소, 그룹화 같은 
            실용적인 기능을 추가해 사용자 만족도를 높였습니다.`,
          },
        ],
      },
      {
        name: "실시간 데이터 및 모니터링 기능 개발",
        icon: "📊",
        info: [
          {
            title: "실시간 데이터 기반 차트 개발",
            desc: `Web-socket 기술과 stompJS 라이브러리를 사용해 PCB 
             카드에서 데이터를 1초 간격으로 실시간으로 수집했습니다. 
             수집한 데이터를 ApexChart.js를 통해 시각화하고, 실시간 
             LED 상태를 모니터링할 수 있는 감시제어 페이지를 설계 및 
             구현했습니다.`,
          },
          {
            title: "실시간 위젯 개발",
            desc: `기상청 데이터를 활용해 날씨와 대기 정보를 제공하는 
            위젯과 함께 시계, 슬라이드, 뉴스, 웹뷰 등 다양한 실시간 위젯을 
            개발해 사용자 경험을 더욱 풍부하게 만들었습니다.`,
          },
          {
            title: "긴급 알림 기능 구현",
            desc: `실시간 재난 문자 API를 활용해 긴급 알림 기능을 구현하여 
            사용자 안전성을 높였습니다.`,
          },
        ],
      },
      {
        name: "반응형 웹 및 사용자 편의 기능 개발",
        icon: "💻",
        info: [
          {
            title: "반응형 웹 구축",
            desc: `PC, 노트북, 태블릿 등 다양한 기기에서 최적의 사용자 경험을 
            제공하도록 반응형 웹을 설계하고 구현했습니다.`,
          },
          {
            title: "무한 스크롤 구현",
            desc: `무한 스크롤링 기능을 구현하여 사용자들이 콘텐츠를 끊김 없이 
            탐색할 수 있도록 편의성을 높였습니다.`,
          },
          {
            title: "커뮤니티 개발",
            desc: `서비스 내 커뮤니티를 개발하여 사용자들이 소통하고 정보를 
            공유할 수 있는 공간을 마련했습니다.`,
          },
          {
            title: "타임라인 기능 개발",
            desc: `일간 및 주간 단위로 일정을 관리할 수 있는 타임라인 기능을 
            개발했습니다.`,
          },
          {
            title: "캘린더 및 메모 기능 개발",
            desc: `사용자가 일정과 메모를 효율적으로 관리할 수 있도록 캘린더 및 
            메모 기능을 구현했습니다.`,
          },
        ],
      },
      {
        name: "AI 및 음성인식 기술 도입",
        icon: "🤖",
        info: [
          {
            title: "실시간 음성인식 기능 개발",
            desc: `react-speech-recognition과 Google Cloud Platform 기술을 
            활용하여 실시간 음성인식(STT) 기능을 구현했습니다. 이를 통해 음성 
            입력의 정확도를 높이고 다양한 사용 사례에 대응할 수 있도록 각종의 
            함수와 기반을 마련했습니다.`,
          },
          {
            title: "AI 이미지 생성 기능 개발",
            desc: `DALL-E 이미지 생성 기술을 활용해 사용자가 원하는 스타일과 
            주제에 맞춘 AI 기반 이미지를 생성할 수 있는 기능을 개발했습니다.`,
          },
        ],
      },
      {
        name: "운영 및 배포 관리",
        icon: "🚀",
        info: [
          {
            title: "데이터베이스 관리",
            desc: `HeidiSql을 이용해 쿼리를 생성하고 MariaDB를 업데이트하여 
            데이터베이스 운영을 관리했습니다.`,
          },
          {
            title: "서버 업데이트 및 관리",
            desc: ` Ubuntu와 WinSCP를 사용하여 클라우드 서버를 효율적으로 
            업데이트하고 관리했습니다.`,
          },
          {
            title: "프로그램 설치",
            desc: `고객사 PC에 필요한 프로그램을 설치하고 설정 작업을 
            수행했습니다.`,
          },
          {
            title: "SSL 인증서 갱신",
            desc: `서비스 보안을 강화하기 위해 SSL 인증서를 정기적으로 
            갱신했습니다.`,
          },
        ],
      },
      {
        name: "CS 및 협업 환경 개선",
        icon: "🤝",
        info: [
          {
            title: "버그 및 장애 대응",
            desc: `CS팀과 협업하여 발생한 버그 및 장애를 실시간으로 대응하며 
            문제를 해결했습니다.`,
          },
          {
            title: "업무 매뉴얼 작성",
            desc: `Notion을 활용하여 버그 대응 방법, 코드 설명 등을 포함한 
            업무 매뉴얼을 작성하고 팀과 공유했습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `이 프로젝트는 제가 처음으로 직장에서 주도적으로 맡아 진행한 일이었기에 
      더욱 애정이 가고 특별한 의미가 있습니다. v1.0이 완성된 시점에 입사하여 
      이후 버전업을 맡아 진행했는데, 새로운 기능들을 추가하고 리액트, 
      타입스크립트로 마이그레이션을 처음 진행해 보면서
      프로젝트뿐만 아니라 제 스스로도 성장하고 있다는 것을 느낄 수 있었습니다. 
      특히, 높은 안정성과 신뢰성이 요구되는 프로젝트였던 만큼, 작은 디테일 
      하나하나에 신경 써서 구현해야 했습니다. 과정이 쉽지는 않았지만 그만큼 
      개발자로서 한층 더 성숙해질 수 있었던 값진 경험이었습니다.`,
      `새로운 기술을 배우고 적용했던 경험도 이 프로젝트에서 가장 기억에 남는 부분 
      중 하나입니다. 처음에는 빠르게 기능을 구현하는 것이 목표였기 때문에, 
      React-speech-recognition을 사용해 실시간 음성인식 기능을 구현했습니다. 
      하지만 이 기술이 이미 업데이트가 종료된 레거시 기술이라는 점을 알게 되었고, 
      장기적으로 사용하기에는 한계가 있을 것이라고 판단했습니다. 이에 GCP STT를 
      포함해 다양한 STT API를 조사하고 테스트해 보았습니다. 여러 플랫폼을 비교한 
      결과, GCP STT API가 구현이 간단하면서도 인식률이 가장 뛰어나다는 점을 
      확인했고, 최종적으로 이를 도입할 수 있었습니다. 이렇게 기존 기술의 문제점을 
      인지하고 대체 기술을 탐구하며 직접 적용해보며 큰 보람을 느꼈습니다.`,
      `DALL-E를 활용한 AI 이미지 생성 기능 추가도 의미 있는 도전이었습니다. 
      사용자가 원하는 스타일과 주제를 기반으로 이미지를 생성할 수 있는 이 기능은 
      플랫폼의 가능성을 확장하는 중요한 계기가 되었습니다. 처음에는 API 연동 과정에서 
      예상치 못한 오류들이 발생해 어려움을 겪었지만, 문제를 하나씩 해결하며 결국 
      안정적으로 구현할 수 있었습니다. 이러한 과정을 통해 기술적인 시행착오가 
      개발자로서의 성장을 위한 중요한 과정임을 깨달았습니다.`,
      `프로젝트를 진행하며 예상치 못한 아쉬움과 팀 내 갈등도 겪었지만, 이 과정에서도 
      많은 것을 배울 수 있었습니다. 공공기관과 기업을 주요 
      대상으로 하는 프로젝트 특성상, 보안을 최우선으로 고려해야 했기에 내부망 
      서버를 사용해야 했습니다. 이로 인해 페이지 클릭 이벤트나 체류 시간 같은 
      사용자 데이터를 수집하거나 분석할 기회가 없었습니다. 이러한 데이터를 
      활용할 수 있었다면 사용자 경험을 더욱 세밀하게 개선할 수 있었을 텐데, 
      보안 정책으로 인해 이를 시도할 수 없었던 점이 가장 아쉬웠습니다. 
      그럼에도 제한된 환경 속에서 가능한 최선을 다해 사용자 중심의 기능을 구현하며 
      의미 있는 결과를 만들어낼 수 있었습니다.`,
      `또한, UX가 고려된 기능을 추가하는 과정에서 구조적 한계를 마주하기도 
      했습니다. 기존 시스템에서 해당 기능을 적용하려면 일부 구조를 수정해야 
      했지만, 팀 내부에서는 이에 대한 우려와 신중한 접근을 요구하는 목소리가 
      있었습니다. 하지만 저는 이 변경이 사용자 경험을 위해 반드시 필요하다고 
      판단했고, 이를 설득하기 위해 다양한 레퍼런스와 사례를 조사해 자료를 
      준비했습니다. 결과적으로 기존 구조를 최소한으로 변경하면서도 필요한 
      기능을 구현할 수 있었고, 사용자 만족도를 높이는 데 기여했습니다. 
      이를 통해 기술적 성취를 넘어 제한적인 상황 속에서도 최적의 
      해결책을 찾는 경험을 해볼 수 있었습니다.`,
    ],
  },
  {
    index: 2,
    title: "Dynamic Balance",
    subtitle: "인체 균형 능력 분석 서비스",
    summary: "인체 균형 능력측정 및 맞춤 솔루션을 제공하는 모바일 앱",
    background: "/images/project/balance.png",
    desc: [
      "UI/UX 전면 개편 및 신규 기능 도입으로 사용자 경험 개선",
      "PDF 결과지 출력 기능 추가로 재이용률 40% 증가",
      "데이터 차트 시각화를 통해 직관적인 결과 제공",
    ],
    date: "@2023. 09 ~ 2024. 12",
    tag: "직장",
    overview: {
      problem: [
        "사용자가 오프라인에서 결과를 활용하기 어려워요 😩",
        "UI가 아동 중심으로 설계돼서 성인 사용자에게는 적합하지 않은 부분이 있어요 😕",
      ],
      solution: [
        "PDF 출력 기능으로 사용자가 결과지를 바로 받아볼 수 있어요!",
        "연령별 맞춤 UI를 제공해 성인 사용자도 편리하게 이용할 수 있도록 개선했어요.",
      ],
    },
    preview: {
      type: "image",
      link: [""],
    },
    skill: [
      { name: "React Native", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Recoil", src: "/images/icon/recoil.png" },
      { name: "Styled Components", src: "/images/icon/styled-components.png" },
      { name: "nativewind", src: "/images/icon/tailwind.png" },
      { name: "Figma", src: "/images/icon/figma.png" },
      { name: "Node.js", src: "/images/icon/node.png" },
    ],
    result: [
      {
        title: "사용자 경험 대폭 개선",
        desc: [
          `UI/UX 전면 개편을 주도하여 사용자 경험을 개선`,
          `PDF 출력 기능 추가로 사용자 <strong class="font-semibold text-yellow500">재이용률 40%</strong> 증가 및 만족도 설문조사에서 <strong class="font-semibold text-yellow500">긍정적 피드백 비율 15%</strong> 증가`,
          `아동 및 성인용 모드 추가와 가로모드 옵션 도입으로 다양한 사용자층 확보`,
        ],
      },
      {
        title: "신규 기능 도입 및 서비스 안정성 강화",
        desc: [
          `<strong class="font-semibold text-yellow500">Backend API 개발</strong>로 과거 데이터를 검색하고 관리할 수 있는 기능 구현`,
          `측정 데이터를 기반으로 한 다양한 <strong class="font-semibold text-yellow500">차트 구현</strong>으로 직관적인 이해 가능`,
          "측정 장치 연결 장애를 해결하여 서비스 안정성을 강화",
        ],
      },
      {
        title: "사용자 확대와 시장 인지도 향상",
        desc: [
          `각종 컨퍼런스에서 <strong class="font-semibold text-yellow500">프로그램 시연</strong>을 통해 신규 사용자 유입과 서비스 홍보 효과 달성`,
          "적극적인 사용자 피드백 반영으로 서비스 품질을 지속적으로 개선",
        ],
      },
    ],
    function: [
      {
        name: "UI/UX 개선 및 개발",
        icon: "🎨",
        info: [
          {
            title: "UI 전면 개편",
            desc: `디자인팀과 협업하여 새로운 UI를 기획했으며, 기존에 사용하던 
            Styled-Components 스타일 라이브러리 대신 nativewind를 도입하여 
            성능을 개선하고자 했습니다. 이를 통해 사용자 인터페이스를 전면 
            재설계하고 사용자 경험 개선에 기여했습니다.`,
          },
          {
            title: "연령별 모드 추가",
            desc: `기존에는 아동 모드로만 앱이 구성되어 있었는데, 다양한 
            사용자층을 확보하고 싶다는 고객사의 요구사항에 맞추어 성인 사용자를 
            위한 맞춤형 UI를 설계했습니다.`,
          },
          {
            title: "가로 모드 추가",
            desc: `세로형 키오스크 뿐만 아니라 가로형 키오스크나 태블릿 
            등에서도 해당 앱을 활용할 수 있도록 가로 모드 옵션을 추가했습니다. 
            앱 실행 시 장치의 기본 설정값을 자동으로 감지하도록 설계하여, 가로 
            모드로 설정된 장치에서는 앱이 자동으로 가로 모드로 실행되도록 구현했습니다.`,
          },
        ],
      },
      {
        name: "데이터 관리 및 시각화",
        icon: "📊",
        info: [
          {
            title: "데이터 차트 시각화",
            desc: `측정 장치로부터 실시간으로 받아온 데이터를 가공 및 분석하여 
            시각적으로 표현할 수 있도록 차트를 개발했습니다. 다양한 차트 종류를 활용하여 
            각 차트가 어떤 결과를 나타내고자 하는지 명확히 드러나도록 구현하고자 했습니다.`,
          },
          {
            title: "Backend API 개발",
            desc: `Node.js와 Express로 구성된 기존의 서버 로직을 활용하여 
            과거 데이터를 검색하고 관리할 수 있는 API를 개발했습니다. 
            이를 기반으로 최근 6개월간의 데이터를 조회하고, 이를 막대 그래프로 
            시각화하는 기능을 추가했습니다.`,
          },
        ],
      },
      {
        name: "신규 기능 도입 및 유지보수",
        icon: "🔧",
        info: [
          {
            title: "PDF 출력 기능 구현",
            desc: `사용자가 자신의 측정 결과를 파일로 소장할 수 있도록 
            PDF 파일로 저장하는 기능을 추가했습니다. HTML로 동적으로 결과지를 
            생성한 후 이를 PDF로 변환하여, 결과 데이터를 오프라인에서도 
            활용할 수 있도록 설계했습니다.`,
          },
          {
            title: "장치 연결 안정화",
            desc: `측정 장치의 블루투스 모듈 변경으로 인해 발생한 연결 문제를 
            분석하고 해결했습니다. 이를 통해 장치 연결 안정성을 강화하고 
            서비스의 신뢰도를 높였습니다.`,
          },
          {
            title: "지속적인 서비스 개선",
            desc: `고객사의 지속적인 피드백을 수용하여 서비스 품질을 개선하고자
             노력하였으며, 고객 요구사항에 맞춘 새로운 기능들을 성공적으로 
             개발했습니다.`,
          },
        ],
      },
      {
        name: "사용자 유입 및 확대",
        icon: "📢",
        info: [
          {
            title: "컨퍼런스 시연 및 홍보",
            desc: `여러 컨퍼런스에서 프로그램을 시연하며 신규 사용자 유입을 
            유도했습니다. 균형 능력 측정 과정을 직접 보여주며 프로그램의 장점을 
            강조하고, 사용자들로부터 긍정적인 반응을 이끌어내고자 했습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `이번 프로젝트는 제가 처음으로 React-Native를 사용해 진행한 프로젝트라는 
      점에서 매우 의미가 깊습니다. React와 비슷한 점이 많아 비교적 익숙한 
      환경에서 시작할 수 있었고, 큰 진입장벽 없이 유지보수와 기능 개발을 
      성공적으로 수행할 수 있었습니다. React-Native의 구조와 동작 방식을 배우는 
      과정에서 모바일 애플리케이션 개발에 대한 새로운 인사이트를 얻었고, 이를 
      활용하여 안정적인 서비스를 제공할 수 있었습니다.`,
      `또한, 이번 프로젝트를 통해 처음으로 백엔드 API 개발에 새롭게 도전해볼 
      수 있었습니다. Node.js를 활용해 백엔드 API를 작성하면서 
      처음에는 낯설고 어려운 부분이 많았지만, JavaScript의 친숙함 덕분에 빠르게 
      적응할 수 있었습니다. 해결이 어려운 문제에 부딪혔을 때는 사수와 협업하며, 
      관련 문서와 자료를 참고해 하나씩 문제를 해결해 나갔습니다. 이러한 과정을 
      통해 서버와 클라이언트의 상호작용을 깊이 이해하게 되었고, 서비스 전체의 
      흐름을 파악하며 개발자로서의 시야를 넓힐 수 있었습니다.`,
      `가장 기억에 남는 순간은 컨퍼런스에 참가하여 
      프로그램을 직접 시연하며 사용자들과 대화를 나누었을 때인 것 같습니다. 특히, 
      처음 도입된 PDF 출력 기능을 선보였을 때 "정말 유용하다", "편리하다"는 
      사용자들의 반응을 들으며, 내가 만든 기능이 실제로 가치를 발휘하고 있다는 
      사실을 실감할 수 있었습니다. 또한, 현장에서 들은 다양한 피드백 덕분에 
      이후 기능을 개선하고 새로운 아이디어를 추가하는 데 구체적인 방향을 
      잡을 수 있었습니다.`,
      `이번 프로젝트는 익숙하지 않은 기술과 환경에 도전하며 많은 것을 배우고 
      성장할 수 있었던 값진 경험이었습니다. 처음에는 두려움도 있었지만, 
      문제를 하나씩 해결하면서 자신감을 얻을 수 있었습니다. 특히, 직접 구현한 
      기능이 사용자들에게 긍정적인 반응을 얻고 실제로 도움이 되는 모습을 
      보며 개발자로서 한 단계 성장했다고 느꼈습니다. 이번 경험을 통해 
      앞으로 새로운 도전을 마주할 때도 이번 프로젝트에서 쌓은 자신감과 경험을 
      바탕으로 더욱 적극적으로 임할 수 있을 것 같습니다.`,
    ],
  },
  {
    index: 3,
    title: "기업/행사 정보 안내 프로그램",
    subtitle: "다양한 정보를 표시/제공하는 키오스크 전용 데스크톱 앱",
    summary: "터치 스크린 및 키오스크에 최적화되어 정보를 제공/안내하는 데스크톱 앱",
    background: "/images/project/black.jpg",
    desc: [
      "Electron을 통한 데스크톱 앱 구현",
      "오프라인 데이터 관리를 가능하게 하여 유지보수 편의성을 향상, 고객사 만족도 85% 이상 달성",
    ],
    date: "@2024. 01.",
    tag: "직장",
    overview: {
      problem: [
        "프로그램 내에 올려질 이미지를 매달 변경하고 싶어요 😶",
        "오프라인 환경에서도 안내 프로그램을 사용하고 싶어요..😔",
      ],
      solution: [
        "관계자가 로컬 파일을 쉽게 교체할 수 있도록 설계되었어요!",
        "Electron을 기반으로 오프라인 환경에서도 프로그램이 원활히 작동하도록 개발되었어요",
      ],
    },
    preview: {
      type: "image",
      link: [""],
    },
    skill: [
      { name: "Electron", src: "/images/icon/electron.png" },
      { name: "React", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "Figma", src: "/images/icon/figma.png" },
      { name: "React fs" },
      { name: "React slick" },
    ],
    result: [
      {
        title: "유지보수 편의성 향상",
        desc: [
          "로컬 파일 변경만으로 최신 정보를 반영할 수 있는 시스템을 설계",
          "오프라인 데이터 관리를 가능하게 하여 유지보수 편의성을 향상, 고객사 만족도 <strong class='font-semibold text-yellow500'>85%</strong> 이상 달성",
        ],
      },
      {
        title: "개발 속도 최적화",
        desc: [
          "개발 과정에서 약 <strong class='font-semibold text-yellow500'>20% 단축</strong>된 일정으로 프로그램 구현 완료",
          "고객사 요청사항을 정확히 반영하여 조기 납품 성공",
        ],
      },
    ],
    function: [
      {
        name: "UI/UX 개발",
        icon: "🎨",
        info: [
          {
            title: "Electron 기반 설계",
            desc: `고객사의 요청에 따라 데스크톱 PC가 내장된 키오스크에서 
            프로그램을 실행할 수 있도록 Electron으로 개발을 진행했습니다. 
            키오스크 환경에 최적화된 직관적이고 반응형 UI를 설계하여 사용자 
            경험을 향상시켰습니다.`,
          },
          {
            title: "고객 맞춤형 UI 개발",
            desc: `고객사의 요구사항과 디자인팀이 제공한 시안에 맞춰 세부 
            디테일까지 신경 써서 UI를 구현했습니다. 사용자가 요구하는 화면 
            구성을 빠짐없이 충족시키며 완성도를 높였습니다.`,
          },
        ],
      },
      {
        name: "오프라인 데이터 관리 및 자동화",
        icon: "📊",
        info: [
          {
            title: "fs 모듈 활용",
            desc: `프로그램에서 표시되는 데이터를 관리하기 위해 서버나 관리 
            페이지 없이도 작동할 수 있도록 로컬 파일 시스템 접근 기능을 
            구현했습니다. react 환경에서 react-fs 라이브러리를 활용하여 
            오프라인 환경에서도 데이터를 손쉽게 관리할 수 있도록 설계했습니다.`,
          },
          {
            title: "자동 업데이트 로직 구현",
            desc: `미리 합의된 파일 구조에 따라 이미지와 데이터를 변경하면 
            프로그램이 별도의 작업 없이 이를 자동으로 반영하도록 로직을 
            설계했습니다.`,
          },
        ],
      },
      {
        name: "효율적인 개발 및 유지보수",
        icon: "🔧",
        info: [
          {
            title: "고객사 피드백 반영",
            desc: `고객사의 피드백을 적극 수용하고 요청받은 기능을 신속히 
            구현했습니다. 그 결과, 고객 만족도 설문조사에서 85% 이상의 긍정적인 
            평가를 받았습니다.`,
          },
          {
            title: "조기 납품 및 일정 단축",
            desc: `효율적인 설계와 작업 방식을 통해 개발 일정을 약 20% 
            단축했습니다. 이를 통해 고객사의 내부 일정에 여유를 제공하며 
            신뢰를 강화할 수 있었습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `이번 프로젝트는 Electron을 활용하여 데스크톱 애플리케이션을 처음으로 
      개발해본 경험으로, 저에게 큰 도전이자 배움의 기회였습니다. 기존에 주로 웹 
      개발만 진행했던 저로서는 데스크톱 환경과 키오스크 같은 특수 장비에 맞추어서
      개발하는 것이 낯설었지만, Electron의 구조와 동작 방식을 익히면서 새로운 기술에 
      대한 자신감과 성취를 얻게 되었습니다.`,
      `처음 고객사의 요구사항을 들었을 때, 데이터를 오프라인에서 관리하고 반영할 
      방법에 대해 고민이 많았습니다. 하지만 팀원들과 논의하고 여러 레퍼런스를 
      참고한 끝에, 프로그램이 로컬 파일에 직접 접근하도록 개발하면 좋겠다는 
      결론에 낼 수 있었습니다. 고객사 관계자가 로컬 파일에 이미지나 데이터를 
      변경했을 때 프로그램에 자동으로 반영되도록 설계하면, 유지보수 과정도 
      간단해질 것이라고 판단했습니다. <br />
      이 방식으로 구현을 진행하면서 로컬 파일 시스템을 활용한 데이터 관리가 
      생각보다 실용적이고 효율적이라는 점을 저로써도 새롭게 발견할 수 있었습니다. 
      유지보수가 편리해졌을 뿐만 아니라, 고객사에서도 해당 방법에 대해 매우 
      긍정적인 반응을 보였습니다. 고객사가 자체적으로 실시한 설문조사에서 
      "편리하다"는 답변이 다수를 차지하며 85% 이상의 높은 만족도를 기록하는 
      성과를 낼 수 있었습니다.`,
      `뿐만 아니라 고객사의 요구사항을 빠르게 정리하고, 이를 구현할 방안을 
      신속하게 설계한 덕분에 개발 일정을 단축할 수 있었습니다. 원래 2주로 
      계획되었던 개발 기간을 1주 반 만에 마무리하면서 예상보다 빠르게 작업을 
      완료할 수 있었습니다. 이를 통해 조기 납품이 가능해졌고, 고객사로부터 신뢰를 
      얻는 데 큰 도움이 되었습니다. 효율적인 설계와 작업 과정은 고객사의 내부 
      일정에도 여유를 제공하며 긍정적인 협업 분위기를 만드는 데 기여했습니다.`,
    ],
  },
  {
    index: 4,
    title: "Lily-Portfolio",
    subtitle: "개인 포트폴리오 사이트",
    background: "/images/project/portfolio.png",
    desc: [
      "1人 개인 프로젝트",
      "기획, 디자인, 개발 전 과정을 경험",
      "Git Action을 활용한 CI/CD 구축 및 배포 자동화",
    ],
    date: "@2024. 12 ~ ing",
    tag: "개인",
    overview: {
      problem: [
        "기존 사용하던 Notion 포트폴리오는 디자인이 일관돼요 😕",
        "가독성이 좋은 포트폴리오를 만들고 싶어요! 😎",
      ],
      solution: [
        "기획부터 디자인, 개발까지 전 과정을 직접 주도했어요!",
        "도메인을 구매하고 vercel을 이용하여 배포까지 완료했어요",
      ],
    },
    preview: {
      type: "image",
      link: ["/images/project/portfolio.png"],
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "Vercel", src: "/images/icon/vercel.png" },
      { name: "Git Action", src: "/images/icon/git.png" },
      { name: "framer-motion" },
      { name: "ContextAPI" },
      { name: "react-slick" },
    ],
    context: [
      `기존에 사용하던 Notion 포트폴리오는 기능적으로는 편리했지만, 디자인 
      측면에서 다소 일관성이 부족하다는 한계가 있었습니다. 특히, 포트폴리오를 
      보는 사람들에게 명확한 인상을 주기에는 아쉬운 부분이 많아 개선의 필요성을 
      느끼게 되었습니다. 이에 따라, 가독성이 뛰어나고 정보를 효과적으로 전달할 수 
      있는 새로운 포트폴리오를 제작하고자 했습니다.`,
      `단순히 정보만 나열하는 것이 
      아니라, 직관적인 레이아웃과 디자인으로 사용자 경험을 향상시키는 것을 
      목표로 포트폴리오를 만들었습니다. 또한, 실제로 제 포트폴리오에 관심을 가지고 
      확인하는 다양한 사용자들의 입장에서 필요한 정보가 무엇인지 고민하며 구성 
      요소를 설계했습니다. 이를 통해 보는 이들에게 신뢰와 전문성을 전달하는 것이 
      목표입니다.`,
    ],
    function: [
      {
        name: "UI/UX 디자인",
        icon: "🎨",
        info: [
          {
            title: "디자인 색상 선정 및 시안 작업",
            desc: `Figma를 사용해 사용자 친화적인 색상 팔레트를 선정했습니다. 눈에 잘 띄면서도 
            피로감을 최소화하는 색상 조합을 적용해 모든 탭의 디자인을 완성했습니다. 
            디자인 시안 작업을 통해 일관성과 미적 요소를 강화했습니다.`,
          },
          {
            title: "공통 헤더 구현",
            desc: `모든 탭에서 공통적으로 접근 가능한 헤더를 설계하고 구현하여 사용자가 
            원하는 탭으로 쉽게 이동할 수 있도록 했습니다. 이를 통해 사용자 경험을 
            일관되게 유지하며 탐색 효율성을 향상시켰습니다.`,
          },
          {
            title: "상호작용 강화",
            desc: `호버 이벤트를 전략적으로 활용하여 사용자와의 상호작용을 극대화했습니다. 
            버튼, 링크 등 주요 요소에 반응형 인터랙션을 추가해 더 나은 시각적 피드백을 
            제공했습니다.`,
          },
          {
            title: "애니메이션 활용",
            desc: `Framer Motion 라이브러리를 활용해 각 탭의 콘텐츠에 맞는 애니메이션을 
            구현했습니다. 자연스러운 전환 효과를 통해 사용자가 내용을 직관적으로 
            이해할 수 있도록 돕고, 인터랙션에 생동감을 더했습니다.`,
          },
          {
            title: "타이핑 애니메이션 구현",
            desc: `사용자 경험을 개선하기 위해 custom 훅인 useTyping을 생성하여 텍스트가 
            한 글자씩 타이핑 되는 효과를 구현했습니다. 이를 통해 콘텐츠 전달에 
            흥미를 더했습니다.`,
          },
        ],
        code: [
          `export const useTyping = (sentence: string, msDelay: number = 100): string => {
            const [word, setWord] = useState("")
            const [currentIndex, setCurrentIndex] = useState(0)
            const lastTimestampRef = useRef<number | null>(null)
          
            useEffect(() => {
              let animationFrameId: number
              const animateTyping = (timestamp: number) => {
                if (lastTimestampRef.current === null) {
                  lastTimestampRef.current = timestamp
                }
                const elapsed = timestamp - lastTimestampRef.current
                if (elapsed > msDelay && currentIndex < sentence.length) {
                  lastTimestampRef.current = timestamp
                  setWord((prev) => prev + sentence[currentIndex])
                  setCurrentIndex((prevIndex) => prevIndex + 1)
                }
                if (currentIndex < sentence.length) {
                  animationFrameId = requestAnimationFrame(animateTyping)
                }
              }
              animationFrameId = requestAnimationFrame(animateTyping)
          
              return () => {
                cancelAnimationFrame(animationFrameId)
              }
            }, [currentIndex, msDelay, sentence])
            return word
          }`,
        ],
      },
      {
        name: "페이지 리다이렉트 및 상태 유지",
        icon: "↩️",
        info: [
          {
            title: "새로고침 시 상태 유지",
            desc: `페이지가 새로고침되더라도 사용자가 보고 있던 섹션으로 자동 리다이렉트 
            되도록 설정했습니다. 이를 통해 불필요한 탐색 단계를 줄이고 사용자 경험을 
            개선했습니다.`,
          },
        ],
        code: [
          `useEffect(() => {
              const sectionId = (window.location.pathname.slice(1) as TAB) || TAB.MAIN // 기존 경로 추출
              if (window.location.pathname !== "/") {
                window.history.replaceState(null, "", "/")
              }
              scrollToSection(sectionId)
              setTab(sectionId)
            }, [])`,
          `const scrollToSection = (sectionId: TAB) => {
              const targetSection = sectionsRef.current.find((section) => section?.id === sectionId)
              if (targetSection) {
                const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset
                window.scrollTo({
                  top: sectionTop,
                  behavior: "smooth",
                })
              }
            }`,
        ],
      },
      {
        name: "SEO 최적화",
        icon: "🔍",
        info: [
          {
            title: "URL 구조 개선",
            desc: `Next.js App Router를 사용해 스크롤 시 URL이 해당 섹션 이름(예: /prologue, 
            /project)으로 변경되도록 설정했습니다. 이를 통해 검색 엔진이 페이지의 
            내용을 명확히 파악할 수 있도록 지원했습니다.`,
          },
          {
            title: "시멘틱 태그 활용",
            desc: `SEO를 고려하여 ul, li, h1~h5 등 시멘틱 태그를 적극적으로 활용했습니다. 
            각 요소의 의미에 맞게 태그를 정의하고 구조화하여 접근성과 SEO 점수를 
            향상시켰습니다.`,
          },
        ],
        code: [
          `useScrollObserver((sectionId, newUrl) => {
              if (window.location.pathname !== newUrl) {
                window.history.replaceState(null, "", newUrl)
                setTab(sectionId)
              }
            })`,
          `export const useScrollObserver = (updateUrl: (sectionId: TAB, newUrl: string) => void) => {
            const { sectionsRef } = useSectionsContext() // Context에서 sectionsRef 가져오기
          
            useEffect(() => {
              const observer = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      const sectionId = entry.target.id as TAB
                      const newUrl = sectionId === TAB.MAIN ? "/" : '/{sectionId}'
                      updateUrl(sectionId, newUrl)
                    }
                  })
                },
                {
                  root: null,
                  rootMargin: "0px",
                  threshold: 0.5,
                },
              )
          
              sectionsRef.current.forEach((section) => {
                if (section) observer.observe(section)
              })
          
              return () => {
                sectionsRef.current.forEach((section) => {
                  if (section) observer.unobserve(section)
                })
              }
            }, [sectionsRef, updateUrl])
          }`,
        ],
      },
      {
        name: "성능 최적화",
        icon: "⚡",
        info: [
          {
            title: "이미지 최적화",
            desc: `Next.js에서 제공하는 Image 컴포넌트를 사용해 이미지 크기를 최적화했습니다. 
            이를 통해 로드 시간을 단축하고 페이지 로딩 성능을 개선했습니다.`,
          },
          {
            title: "React 최적화 기법 활용",
            desc: `useMemo와 useCallback 훅을 사용하여 불필요한 렌더링을 방지했습니다. 
            컴포넌트의 성능을 향상시키고 애플리케이션의 효율성을 극대화했습니다.`,
          },
        ],
      },
      {
        name: "배포 자동화",
        icon: "🚀",
        info: [
          {
            title: "GitHub Actions를 통한 자동 배포 프로세스",
            desc: `CI/CD 파이프라인 구축을 위해 GitHub Actions를 사용했습니다. 
            코드 푸시 시 자동으로 빌드와 테스트가 실행되며, 안정성이 검증된 후에 
            자동 배포가 이루어지도록 설정했습니다. 이를 통해 운영 환경 반영 
            시간을 단축할 수 있었습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `프론트엔드 개발자라면 기능 구현뿐만 아니라 전반적인 UI/UX와 
      세부 디테일도 중요시 여겨야 된다고 생각합니다. 따라서 상황에 맞는 
      애니메이션을 더하고 다양한 사용자 상호작용을 전략적으로 적용하기 위해 
      노력했습니다. 또한, 직접 Figma로 주요 색상을 선정하고 시안 작업을 경험해 
      보면서 디자이너의 입장에서 한번 더 생각해보게 되었습니다. 직관적인 레이아웃과 시각적 피드백을 강화하면서 콘텐츠 
      배치와 색상 활용 등 작은 부분에도 신경을 쓰는 것이 전체 사용자 경험에 큰 
      영향을 준다는 것을 다시 한 번 느꼈습니다.`,
      `또한, Next.js의 App Router를 공부하고 적용하면서 새로운 라우팅 패턴에 
      대한 이해도를 높일 수 있었습니다. 기존에는 Page Router를 사용했기에 
      익숙한 방식에서 벗어나기가 쉽지 않았지만 여러 자료와 공식 문서를 
      참고하면서 점차 적응해 나갔습니다. 예상 외로 코드 구조가 간소화되는 
      기능들이 꽤 많아 페이지 라우팅 관리가 더 직관적이고 체계적으로 진행된다는 
      인상을 받았습니다. 이를 통해 프로젝트 전반의 구조를 깔끔하게 유지할 수 
      있었고, 새로 도입된 기능들을 적극적으로 활용하는 계기가 
      되었습니다.`,
      `마지막으로 배포 자동화와 도메인 구매 과정을 직접 경험해 본 점도 프로젝트 
      완성도를 높이는 데 큰 역할을 했습니다. 처음에는 도메인까지 별도로 구매할 
      필요가 있을까 고민했지만 제대로 된 포트폴리오를 구축해보자는 마음으로 
      진행했습니다. 그 결과 GitHub Actions를 이용해 빌드·테스트를 자동화하고, 
      안정성이 확보된 후 Vercel로 배포하는 파이프라인을 완성했습니다. 이렇게 
      배포 환경을 체계화하면서 운영 효율이 극적으로 향상되는 것을 직접 확인할 수 
      있었고, 앞으로 더 복잡한 프로젝트에서도 CI/CD 프로세스를 손쉽게 구축할 수 
      있을 거란 자신감이 생겼습니다.`,
    ],
    link: {
      web: "https://www.lily-developer.me/",
      github: "https://github.com/rangggu/portfolio",
    },
  },
  {
    index: 5,
    title: "말랑트립",
    subtitle: "택시 카풀 여행 플랫폼",
    background: "/images/project/mallang.png",
    desc: [
      "개발팀(FE 2명, BE 3명) 프론트엔드 팀원",
      "초기 스타트업 프로세스를 경험",
      "ver 1.0 유지보수 및 장애 해결",
      "ver 2.0 마이그레이션 주도",
    ],
    date: "@2024. 11 ~ ing",
    tag: "사이드",
    overview: {
      problem: [
        `저는 뚜벅이라서 여행갈 때 불편한 점이 많아요 😕`,
        `버스는 너무 느리고 택시는 너무 비싸서 다소 부담이 가요..`,
      ],
      solution: [
        `뚜벅이 여행자라도 편하게 여행할 수 있어요`,
        `다수의 여행자와 택시 드라이버를 매칭하여 1/n 가격으로 저렴하게 여행해요!`,
      ],
    },
    preview: {
      type: "image",
      link: [
        "/images/mallangtrip/1.png",
        "/images/mallangtrip/2.png",
        "/images/mallangtrip/3.png",
        "/images/mallangtrip/4.png",
        "/images/mallangtrip/5.png",
        "/images/mallangtrip/6.png",
        "/images/mallangtrip/7.png",
        "/images/mallangtrip/8.png",
      ],
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "Next", src: "/images/icon/next.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Redux Toolkit", src: "/images/icon/redux-toolkit.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "stompJS", src: "/images/icon/socket-io.png" },
      { name: "Github action", src: "/images/icon/git.png" },
      { name: "Swiper" },
      { name: "React Icons" },
      { name: "React Calander" },
      { name: "React Datepicker" },
      { name: "Tmap API" },
      { name: "GA4" },
      { name: "Naver Premium Log Analytics" },
      { name: "Firebase Cloud Message" },
    ],
    context: [
      `첫 직장에서 퇴사한 후, 개발자로서의 감각을 유지하며 새로운 기술을 
      실질적으로 익히고 싶다는 갈증이 있었습니다. 그러던 중, 말랑트립이라는 플랫폼을 
      알게 되었고, 뚜벅이 여행자들의 이동이라는 구체적인 문제를 해결하는 
      서비스라는 점에서 개인적으로 깊이 공감이 되었습니다. 실제로 경험해온 
      불편을 개선할 수 있는 서비스라는 점이 와닿았고, 더 나아가 버전 2.0으로의 
      확장이 예정되어 있어 다양한 개발 경험을 쌓을 수 있을 것이라 판단해 
      합류하게 되었습니다.`,
      `또한, 말랑트립은 초기 스타트업으로 각종 투자 유치를 통해 사업성을 
      검증받았다는 점에서 신뢰가 갔습니다. 뚜렷한 목표와 문제 해결을 중심으로 
      팀원들과 협력하며 서비스를 스케일업할 수 있는 환경에서, 단순히 기술적 
      역량을 키우는 것을 넘어 서비스 기획과 개선 과정에도 기여할 수 있을 것이라는 
      확신이 들었습니다. 이러한 이유로 말랑트립에 참여하게 되었고, 지금까지도 
      의미 있는 도전을 이어가고 있습니다.`,
    ],
    function: [
      {
        name: "파티 생성 및 동행 모집",
        icon: "👥",
        info: [
          {
            title: "파티 생성",
            desc: `사용자가 원하는 조건에 맞게 파티를 생성하고, Tmap API를 
            활용해 경유지와 여행지 경로를 시각적으로 설정할 수 있도록 
            구현했습니다. 여행지 순서는 드래그 앤 드롭 방식으로 자유롭게 
            변경할 수 있도록 react-beautiful-dnd 라이브러리를 사용해 
            사용자 편의성을 높였습니다.`,
          },
          {
            title: "동행 모집",
            desc: `파티 생성자는 커뮤니티 기능을 통해 동행자를 모집하고, 파티에 
            가입한 사용자와 실시간으로 소통할 수 있도록 설계되었습니다. 가입 요청이 
            발생하면 FCM(Firebase Cloud Messaging)을 활용해 파티 생성자에게 알림을 
            전송하여 즉각적인 대응이 가능하도록 구현했습니다.`,
          },
          {
            title: "커뮤니티 활용",
            desc: `사용자가 여행 정보를 공유하거나 동행자를 찾을 수 있는 
            커뮤니티 기능을 구현했습니다. 검색 및 필터 기능을 통해 사용자는 
            원하는 게시글을 쉽게 찾을 수 있도록 설계했습니다.`,
          },
        ],
      },
      {
        name: "사용자 맞춤 데이터 저장",
        icon: "🗺️",
        info: [
          {
            title: "찜하기 및 최근 본 파티 내역 확인",
            desc: `사용자가 관심 있는 여행지나 파티를 저장하여 나중에 다시 확인할 
            수 있도록 구현했습니다. 또한, 최근 본 파티 게시글을 자동으로 저장해 
            사용자가 편리하게 접근할 수 있는 내역 확인 기능을 제공했습니다. 
            각 목록들은 사용자 친화적인 UI로 제공되어 사용자의 접근성을 높였습니다.`,
          },
          {
            title: "결제/예약/작성글 내역 확인",
            desc: `사용자가 결제, 예약, 
            작성한 글 등의 활동 내역을 한눈에 확인할 수 있는 
            인터페이스를 설계했습니다. 데이터를 직관적으로 보여주기 위해 효율적인 
            데이터 렌더링 방식을 적용했습니다.`,
          },
        ],
      },
      {
        name: "프로모션 및 결제",
        icon: "💳",
        info: [
          {
            title: "프로모션 코드 지원",
            desc: `프로모션 코드를 적용하여 할인 혜택을 제공하며, 입력된 코드는 
            즉시 유효성을 검증하고 UI에 반영되도록 설계되었습니다. `,
          },
          {
            title: "결제 프로세스",
            desc: `PASS 결제 시스템과의 연동을 통해 직관적이고 안정적인 결제 
            흐름을 구현했습니다. 결제 단계에서 발생할 수 있는 사용자 혼란을 
            최소화하기 위해 명확한 단계별 안내를 제공했습니다.`,
          },
        ],
      },
      {
        name: "말랑챗 실시간 채팅",
        icon: "💬",
        info: [
          {
            title: "WebSocket을 활용한 실시간 통신",
            desc: `WebSocket과 stompJS를 활용해 실시간 채팅 기능을 구현했습니다. 
            채팅 창에서 텍스트뿐만 아니라 이미지 파일 업로드도 지원하여, 
            여행지 및 경유지 공유가 간편하도록 설계했습니다.`,
          },
          {
            title: "실시간 메시지 처리",
            desc: `구독 및 발행 기반의 메시지 처리 로직을 구축했으며, 채팅 
            데이터를 안전하게 저장하여 사용자가 이전 대화를 확인할 수 있도록 
            했습니다.`,
          },
        ],
      },
      {
        name: "권한 및 사용자 관리",
        icon: "🔧",
        info: [
          {
            title: "드라이버 및 사용자 권한 관리",
            desc: `드라이버, 사용자, 관리자 간의 권한을 명확히 구분하고, 
            각 권한에 맞는 인터페이스를 제공했습니다. 사용자마다 요구사항에 
            맞춘 환경을 제공하기 위해 권한별 데이터와 인터페이스를 설계했습니다.`,
          },
          {
            title: "사용자 데이터 관리",
            desc: `관리자 권한을 통해 사용자 데이터와 활동 내역을 확인할 수 
            있도록 구현했습니다. 필요한 경우 데이터 변경과 가공이 가능하며, 
            데이터 보안을 강화해 안정적인 관리 시스템을 구축했습니다.`,
          },
        ],
      },
      {
        name: "데이터 분석 및 사용자 행동 추적",
        icon: "📊",
        info: [
          {
            title: "GA4와 Naver Premium Log Analytics 연동",
            desc: `Google Analytics 4(GA4)와 네이버 프리미엄 로그 분석을 
            연동하여 플랫폼 내 사용자 행동 데이터를 수집하고 분석했습니다. 
            이를 통해 사용자 흐름과 주요 이용 패턴을 파악하고, 데이터를 기반으로 
            서비스 개선에 기여했습니다.`,
          },
          {
            title: "데이터 기반 의사결정 지원",
            desc: `수집된 데이터를 운영팀과 공유하여 의사결정 과정에서 실질적인 
            참고 자료로 활용했습니다. 주요 지표와 인사이트를 시각화하여 
            데이터 활용도를 극대화했습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `프로젝트에 적응하는 과정에서 실제 업무를 맡고 소스코드를 수정하는 경험이 
      매우 유익했습니다. 예를 들어, 기존에는 파티 카드만 렌더링되었지만, 
      카드 수가 적을 때 서비스가 비활성화된 것처럼 보인다는 운영팀의 피드백을 
      반영해 드라이버 카드를 추가로 렌더링하는 작업을 진행했습니다. 처음에는 
      간단한 수정이라고 생각했지만, 프로젝트의 규모와 복잡한 로직 덕분에 예상보다 
      시간이 걸렸습니다. 하지만 실제 업무를 통해 소스코드를 손보는 과정을 겪으며 
      기존 코드베이스를 깊이 이해하고 다른 개발자들의 코드를 분석하는 능력도 키울 
      수 있었습니다. 결과적으로 목표를 달성해 서비스가 더 활발해 보이도록 
      구현할 수 있어서 뿌듯함을 느낍니다.`,
      `네이버 프리미엄 로그 분석을 연동하는 작업도 처음 시도해본 일이었기에 많은 
      배움이 있었습니다. 작업 초기에는 생소한 과정이라 걱정도 많았지만, 관련 
      담당자와 적극적으로 소통하며 피드백을 반영해가며 진행했습니다. 특히, 로그 
      분석 연동 이후에는 심사와 검수를 요청하는 절차를 거쳤는데, 이를 통해 신생 
      플랫폼이 외부와 연동될 때 어떤 과정들을 거쳐야 하는지 구체적으로 알게 
      되었습니다. 또한, 신규 서비스 운영시 대부분 마주하는 흐름을 경험하고 이해할 
      수 있었습니다.`,
      `말랑트립에 합류하면서 초기 스타트업의 빠르게 변하는 환경과 프로세스를 직접 
      경험할 수 있었습니다. 비록 서비스 시작 이후 합류하여 아직 많은 부분에 
      기여하지는 못했지만, 제가 참여한 작업들이 서비스 성장에 보탬이 되는 것을 
      보며 큰 보람을 느꼈습니다. 특히, 아직 실현되지 않은 아이디어들이 많아 이를 
      하나씩 구현해 나가는 과정이 무척 기대됩니다. 현재는 버전 2.0 개발을 위한 
      SRS 정립 과정에 참여하고 있으며, 초기 스타트업의 유연한 개발 문화 속에서 
      더욱 성장하고 있습니다. 앞으로도 서비스의 발전에 기여하며 주어진 역할을 
      충실히 해내고 싶습니다.`,
    ],
    link: {
      web: "https://mallangtrip.com/",
      github: "https://github.com/Mallang-Trip/Web",
    },
  },
  {
    index: 6,
    title: "MineSweeper Game",
    subtitle: "지뢰찾기 게임",
    background: "/images/project/mine.png",
    desc: ["1人 개인 프로젝트", "게임 디자인 및 개발", "재귀 및 스택을 통한 지뢰 찾기 로직 설계"],
    date: "@2024. 10.",
    tag: "개인",
    overview: {
      problem: [
        "비즈니스 로직을 잘 설계해보고 싶어요 😶",
        "개인 프로젝트를 만든 것도 벌써 1년이 넘은 거 같아요 🙄",
      ],
      solution: [
        "인터넷 상에서 가장 유명한 게임 중 하나인 지뢰찾기를 제 버전으로 만든 프로젝트에요!",
      ],
    },
    preview: {
      type: "image",
      link: ["/images/minesweeper/1.png"],
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Redux Toolkit", src: "/images/icon/redux-toolkit.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "Vercel", src: "/images/icon/vercel.png" },
      { name: "React Icons" },
    ],
    context: [
      `직장을 다니면서 자바스크립트를 활용하여 복잡한 비즈니스 로직을 자주 
      설계하게 되었습니다. 이러한 경험을 통해 더욱 깔끔하고 명료한 코드 작성의 
      중요성을 깨닫게 되었고, 이를 위해 개인적으로 자바스크립트의 기초와 컴퓨터 
      과학(CS) 지식을 강화하고자 결심하게 되었습니다.`,
      `흔히 아는 게임이지만 실제로 
      구현하기는 그리 쉽지만은 않은 지뢰찾기 게임의 로직을 직접 구현해보는 것이 
      좋은 방법이겠다고 생각하여 이 프로젝트를 
      시작하게 되었습니다. 이를 통해 잊고 지냈던 기초적인 자바스크립트 문법과 
      알고리즘을 복습하고, 효율적인 코드 설계 방식을 학습할 수 있었습니다.`,
    ],
    function: [
      {
        name: "난이도 선택 및 저장",
        icon: "🎚️",
        info: [
          {
            title: "난이도 선택 기능",
            desc: `사용자가 초보자(8x8, 10지뢰), 중급자(16x16, 40지뢰), 
            고급자(32x16, 100지뢰) 등 다양한 난이도를 선택할 수 있도록 
            설계했습니다. 또한, 가로와 세로 크기, 지뢰 개수를 직접 입력하여 
            사용자 지정 난이도를 설정할 수 있는 기능을 구현했습니다.`,
          },
          {
            title: "난이도 저장 및 유지",
            desc: `선택한 난이도를 로컬스토리지에 저장하여 브라우저를 
            새로고침해도 이전에 설정한 난이도가 유지되도록 했습니다. 이를 통해 
            사용자는 매번 난이도를 다시 설정할 필요 없이 일관된 게임 환경을 
            즐길 수 있습니다.`,
          },
        ],
      },
      {
        name: "지뢰 배치",
        icon: "💣",
        info: [
          {
            title: "지뢰 배치 알고리즘",
            desc: `랜덤한 위치에 지뢰를 배치하는 알고리즘을 구현하여 게임의 
            변동성을 높였습니다. 처음으로 클릭했을 때 지뢰가 있는 셀을 
            클릭했다면 전체 셀의 지뢰를 재배치하고, 클릭한 셀에는 지뢰를 배치하지 
            않도록 조건을 두어 사용자 경험을 향상시켰습니다.`,
          },
          {
            title: "재귀 및 스택을 통한 지뢰 찾기 로직",
            desc: `재귀 알고리즘과 스택을 활용하여 빈 칸을 연속적으로 여는 
            기능을 구현했습니다. 이를 통해 사용자가 빈 공간을 클릭할 때 
            자연스럽게 인접한 빈 칸들이 자동으로 열리도록 설계했습니다.`,
          },
        ],
      },
      {
        name: "게임 플레이 설계",
        icon: "🎮",
        info: [
          {
            title: "셀 좌클릭 이벤트",
            desc: `좌클릭 시 지뢰를 확인하거나 주변 숫자를 여는 기능을 
            구현했습니다. 지뢰를 클릭한 경우 자동으로 게임이 종료되도록 설계했습니다.`,
          },
          {
            title: "셀 우클릭 이벤트",
            desc: `우클릭 시 셀에 깃발을 표시하여 지뢰로 표시하거나 깃발을 
            제거할 수 있는 기능을 추가했습니다. 이를 통해 사용자가 지뢰 위치를 
            추측하고 관리할 수 있도록 했습니다.`,
          },
          {
            title: "게임 종료 조건",
            desc: `모든 지뢰를 제외한 셀이 열리면 게임이 성공으로 종료되고, 
            지뢰를 클릭하면 게임이 실패로 종료되도록 설정했습니다. 게임 상태에 
            따른 UI 업데이트를 통해 사용자에게 명확한 피드백을 제공했습니다.`,
          },
        ],
      },
      {
        name: "게임 종료",
        icon: "🏁",
        info: [
          {
            title: "게임 성공 및 실패 처리",
            desc: `사용자가 모든 지뢰를 찾거나 지뢰를 클릭했을 때 게임 상태를 
            업데이트하고, 이에 맞는 메시지와 UI를 변경했습니다. 게임 종료 시 
            전체 보드의 상태를 고정하여 추가적인 클릭을 방지했습니다.`,
          },
          {
            title: "리셋 기능",
            desc: `게임 종료 후 사용자가 쉽게 게임을 다시 시작할 수 있도록 
            초기화 버튼을 제공했습니다. 이를 통해 빠른 재시작과 연속 플레이가 
            가능하도록 했습니다.`,
          },
        ],
      },
      {
        name: "타이머 기능",
        icon: "⏱️",
        info: [
          {
            title: "타이머 시작 및 정지",
            desc: `게임 시작 시 타이머가 자동으로 작동하며, 게임이 성공하거나 
            실패할 때 타이머가 멈추도록 구현했습니다. 이를 통해 사용자가 
            게임에 소요된 시간을 확인할 수 있습니다.`,
          },
          {
            title: "남은 지뢰 표시",
            desc: `총 지뢰 개수에서 현재 깃발 개수를 뺀 남은 지뢰 수를 화면에 
            표시하여 사용자가 남은 지뢰 수를 파악할 수 있도록 했습니다.`,
          },
        ],
        code: [],
      },
    ],
    meaning: [
      `이번 프로젝트를 통해 잊고 지내던 알고리즘을 다시 학습할 수 있는 기회가 
      되었습니다. 특히, 빈 칸을 클릭했을 때 주변 숫자칸과 추가 빈 칸을 여는 
      로직을 구현하는 것이 쉽지 않았습니다. 고민 끝에, 빈 칸이 연속적으로 발생할 
      경우 각 빈 칸의 위치 데이터를 스택에 저장하고 하나씩 꺼내면서 계속해서 
      로직을 검증하도록 설계했습니다. 처음에는 이러한 접근법을 생각해내기가 
      어려웠지만, 알고리즘과 재귀의 개념을 깊이 있게 이해하고 적용하면서 문제를 
      해결할 수 있었습니다. 이를 통해 복잡한 비즈니스 로직을 보다 효율적으로 
      설계하는 방법을 배울 수 있었습니다.`,
      `게임의 UI를 최대한 직관적이고 편리하게 설계하려고 노력했습니다. 초기에는 
      난이도를 초보자, 중급자, 고급자 세 가지로만 나누어 설정했지만, 지인들에게 
      게임을 시연했을 때 "난이도는 조절할 수 없니?"라는 의견을 듣고, 이를 
      개선하기로 마음을 먹었습니다. 이에 따라 가로와 세로 셀 수를 자유롭게 조절할 
      수 있는 기능을 추가하고 UI를 개선했습니다. 이 과정에서 사용자 피드백의 
      중요성을 다시금 실감하게 되었습니다.`,
      `TypeScript의 enum을 활용하여 셀의 다양한 상태를 효율적으로 관리함으로써 
      코드를 체계화할 수 있었습니다. 특히 빈 셀, 숫자 셀, 열린 숫자 셀, 지뢰 셀, 
      그리고 깃발이 꽂힌 지뢰 셀 등 여러 상태를 구분하는 것이 처음에는 
      혼란스러웠지만, enum을 통해 셀의 타입을 초반에 잘 정의해 두니, 개발 
      과정에서 큰 도움이 되었습니다. TypeScript의 타입 시스템 덕분에 더욱 
      안정적인 코드를 작성할 수 있어 타입스크립트의 장점을 한번 더 체감할 수 
      있었습니다.`,
    ],
    link: {
      web: "https://ranggu-minesweeper.vercel.app/",
      github: "https://github.com/rangggu/minesweeper",
    },
  },
  {
    index: 7,
    title: "SuperPosition",
    subtitle: "온라인 전시 및 작품 거래 서비스 플랫폼",
    background: "/images/project/superposition.png",
    desc: [
      "개발팀(FE 2명, BE 3명) 프론트엔드 총괄",
      "실제 서비스 페이지 및 백오피스 개발",
      "KaKao 연동 회원가입으로 접근 편의성 증대",
      "QR 스캔 도입으로 사용자 유입률 30% 향상",
    ],
    date: "@2023. 11 ~ 2024. 08",
    tag: "사이드",
    overview: {
      problem: [
        "여러 작가의 예술 작품들을 더 많은 일상에서 볼 수 없을까? 😕",
        "제 공간과 어울리는 그림을 걸어두고 싶은데 원하는 그림을 어떻게 찾아야 할지 막막해요 😳",
      ],
      solution: [
        "자신의 취향대로 공간을 꾸미고 싶은 사람과 개성있는 신진 작가의 작품 간의 연결을 지원해요",
        "마음에 드는 작품은 찜하고 구매 신청도 남겨 보세요!",
      ],
    },
    preview: {
      type: "youtube",
      link: "https://www.youtube.com/embed/SXq8aJ6YOqg",
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "Next", src: "/images/icon/next.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "React query", src: "/images/icon/react-query.png" },
      { name: "Recoil", src: "/images/icon/recoil.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "Emotion", src: "/images/icon/styled-components.png" },
      { name: "Figma", src: "/images/icon/figma.png" },
      { name: "Vercel", src: "/images/icon/vercel.png" },
      { name: "React cookie" },
      { name: "React Icons" },
      { name: "Swiper" },
      { name: "React grid" },
      { name: "React csv" },
    ],
    context: [
      `이 프로젝트는 현업에서 활동 중인 개발자, 기획자, 디자이너와 함께 협업하여 완성한 사이드
      프로젝트입니다. 새롭게 배우고 싶었던 기술 스택을 공부하며 서로의 지식을 공유하고 함께
      성장할 수 있는 기회라 생각하여 참여하게 되었습니다.`,
      `SuperPosition이라는 프로젝트는 생각보다 단순한 곳에서 비롯되었습니다. 방문했던 작은 카페의
       사장님이 자신의 그림을 전시할 공간이 없어 카페를 열게 되었다는 이야기에 영감을 받은
       기획자들께서 예술과 비즈니스를 결합한 서비스를 만들어보자는 제안을 주셨고, 이에 함께하게
       되었습니다.`,
    ],
    function: [
      {
        name: "QR 코드 스캔을 통한 온라인 전시 감상",
        icon: "📇",
        info: [
          {
            title: "온라인 사용자 유입률 30% 향상",
            desc: `작품을 오프라인에서 감상한 관람객들이 작품 하단에 부착된 
            QR 코드를 스캔하면, 해당 작품의 정보를 신속하게 확인할 수 있도록 
            구성했습니다. 이를 통해 사용자들이 저희 온라인 페이지로 더욱 쉽게 
            유입될 수 있었으며, 트래픽 분석 결과, QR 코드 도입을 통해 기존 
            대비 약 30% 더 많은 사용자 유입이라는 의미 있는 성과를 달성할 수 있었습니다.`,
          },
          {
            title: "데이터 기반 사용자 분석",
            desc: `QR 코드 스캔 데이터를 서버와 연동하여 사용자의 스캔 시간과 
            횟수를 CSV 파일로 저장하는 시스템을 구축했습니다. 운영진은 이를 
            바탕으로 관람객의 선호도와 조회수를 분석할 수 있었으며, 수집된 
            데이터를 활용해 전시 운영의 효율성을 높이는 데 기여했습니다.`,
          },
        ],
        code: [
          `useQuery('qrProduct', () => getQrProduct(query.id as string), {
    enabled: !!query.isQr,
    onSuccess: (qrData) => {
      data = qrData;
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });`,
        ],
      },
      {
        name: "KaKao 연동 회원가입",
        icon: "🙍‍♂️",
        info: [
          {
            title: "카카오 계정을 통한 로그인",
            desc: `사용자에게 가장 친숙한 SNS 서비스 중 하나인 카카오톡을 이용하여 사용자가 카카오
            계정으로 로그인할 수 있도록 구현했습니다.<br/>
            로그인 요청 시 카카오에서 제공한 code 값을 서버로 전송하여 사용자 인증을
            진행합니다. 인증 성공 시 발급된 accessToken을 쿠키에 저장해 로그인된 세션을
            유지하고, 미들웨어를 통해 사용자의 접근 권한을 제어하도록 했습니다.`,
          },
          {
            title: "회원가입 리다이렉트 처리",
            desc: `카카오 계정 로그인을 실행했으나 회원이 아닌 사용자의 경우, 회원가입 페이지로
            리다이렉트 처리했으며, 탈퇴한 지 3개월 이내인 사용자는 재가입이 제한됨을
            안내하는 메시지를 표시했습니다.`,
          },
        ],
        code: [
          `const loginHandler = useCallback(
      async (code: string | string[]) => {
        try {
          const res = await instance.get(
            \`/users/login/kakao?code=\${code}\`
          );
          setCookie('accessToken', 
            res.data.accessToken, 
            { path: '/' }
          );
          router.push('/');
    
          if (res.data?.statusCodeValue === 303) {
            sessionStorage.setItem(
              'userInfo', 
              JSON.stringify(res.data.body)
            );
            router.push('/signup');
            return;
          }
        } catch (e: any) {
          if (e.response?.status === 303) {
            sessionStorage.setItem(
              'userInfo', 
              JSON.stringify(e.response.data)
            );
            router.push('/signup');
            return;
          } else if (e.response.status == 409) {
            const date = e.response.data;
            setLogin(false);
            setOpen(true);
            setMessage(
              \`탈퇴 이후 3개월이 지나지 않아 가입이 제한되었어요.
              \${dateFormatter(date)}부터 다시 가입할 수 있어요.\`,
            );
          }
        }
      },
      [router],
    );
            `,
        ],
      },
      {
        name: "백오피스 구축",
        icon: "📊",
        info: [
          {
            title: "직관적이고 쉬운 관리자 인터페이스",
            desc: `관리자 페이지는 일반 사용자와 달리 특정 작업을 효율적으로 
          수행하려는 관리자들이 주로 사용하기 때문에, 직관적이고 사용하기 쉬운 
          인터페이스가 필요하다고 판단했습니다. 이를 위해 UX에 기반한 디자인을 
          적용했으며, 실제 운영진의 피드백을 적극적으로 반영하여 지속적으로 
          개선하고자 했습니다.`,
          },
          {
            title: "체계적인 설계와 모듈화",
            desc: `관리자 페이지는 다양한 기능으로 인해 복잡해질 수 있으므로, 
            체계적인 설계가 중요하다는 점을 인식했습니다. 이를 해결하기 위해 
            재사용성이 높은 컴포넌트 기반 설계를 도입하고, 적절한 모듈화 구조를 
            적용하여 유지보수성과 확장성을 높이는 데 중점을 두었습니다.`,
          },
        ],
      },
      {
        name: "전시, 작품, 작가 탐색",
        icon: "🔍",
        info: [
          {
            title: "Next.js를 선택한 이유",
            desc: `Next.js는 정적 생성과 클라이언트 렌더링을 모두 지원하여 
            다양한 데이터 처리 요구에 적합하다고 생각했습니다. Next.js를 사용하여 
            전시 등의 데이터의 성능 최적화와 사용자 데이터의 실시간 처리를 
            유연하게 구현할 수 있었습니다.`,
          },
          {
            title: "전시, 작품, 작가 데이터",
            desc: `변경이 적은 전시 관련 데이터는 Next.js의 정적 
            생성(getStaticProps)을 활용해 미리 렌더링함으로써 성능을 최적화했습니다.`,
          },
          {
            title: "사용자 데이터",
            desc: `실시간 처리가 필요한 사용자 데이터는 클라이언트 사이드 
            렌더링(CSR) 방식을 적용했으며, React Query를 사용해 데이터 페칭과 
            상태 관리를 효율적으로 구현했습니다.`,
          },
        ],
        code: [
          `export async function getStaticProps({ params }: any) {
  const data = await getExhibition(params.id as string);

  if (data) {
    return {
      props: {
        data,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}`,
          `const { data: exhibitions } = useQuery(
    ['exhibitions'], 
    () => getExhibitions(), 
    {
      initialData: () => {
        const queryClient = new QueryClient();
        return queryClient.getQueryData('exhibitions');
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
`,
        ],
      },
      {
        name: "좋아요 및 팔로우",
        icon: "❤",
        info: [
          {
            title: "함수 설명",
            desc: `handleLike 함수는 사용자가 로그인 상태일 경우 like 여부에 따라 
        좋아요를 추가하거나 삭제하며, handleFollow 함수는 로그인된 상태에서 
        follow 여부에 따라 팔로우를 추가하거나 삭제합니다. <br/>
        두 함수 모두 사용자가 로그인하지 않은 상태에서는 로그인 팝업을 띄웁니다.`,
          },
          {
            desc: `좋아요 및 팔로우 처리 로직은 useMutation 훅을 활용하여 
            addFollowMutate와 deleteFollowMutate, addLikeMutate와 
            deleteLikeMutate로 각각 관리하고 있습니다.`,
          },
        ],
        code: [
          `const handleLike = useCallback(() => {
    if (token) {
      like 
        ? deleteLikeMutate({ id: productId, token: token }) 
        : addLikeMutate({ id: productId, token: token });
    } else {
      setOpen(true);
    }
  }, [productId, token, like, addLikeMutate, deleteLikeMutate]);
  
const handleFollow = useCallback(() => {
    if (token) {
      follow 
      ? deleteFollowMutate({ instagramId, token }) 
      : addFollowMutate({ instagramId, token });
    } else {
      setOpen(true);
    }
  }, [instagramId, token, follow, addFollowMutate, 
  deleteFollowMutate]);`,
          `const { mutate: addFollowMutate } = useMutation(addFollow, {
    onSuccess: () => {
      setFollow((prevFollow) => !prevFollow);
      refetch;
    },
    onError: () => {
      setFollow(!follow);
    },
  });

  const { mutate:deleteFollowMutate } = useMutation(deleteFollow,
  {
    onSuccess: () => {
      setFollow((prevFollow) => !prevFollow);
      refetch;
    },
    onError: () => {
      setFollow(!follow);
    },
  });
  `,
        ],
      },
      {
        name: "UX를 고려한 UI",
        icon: "🎨",
        info: [
          {
            title: "Masonry Grid 레이아웃",
            desc: `Masonry Grid를 통해 사용 가능한 공간을 효율적으로 활용하여 
            불규칙한 크기의 아이템을 조밀하게 배열하고자 했습니다. 이를 통해 
            화면에 더 많은 콘텐츠를 표시할 수 있게 하며, 스크롤을 최소화하는 
            효과를 얻을 수 있었습니다.`,
          },
          {
            title: "풀 페이지 스크롤",
            desc: `Swiper 라이브러리를 이용하여 수직 방향의 슬라이드를 
            구현했으며, 마우스 휠과 페이지네이션을 이용한 사용자의 액션이 
            일어난 경우에만 동작하도록 조건부 적용했습니다.
            `,
          },
        ],
      },
    ],
    meaning: [
      `이번 프로젝트에서는 초기의 작고 간단했던 MVP가 사용자 피드백과 요구사항을 
      반영하며 점차 확장되고 발전하는 과정을 경험할 수 있었습니다. 특히 사용성 
      개선을 위해 KaKao 연동 회원가입 등의 새로운 기능을 직접 제안하고 구현했던 점이 
      기억에 남습니다. 이를 통해 사용자들은 가장 접근성이 높은 카카오 계정으로 간편하게 
      로그인할 수 있게 되었고, 회원가입 리다이렉트를 통해 비회원 사용자의 흐름도 
      자연스럽게 유도하여 신규 유입을 이끌어낼 수 있었습니다. 이 과정에서 사용자 
      중심의 설계가 얼마나 편리하게 다가오는지 느낄 수 있었습니다.`,
      `또한, Next.js를 활용해 SSR과 CSR 방식을 적절히 혼합하며 서비스의 성능과 
      사용자 경험을 동시에 개선한 점도 의미 있는 도전이었습니다. 예를 들어, 전시 
      데이터는 SEO 최적화를 위해 정적으로 생성했고, 사용자와의 상호작용이 많은 
      페이지에서는 CSR 방식을 적용해 빠르고 부드러운 인터페이스를 제공했습니다. 
      이러한 기술적 전략을 통해 서비스의 완성도를 한층 높이는 데 기여할 수 있었습니다.`,
      `QR 코드 스캔 데이터를 분석해 사용자 행동을 이해하고 이를 서비스 개선과 
      전시 운영에 반영한 것도 중요한 성과였습니다. 특히, QR 코드 유입 트래픽이 
      일반 웹 접속보다 약 30% 
      더 높았다는 분석 결과를 통해, 서비스에 빠르게 접근할 수 있도록 스캔 기능을 
      도입한 것이 서비스 확장에 큰 도움이 되었다는 점을 실감할 수 있었습니다.
      팀원들과 서비스 개선 방향을 더욱 구체화하는 데에도 긍정적인 영향을 받았습니다.`,
      `백오피스 구축 작업은 단순히 관리자 페이지를 만드는 일이 아니라, 
      운영 환경을 깊이 이해하고 그에 맞게 설계하는 과정이었던 것 같습니다. 
      우선 관리자들에게 가장 중요한 것은 "빠르고 효율적으로 작업을 처리하는 것"임을 알게 되었고, 
      이를 위해 직관적이고 사용하기 쉬운 화면을 만드는 데 집중했습니다. 
      특히, 실제 운영진과 적극적으로 대화하며 필요한 기능과 불편한 점을 파악했고, 
      그 내용을 백오피스에 반영하고자 노력했습니다. 이후 운영진들이 
      인터페이스가 편리하고 필요한 기능을 잘 찾아서 사용할 수 있게 되었다는 
      말씀을 해주셨을 때 정말 뿌듯했던 것 같습니다.`,
      `마지막으로 무엇보다 프로젝트 전반에 걸쳐 팀원들과의 협업이 단순히 역할 분담에 
      그치지 않고 시너지를 만들어내는 과정을 직접 경험한 점이 가장 인상 
      깊었습니다. 특히, 디자이너와 협력하며 단순히 예쁜 화면을 넘어 사용자 
      관점에서 더 직관적이고 편리한 UI를 설계했던 경험은 매우 뜻깊었습니다. 
      이러한 협업 과정을 통해 소통과 신뢰가 프로젝트 성공에 얼마나 중요한지 
      다시 한번 깨닫게 되었습니다.`,
    ],
    link: {
      web: "https://superposition-event.vercel.app",
      github: "https://github.com/Superposition-dev/Super_FE_Remake",
    },
  },
  {
    index: 8,
    title: "What's in my basket",
    subtitle: "상품 확인 및 장바구니 구매 사이트",
    background: "/images/project/whatsinmybasket.png",
    desc: ["1人 개인 프로젝트", "기존 프로젝트 리팩토링 경험", "반응형 디자인 설계"],
    date: "@2023. 07.",
    tag: "개인",
    overview: {
      problem: [
        "처음 작성한 코드의 유지보수가 어렵다고 느껴져요 😕",
        "기능을 추가하거나 수정할 때마다 다른 부분에서 문제가 발생해요. 😟",
      ],
      solution: [
        "기존 코드 리팩토링을 처음으로 경험했던 프로젝트에요.",
        "코드의 가독성을 높이고 유지보수가 쉬운 형태로 만들어, 앞으로의 확장성을 확보해봤어요!",
      ],
    },
    preview: {
      type: "image",
      link: ["/images/whatsinmybasket/2.gif"],
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "React Toolkit", src: "/images/icon/redux-toolkit.png" },
      { name: "SCSS", src: "/images/icon/sass.png" },
      { name: "Vercel", src: "/images/icon/vercel.png" },
    ],
    context: [
      `웹 개발을 처음 시작했을 때는 주어진 기획을 기한 내에 완성하는 것이 가장 
      중요한 목표라고 생각했습니다. 빠르게 결과물을 만들어내는 것이 개발자로서 
      성장하는 길이라고 믿었기 때문입니다. 하지만 프로젝트를 진행할수록 복잡한 
      로직이 뒤얽혀 가독성이 떨어지고, 유지보수가 어려운 코드들이 쌓이는 문제를 
      경험하게 되었습니다. 이 과정에서 단순히 작동하는 코드를 넘어, 확장성과 
      유지보수성을 갖춘 깔끔한 코드를 작성하는 것이 얼마나 중요한지 깨닫게 
      되었습니다.`,
      `이 깨달음을 바탕으로, 부트캠프에서 제작했던 React 기반 웹 애플리케이션을 
      리팩토링 프로젝트로 선택했습니다. 이미 간단한 로직과 디자인이 완성되어 있어 
      코드 개선에 집중하기 적합했고 React를 처음 배우면서 만든 결과물이라 
      초기 학습의 흔적이 남아 있었기 때문에, 이후 익힌 다양한 기술 스택과 최적화 
      방법을 적용하기에 좋은 사례라고 판단했습니다. 이를 통해 코드의 품질을 
      높이고, 개발자로서 한 단계 더 성장할 수 있는 기회를 만들고자 이번 
      프로젝트를 기획하게 되었습니다.`,
    ],
    function: [
      {
        name: "코드 가독성 개선",
        icon: "📐",
        info: [
          {
            title: "폴더 구조 통일",
            desc: `요구사항에 맞춰 폴더 구조를 일관되게 정리하고, pages, components, 
            styles 등 각 폴더의 역할을 명확히 구분했습니다. 파일 경로와 이름을 
            직관적으로 설정해 코드베이스의 가독성을 높였으며, 동일한 구조를 
            템플릿화하여 향후 프로젝트에서도 쉽게 적용할 수 있도록 표준을 마련했습니다.`,
          },
          {
            title: "공통 컴포넌트화",
            desc: `여러 곳에서 중복 사용되던 모달, 화면 전체 여백 등을 공통 
            컴포넌트로 추출하여 재사용성을 높였습니다. 이를 통해 코드의 중복을 
            줄이고 유지보수를 용이하게 만들었습니다.`,
          },
          {
            title: "직관적인 네이밍 규칙",
            desc: `함수, 변수, 클래스에 직관적이고 일관된 네이밍을 적용했습니다. 
            이를 통해 코드의 의도를 쉽게 파악할 수 있도록 했으며, 가독성을 대폭 
            향상시켰습니다.`,
          },
        ],
      },
      {
        name: "웹 성능 최적화",
        icon: "⚡",
        info: [
          {
            title: "효율적인 상태 관리",
            desc: `ContextAPI에서 Redux Toolkit으로 상태 관리 도구를 
            변경했습니다. 이를 통해 상태 변경 시 불필요한 컴포넌트 리렌더링을 
            방지하고, 성능을 최적화할 수 있었습니다.`,
          },
          {
            title: "이미지 최적화",
            desc: `화면에 렌더링되는 이미지 크기를 조절하고, lazy-loading과 
            webp 포맷을 도입해 이미지 로드 시간을 약 75% 단축했습니다. 이러한 
            최적화로 UX를 크게 개선했습니다.`,
          },
          {
            title: "추가적인 최적화 기법 학습",
            desc: `폰트 최적화, 코드 스플리팅, 메모이제이션과 같은 기법을 배우고 
            적용 가능한 상황을 탐구하며 성능 최적화에 대한 이해를 심화했습니다.`,
          },
        ],
      },
      {
        name: "사용자 경험 개선",
        icon: "🎨",
        info: [
          {
            title: "반응형 디자인 설계",
            desc: `다양한 기기에서 최적의 사용자 경험을 제공하기 위해 반응형 디자인을 
            설계했습니다. Flexbox와 CSS Grid를 활용해 레이아웃을 유연하게 구성했으며, 
            미디어 쿼리를 통해 화면 크기에 따라 UI가 적절히 조정되도록 구현했습니다.`,
          },
          {
            title: "Skeleton UI 도입",
            desc: `페이지 로딩 시 Skeleton UI를 추가하여 콘텐츠 로드 중의 
            불편함을 줄이고 사용자 이탈률을 감소시켰습니다. 이를 통해 사용자 
            경험의 중요성을 체감하며 적용 범위를 확장할 수 있었습니다.`,
          },
          {
            title: "요구사항 기반 설계",
            desc: `부트캠프 과제의 요구사항을 충실히 반영하며 작업했습니다. 
            디자인의 통일성과 구조적인 요소는 과제의 지침을 기반으로 했으며, 이를 
            구현하는 과정에서 정확성과 세부적인 디테일에 집중했습니다. 
            이러한 경험은 명확한 요구사항을 만족시키는 개발 능력을 키우는 
            데 큰 도움이 되었습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/whatsinmybasket/2.gif",
          landscape: true,
        },
        name: "카테고리 분류",
        icon: "📂",
        info: [
          {
            title: "URL 변경을 통한 카테고리 분류",
            desc: `React-router-dom과 React-router 라이브러리를 사용하여 
            사용자가 카테고리를 선택할 때마다 URL이 변경되도록 구현했습니다. 
            이를 통해 직관적인 탐색 환경을 제공했습니다.`,
          },
          {
            title: "카테고리별 데이터 로드",
            desc: `useParams를 활용하여 선택된 카테고리를 가져오고, 이를 카테고리 
            리스트 컴포넌트의 props로 전달해 해당 카테고리에 맞는 데이터를 불러올 
            수 있도록 했습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/whatsinmybasket/1.gif",
          landscape: true,
        },
        name: "검색 및 필터",
        icon: "🔍",
        info: [
          {
            title: "텍스트 기반 검색 기능",
            desc: `사용자가 입력한 텍스트와 상품 제목을 비교하여 입력된 텍스트와 
            같거나 포함된 제목만 필터링해 결과를 표시하도록 구현했습니다.`,
          },
          {
            title: "검색 결과 리스트 관리",
            desc: `검색 입력란 외의 화면 영역을 클릭하면 검색 결과 리스트가 
            닫히도록 구현하여 사용자 경험을 개선했습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/whatsinmybasket/3.gif",
          landscape: true,
        },
        name: "장바구니",
        icon: "🛒",
        info: [
          {
            title: "전역 상태 관리",
            desc: `Redux Toolkit을 사용해 장바구니 상태를 전역에서 관리했습니다. 
            이를 통해 데이터의 일관성을 유지하고 컴포넌트 간 데이터 공유를 
            간소화했습니다.`,
          },
          {
            title: "상품 추가 및 수량 관리",
            desc: `상품 상세 페이지에서 장바구니 추가 버튼을 클릭하면 해당 상품의 
            정보와 기본 수량이 저장되고, 장바구니 
            페이지에서 + 및 - 버튼으로 수량을 변경할 수 있도록 했습니다.`,
          },
          {
            title: "상품 삭제 및 구매",
            desc: `장바구니 페이지에서 삭제 버튼을 누르면 해당 상품이 state에서 
            제거되며, 구매하기 버튼을 누르면 모든 state 값이 초기화되도록 
            구현했습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `이번 프로젝트를 통해 리팩토링을 처음 경험하면서, 코드 개선의 
      중요성과 즐거움을 제대로 느낄 수 있었습니다. 처음에는 익숙하지 않은 
      작업이라 막막하게 느껴졌지만, 기존의 코드를 하나씩 다듬어 나가며 점차 
      결과물이 깔끔해지는 걸 보면서 뿌듯함을 느꼈습니다. 특히, 기존 코드의 
      문제를 파악하고 더 나은 방법으로 개선하는 과정에서 "이렇게 하면 더 
      좋겠다"라는 고민을 많이 할 수 있었고, 그만큼 개발에 대한 자신감도 
      생겼습니다.`,
      `또한, 이번 프로젝트는 배워왔던 기술들을 다시 활용하고 정리하는 기회가 
      되었습니다. 예전에 작성했던 코드를 보며 당시에는 몰랐던 점들을 되짚어보기도 
      했고, 새롭게 익힌 기술과 최적화 방법들을 실제로 적용하면서 실력을 쌓을 수 
      있었습니다. 무엇보다, 단순히 작동하는 코드를 넘어서 더 읽기 쉽고 유지보수가 
      쉬운 코드를 작성해야 한다는 점을 실감할 수 있었습니다.`,
      `이 경험을 바탕으로 앞으로도 꾸준히 배우고 성장해나갈 생각입니다. 프로젝트를 
      마치면서 "코드는 계속 다듬을수록 더 나아질 수 있다"는 걸 배웠고, 이런 작은 
      변화들이 더 좋은 개발자로 가는 길이라고 느꼈습니다. 이번 프로젝트는 단순히 
      기술적인 발전뿐만 아니라, 개발자로서의 태도를 바르게 잡아준 소중한 
      경험이었습니다.`,
    ],
    link: {
      web: "https://whatsinmybasket.vercel.app/",
      github: "https://github.com/whats-in-my-basket/whatsinmybasket_re",
    },
  },
  {
    index: 9,
    title: "HeyTossMe",
    subtitle: "예약 서비스 통합 거래 플랫폼",
    background: "/images/project/heytoss.png",
    desc: [
      "개발팀(FE 2명, BE 3명) 프론트엔드 총괄",
      "FCM 도입으로 실시간 알림 시스템 구축",
      "stompJS를 통한 실시간 채팅 로직 구현",
      "JWT 토큰 관리 및 자동 재발급 처리",
    ],
    date: "@2023. 02 ~ 2023. 04",
    tag: "사이드",
    overview: {
      problem: [
        "전국구의 못쓰게 된 서비스 거래만 모아둔 곳 없을까? 😕",
        "기존의 중고 거래 플랫폼🥕⚡🥕⚡들이 이미 많이 있긴 한데..",
      ],
      solution: [
        "날짜가 지나면 못 쓰게 되는 예약 상품의 핵심인 기간에 초점을 두었어요",
        "3일 내 마감 임박 상품은 따로 정렬해주고, 전용 캘린더를 통해 기간도 검색할 수 있어요!",
      ],
    },
    preview: {
      type: "youtube",
      link: "https://www.youtube.com/embed/gsTECOqqYlQ",
    },
    skill: [
      { name: "React", src: "/images/icon/react.png" },
      { name: "TypeScript", src: "/images/icon/ts.png" },
      { name: "Redux Toolkit", src: "/images/icon/redux-toolkit.png" },
      { name: "Redux Persist", src: "/images/icon/redux-toolkit.png" },
      { name: "Tailwind CSS", src: "/images/icon/tailwind.png" },
      { name: "SCSS", src: "/images/icon/sass.png" },
      { name: "StompJS", src: "/images/icon/socket-io.png" },
      { name: "Figma", src: "/images/icon/figma.png" },
      { name: "Netlify", src: "/images/icon/netlify.png" },
      { name: "Github action", src: "/images/icon/git.png" },
      { name: "React Icons" },
      { name: "Browser image compression" },
      { name: "React Datepicker" },
      { name: "Kakao map API" },
      { name: "Daum postcode" },
      { name: "Firebase Cloud Message" },
      { name: "Gitbook" },
    ],
    context: [
      `이 프로젝트는 부트캠프에서 백엔드와 프론트엔드가 협업하여 진행된 
      프로젝트로, 사용자들이 예약 상품을 더 쉽게 검색하고 거래를 원활히 할 수 
      있도록 하는 데 초점을 맞췄습니다. 특히 거래 플랫폼의 본질에 맞게 사용자 
      간 실시간 채팅 기능을 구현해, 거래 과정에서 의사소통을 편리하게 하고 신속한 
      거래를 지원하는 데 중점을 두었습니다.`,
      `프로젝트를 기획하게 된 계기는 기존 중고 거래 플랫폼에서 예약 상품 거래가 
      가진 특성을 충분히 반영하지 못하는 문제에서 시작되었습니다. 예약 상품은 
      한정된 기간 안에 거래가 이루어져야 하기 때문에 사용자들이 원하는 상품을 
      찾거나 판매자가 상품을 노출하는 과정에서 어려움을 겪는 경우가 많았습니다. 
      이러한 문제를 해결하기 위해 예약 상품 거래에 특화된 플랫폼을 만들어 
      사용자들이 더 편리하고 효율적으로 거래할 수 있는 환경을 제공하고자 했습니다.`,
    ],
    function: [
      {
        image: {
          url: "/images/heytossme/1.gif",
          landscape: true,
        },
        name: "검색 및 필터",
        icon: "🔍",
        info: [
          {
            title: "Redux-Toolkit을 활용한 필터 관리",
            desc: `필터 조건들을 전역 상태로 관리하기 위해 Redux-Toolkit을 사용했습니다. 
            카테고리, 지역, 날짜, 키워드, 마감임박 등의 필터 조건을 설정하고, 
            사용자가 선택한 값들이 state에 반영되도록 구현했습니다.`,
          },
          {
            title: "실시간 검색 및 데이터 동기화",
            desc: `사용자가 검색어를 입력하거나 필터 조건을 변경할 때마다 해당 상태를 반영해 
            상품 조회 API를 호출했습니다. 이를 통해 실시간으로 업데이트된 상품 목록을 
            사용자에게 제공하여 검색 경험을 개선했습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/heytossme/2.gif",
          landscape: true,
        },
        name: "실시간 알림",
        icon: "🔔",
        info: [
          {
            title: "FCM 토큰 관리 및 알림 권한 요청",
            desc: `사용자가 로그인을 시도할 때 알림 권한 허용을 요청하고, FCM 서버로부터 
            발급받은 디바이스 토큰을 서버로 전달했습니다. 이를 통해 알림을 보낼 
            디바이스를 식별하고 관리할 수 있도록 구현했습니다.`,
          },
          {
            title: "알림 전송 및 FCM 서버 연동",
            desc: `관심 키워드와 관련된 상품이 등록되거나, 북마크 처리 및 거래 완료와 같은 이벤트가 발생할 때, 
            해당 디바이스 토큰으로 알림을 전송하여 사용자에게 실시간 알림을 제공했습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/heytossme/3.gif",
          landscape: true,
        },
        name: "이미지 업로드 및 최적화",
        icon: "🖼️",
        info: [
          {
            title: "이미지 업로드 미리보기",
            desc: `유저가 프로필 사진이나 상품 이미지를 업로드할 때, 업로드한 이미지를 
            미리 확인할 수 있도록 미리보기 기능을 구현했습니다. `,
          },
          {
            title: "이미지 용량 최적화",
            desc: `서버의 부하를 최소화하기 위해 Browser Image Compression을 활용하여 
            업로드 전 이미지의 용량과 크기를 압축했습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/heytossme/4.gif",
          landscape: false,
        },
        name: "1:1 실시간 채팅",
        icon: "💬",
        info: [
          {
            title: "WebSocket을 활용한 실시간 통신",
            desc: `구매자와 판매자 간의 잦은 데이터 송수신을 위해 WebSocket 기술을 활용했습니다. 
            실시간으로 데이터를 주고받아 원활한 채팅 경험을 제공할 수 있도록 구현했습니다.`,
          },
          {
            title: "실시간 메시지 처리",
            desc: `stompJS를 사용해 메시지 구독 및 발행 로직을 구현했으며, 메시지는 실시간으로 state에 저장되어 
            별도의 API 요청 없이 화면에 바로 노출됩니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/heytossme/5.gif",
          landscape: true,
        },
        name: "KaKao 소셜 로그인",
        icon: "🙍‍♂️",
        info: [
          {
            title: "카카오 계정을 이용한 간편 로그인",
            desc: `카카오톡을 활용해 사용자들이 친숙하게 계정을 연결하고 로그인할 수 있도록 구현했습니다. 
            로그인 요청 시 카카오에서 제공하는 code 값을 서버로 전송해 사용자 인증을 진행했습니다.`,
          },
        ],
      },
      {
        image: {
          url: "/images/heytossme/6.gif",
          landscape: true,
        },
        name: "JWT 보안 및 토큰 재발급 처리",
        icon: "🔐",
        info: [
          {
            title: "Redux Store와 Persist를 활용한 토큰 관리",
            desc: `JWT는 개인 정보 보호를 위해 Redux Store에 access token을 저장하여 관리했습니다. 
            또한, 페이지 새로고침으로 인한 데이터 손실을 방지하기 위해 Redux Persist를 사용해 
            유저 ID를 스토리지에 저장했습니다. 이를 통해 사용자 경험을 저해하지 않고 안정적으로 
            토큰 만료 및 재발급 과정을 처리했습니다.`,
          },
          {
            title: "Axios Interceptors를 통한 자동 토큰 재발급",
            desc: `모든 API 요청에서 401 error(토큰 만료)가 발생하면, 스토리지에 저장된 유저 ID를 사용해 
            토큰 재발급 요청을 보내고, 기요청된 API를 재요청하도록 Axios Interceptors를 설정했습니다. 
            반면, 405 error(리프레시 토큰 만료)가 발생하면 로그아웃 처리하여 보안을 강화했습니다.`,
          },
        ],
      },
    ],
    meaning: [
      `이번 프로젝트는 백엔드 개발자와 협업할 수 있는 귀중한 경험이었습니다. 
      이전에는 주로 프론트엔드 개발자끼리만 프로젝트를 진행하거나, 서버 없이 
      작업한 경우가 많았는데, 이번에는 백엔드 개발자들과 협력하며 많은 것을 배울 
      수 있었습니다. 특히, 기능 구현을 위해 API 명세를 문서로 작성하고, 각종 
      의사결정을 기록하며 공유하는 과정이 협업의 효율성을 얼마나 높이는지 체감할 
      수 있었습니다. 실제로 문제가 생겼을 때 작성해 두었던 문서를 통해 서로 
      소통하고 해결해 가면서 문서 작성과 공유의 중요성을 다시 한 번 느꼈습니다.`,
      `실시간 채팅과 알림 시스템을 구축하는 과정에서는 기술적 난관이 많았지만, 
      그만큼 보람도 컸습니다. STOMP와 WebSocket을 활용한 실시간 채팅 기능은 
      처음 시도해보는 작업이었고, 특히 FCM(Firebase Cloud Messaging)을 이용한 
      실시간 알림은 연동 과정에서 많은 시행착오를 겪었습니다. 그러나 끝내 기능을 
      완성했을 때는 큰 성취감을 느꼈고, 새로운 기술을 실제로 적용해보며 배우는 
      기쁨을 느낄 수 있었습니다. 특히, 사용자가 바로 체감할 수 있는 기능이라는 
      점에서 더욱 보람이 있었습니다.`,
      `디자이너 없이 팀원들과 UI와 UX를 설계한 것도 이번 프로젝트의 큰 도전 중 
      하나였습니다. 깔끔하고 직관적인 인터페이스를 만들기 위해 팀원들과 의견을 
      나누며 끊임없이 고민했고, 다크 모드와 마우스 이벤트 애니메이션 같은 
      디테일까지 신경 써 구현했습니다. 이 과정에서 사용자의 입장에서 생각하는 법을 
      배울 수 있었고, 프로젝트 발표 후 UI와 UX에 대한 긍정적인 피드백을 받았을 
      때는 그 노력이 보상받는 듯한 뿌듯함을 느꼈습니다.`,
      `또한, JWT 토큰 관리 방식을 정하는 과정에서 협업의 중요성을 체감할 수 있었습니다. 
      토큰을 처리하고 저장하는 방법에는 여러 가지 선택지가 있었고, 각 방식의 
      장단점에 대해 의견이 엇갈렸기 때문에 결정을 내리기까지 시간이 걸렸습니다. 
      이 과정에서 단순히 기술적인 선택을 넘어, 현재 방식의 장점을 팀원들에게 
      설득력 있게 설명하고, 단점은 어떻게 보완할지 구체적인 방안을 제시하려고 
      노력했습니다. 결국, 모두가 납득할 수 있는 방향으로 정리하며 
      프로젝트를 이어갈 수 있었고, 그 과정에서 문제를 함께 해결해 나가는 협업의 
      중요성을 더욱 실감했습니다.`,
      `무엇보다 이번 프로젝트를 통해 협업이 얼마나 중요한지 다시 한번 깨달을 수 
      있었습니다. 혼자서는 놓치기 쉬운 부분들을 팀원들과 함께 논의하며 해결했고, 
      각자의 역할에 집중하면서도 서로의 의견을 경청하는 경험이 프로젝트의 완성도를 
      높였습니다. 앞으로도 이런 협업의 경험을 바탕으로 더 나은 개발자가 되기 위해 
      노력해야겠다는 다짐을 했습니다.`,
    ],
    link: {
      web: "https://heytossme.netlify.app/",
      github: "https://github.com/rangggu/hey-tossme-FE",
      figma:
        "https://www.figma.com/design/7QQaie282jTIDCF5n6HLfX/heytossme?node-id=0-1&t=gkRPuq47S0KvB09q-1",
    },
  },
]
