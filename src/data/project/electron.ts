import { ProjectType } from "../project"

export const ELECTRON: ProjectType = {
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
          desc: `고객사의 요구사항과 디자인팀이 제공한 시안, 그리고 세부 
            디테일까지 신경 써서 UI를 구현하고자 했습니다. 사용자가 요구하는 화면 
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
            별도의 작업 없이도 프로그램이 이를 자동으로 반영하도록 로직을 
            설계했습니다.`,
        },
      ],
    },
    {
      name: "효율적 관리로 신뢰 확보",
      icon: "🔧",
      info: [
        {
          title: "고객 피드백 신속 반영으로 만족도 85% 달성",
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
    `이번 프로젝트를 통해 Electron을 활용하여 데스크톱 애플리케이션을 처음으로 
      개발해보면서, 도전과 배움의 연속이었습니다. 기존에 주로 웹 
      개발만 진행했던 저로서는 데스크톱 환경과 키오스크 같은 특수 장비에 맞추어서
      개발하는 것이 낯설었지만, Electron의 구조와 동작 방식을 익히면서 새로운 기술에 
      대한 자신감을 쌓고 성취도 얻게 되었습니다.`,
    `처음 고객사의 요구사항을 들었을 때, 데이터를 오프라인에서 관리하고 반영할 
      방법에 대해 고민이 많았습니다. 하지만 팀원들과 논의하고 여러 레퍼런스를 
      참고한 끝에, 프로그램이 로컬 파일에 직접 접근하도록 개발하면 좋겠다는 
      결론을 낼 수 있었습니다. 고객사 관계자가 로컬 파일에 이미지나 데이터를 
      변경했을 때 프로그램에 자동으로 반영되도록 설계하면, 유지보수 과정도 
      간단해질 것이라고 판단했습니다.`,
    `이 방식으로 구현을 진행하면서 로컬 파일 시스템을 활용한 데이터 관리가 
      생각보다 실용적이고 효율적이라는 점을 저로써도 새롭게 발견할 수 있었습니다. 
      유지보수가 편리해졌을 뿐만 아니라, 고객사에서도 해당 방법에 대해 매우 
      긍정적인 반응을 보였습니다. 고객사가 자체적으로 실시한 설문조사에서 
      "편리하다"는 답변이 다수를 차지하며 85% 이상의 높은 만족도를 기록하는 
      성과를 낼 수 있었습니다.`,
    `뿐만 아니라 고객사의 요구사항을 신속하게 정리하고 해결 방안을 설계한 
    덕분에, 원래 2주로 계획된 개발 기간보다 빠른 1주 반 만에 프로젝트를 
    완료할 수 있었습니다. 이를 통해 조기 납품이 가능해졌고 고객사로부터 
    신뢰를 얻는 데 큰 도움이 되었습니다. 또한, 고객사의 내부 일정에 
    여유가 생겼으며 긍정적인 협업 분위기 형성에도 기여할 수 있었습니다.`,
  ],
}
