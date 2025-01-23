import { ProjectType } from "../project"

export const MINE: ProjectType = {
  index: 6,
  title: "MineSweeper Game",
  subtitle: "지뢰찾기 게임",
  background: "/images/project/mine.png",
  desc: ["1人 개인 프로젝트", "게임 디자인 및 개발", "재귀 및 스택을 통한 지뢰 찾기 로직 설계"],
  date: "@2024. 10.",
  tag: "개인",
  contribution: 100,
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
      중요성을 깨닫게 되었고, 이를 위해 개인적으로라도 자바스크립트의 기초와 컴퓨터 
      과학(CS) 지식에 대해 학습하는 것을 결심하게 되었습니다.`,
    `어떻게 공부해 볼까 고민하던 중, 흔히 아는 게임이지만 구현하기는 다소 
    어려운 지뢰찾기 게임의 로직을 직접 구현해보는 것이 
      좋은 방법이겠다고 생각하여 이 프로젝트를 
      시작하게 되었습니다. 이를 통해 잊고 지냈던 기초적인 자바스크립트 문법과 
      알고리즘을 복습할 수 있었습니다.`,
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
    `이번 프로젝트를 통해 오랫동안 간과했던 알고리즘을 다시 학습할 수 있어 유익했습니다. 
    특히, 빈 칸을 클릭할 때 주변의 숫자 칸과 추가 빈 칸을 여는 로직을 구현하는 과정이 
    기억에 남습니다. 이 로직은 저에게 상당히 복잡하게 느껴져 구현 방법에 대해 많은 
    고민을 했었는데, 많은 탐구 끝에 빈 칸이 연속으로 발생할 경우에는 각 빈 칸의 위치 
    데이터를 스택에 저장한 후 하나씩 꺼내어 로직을 검증하는 방식으로 설계할 수 있었습니다. 
    처음에는 이러한 접근 방식을 떠올리기 어려웠지만, 알고리즘과 재귀 개념을 깊이 있게 
    이해하고 적용하면서 문제를 해결할 수 있었습니다. 이를 통해 복잡한 비즈니스 
    로직을 더욱 효율적으로 설계하는 방법을 배웠습니다.`,
    `또한, 사용자 피드백의 중요성을 깨닫게 되었습니다. 초기에는 난이도를 
    초보자, 중급자, 고급자 세 단계로만 설정했으나, 지인들에게 게임을 시연했을 때 
    "난이도를 조절할 수 없나요?"라는 의견을 받았습니다. 이를 반영하여 가로와 세로 
    셀 수를 자유롭게 조절할 수 있는 기능을 추가하고 UI를 개선했습니다. 
    개선 작업을 진행하면서 게임의 진입장벽을 낮추기 위해 사용자가 직접 
    난이도를 설정할 수 있는 기능이 필요하다는 점을 실감하게 되었고, 
    이는 사용자 피드백이 얼마나 중요한지를 다시 한번 확인시켜 주었습니다.`,
    `마지막으로, TypeScript의 장점을 다시 한 번 체감할 수 있었습니다. 
    특히, TypeScript의 enum을 활용하여 셀의 다양한 상태를 효율적으로 관리함으로써 
    코드의 체계화를 이룰 수 있었습니다. 빈 셀, 숫자 셀, 열린 숫자 셀, 지뢰 셀, 
    그리고 깃발이 꽂힌 지뢰 셀 등 여러 상태를 구분하는 것이 처음에는 
    혼란스러웠지만, enum을 통해 셀 타입을 미리 정의해 두니 개발 과정에서 
    큰 도움이 되었습니다. TypeScript의 강력한 타입 시스템 덕분에 더욱 
    안정적인 코드를 작성할 수 있었으며, TypeScript의 이점을 다시 한번 느낄 수 있었습니다.`,
  ],
  link: {
    web: "https://ranggu-minesweeper.vercel.app/",
    github: "https://github.com/rangggu/minesweeper",
  },
}
