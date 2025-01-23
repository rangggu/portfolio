import { ProjectType } from "../project"

export const HEYTOSSME: ProjectType = {
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
  contribution: 30,
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
      있도록 하는 데 초점을 맞췄습니다.`,
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
}
