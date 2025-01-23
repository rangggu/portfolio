import { ProjectType } from "../project"

export const BITLIGHT: ProjectType = {
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
  contribution: 80,
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
        "UX 향상을 위해 에디터에 새롭고 다양한 기능을 추가하여 사용자 편의성 향상",
        `긴급 알림 기능을 통해 각종 재난 상황에서 <strong class="font-semibold text-yellow500">50+건 이상의 알림</strong>을 실시간 전송`,
        `PC, 태블릿, 모바일 등 다양한 기기에서 <strong class="font-semibold text-yellow500">반응형 웹</strong> 구현`,
      ],
    },
    {
      title: "서비스 품질 및 신뢰성 향상",
      desc: [
        `Dall-e 이미지 생성과 GCP STT 등의 <strong class="font-semibold text-yellow500">AI 기술 도입</strong>을 주도하여 서비스 업그레이드`,
        "7가지 위젯(기상청 데이터, 뉴스, 웹뷰 등) 추가로 정보 제공의 폭 확장",
        `실시간 LED 모니터링 기능 추가로 재난 상황에 빠른 대처 가능과 서비스 신뢰도 증가`,
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
          desc: `UI와 UX를 새롭게 기획하고 리뉴얼을 진행했습니다. 타 플랫폼의 
            사례를 조사하고 비용을 분석하여 리뉴얼을 직접 제안하였고, 이후 팀원들과 ver 1.1을 
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
             LED 상태를 모니터링하는 기능과 더불어 감시제어 페이지 전체를 설계 및 
             구현했습니다.`,
        },
        {
          title: "실시간 위젯 개발",
          desc: `기상청 데이터를 활용해 날씨와 대기 정보를 제공하는 
            위젯과 시계, 슬라이드, 뉴스, 웹뷰 등 다양한 실시간 위젯을 
            개발하여 사용자 경험을 더욱 풍부하게 만들었습니다.`,
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
            입력의 정확도를 높이고 변환된 텍스트에 따른 여러 동작에 대응할 수 있도록 각종의 
            함수와 기반들을 마련했습니다.`,
        },
        {
          title: "AI 이미지 생성 기능 개발",
          desc: `DALL-E 이미지 생성 기술을 활용하여, 사용자가 원하는 스타일과 
            주제에 맞게 AI 기반 이미지를 생성하는 기능을 개발했습니다.`,
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
          desc: ` Ubuntu와 WinSCP를 사용하여 여러 클라우드 서버를 효율적으로 
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
      특히, 높은 안정성과 신뢰성이 요구되는 프로젝트였던 만큼 작은 디테일 
      하나하나에 신경 써서 구현해야 했습니다. 그 과정이 쉽지는 않았지만 그만큼 
      개발자로서 한층 더 성숙해질 수 있었던 값진 경험이었습니다.`,
    `또한, 이 프로젝트를 진행하며 여러 가지의 새로운 기술을 배우고 적용해볼 수 있었습니다. 
      처음에는 빠르게 기능을 구현하는 것이 목표였기 때문에, 라이브러리 중 하나인
      React-speech-recognition을 사용해 실시간 음성인식 기능을 구현했습니다. 
      하지만 이 기술이 이미 업데이트가 종료된 레거시 기술이라는 점을 알게 되었고, 
      장기적으로 사용하기에는 한계가 있을 것이라고 판단했습니다. 이에 GCP STT를 
      포함해 다양한 STT API를 조사하고 테스트해 보았습니다. 여러 플랫폼을 비교한 
      결과, GCP STT API가 구현이 간단하면서도 인식률이 가장 뛰어나다는 점을 
      확인했고, 최종적으로 이를 도입할 수 있었습니다. 이렇게 기존 기술의 문제점을 
      인지하고 대체 기술을 탐구하며 직접 적용해보며 큰 보람을 느꼈습니다.`,
    `DALL-E를 활용한 AI 이미지 생성 기능 추가도 의미 있는 도전이었습니다. 
      처음에는 API 연동 과정에서 예상치 못한 오류들이 발생해 어려움을 겪었지만, 
      문제를 하나씩 해결한 끝에 결국 안정적으로 구현할 수 있었습니다. 이를 통해
      기술적인 시행착오가 있을지라도 개발자로서의 성장하는 데에 충분한 밑거름이 
      된다는 것을 체감할 수 있었습니다. 결과적으로 해당 기술 도입으로 서비스의 
      가능성이 한층 더 열린 거 같아 보람을 느꼈던 업무 중 하나입니다.`,
    `반면, 프로젝트를 진행하며 예상치 못한 아쉬움과 팀 내 갈등도 겪었지만 이 과정에서도 
      많은 것을 배울 수 있었습니다. 공공기관과 기업을 주요 
      대상으로 하는 프로젝트 특성상, 보안을 최우선으로 고려해야 했기에 내부망 
      서버를 사용해야 했습니다. 이로 인해 페이지 클릭 이벤트나 체류 시간 같은 
      사용자 데이터를 수집하거나 분석할 기회가 부족했습니다. 이러한 데이터를 
      활용할 수 있었다면 사용자 경험을 더욱 세밀하게 개선할 수 있었을 텐데, 
      보안 정책으로 인해 이를 시도할 수 없었던 점이 가장 아쉬웠습니다. 
      그럼에도 제한된 환경 속에서 가능한 최선을 다해 사용자 중심의 기능을 구현하며 
      의미 있는 결과를 만들어낼 수 있었습니다.`,
    `뿐만 아니라, UX가 고려된 기능을 추가하는 과정에서 구조적 한계를 마주하기도 
      했습니다. 기존 시스템에서 해당 기능을 적용하려면 일부 구조를 수정해야 
      했지만, 팀 내부에서는 이에 대한 우려와 신중한 접근을 요구하는 목소리가 
      있었습니다. 하지만 저는 이 변경이 사용자 경험을 위해 반드시 필요하다고 
      판단했고, 이를 설득하기 위해 다양한 레퍼런스와 사례를 조사해 자료를 
      준비했습니다. 결과적으로 기존 구조를 최소한으로 변경하면서도 필요한 
      기능을 구현할 수 있었고, 사용자 만족도를 높이는 데 기여했습니다. 
      이를 통해 기술적 성취를 넘어 제한적인 상황 속에서도 최적의 
      해결책을 찾는 경험을 해볼 수 있었습니다.`,
  ],
}
