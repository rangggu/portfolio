import { ProjectType } from "../project"

export const MALLANG: ProjectType = {
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
  contribution: 20,
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
          contribution: 50,
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
            커뮤니티 기능을 구현했습니다.`,
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
            사용자가 편리하게 접근할 수 있도록 했습니다. 
            각 목록들은 사용자 친화적인 UI로 구성되어 사용자의 접근성을 높였습니다.`,
        },
        {
          title: "결제/예약/작성글 내역 확인",
          desc: `사용자가 결제, 예약, 
            작성한 글 등의 활동 내역을 한눈에 확인할 수 있도록 
            인터페이스를 설계했습니다.`,
          contribution: 50,
        },
      ],
    },
    {
      name: "프로모션 및 결제",
      icon: "💳",
      info: [
        {
          title: "프로모션 코드 지원",
          desc: `프로모션 코드 시스템은 프로모션 코드가 입력되면 
            즉시 유효성을 검증하도록 설계되었고, UI에도 즉각 반영되도록 구현되었습니다.`,
          contribution: 100,
        },
        {
          title: "결제 프로세스",
          desc: `PASS 결제 시스템과의 연동을 통해 직관적이고 안정적인 결제 
            흐름을 구현했습니다.`,
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
            각 권한에 맞는 인터페이스를 제공했습니다.`,
          contribution: 50,
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
          contribution: 50,
        },
        {
          title: "데이터 기반 의사결정 지원",
          desc: `수집된 데이터를 운영팀과 공유하여 의사결정 과정에서 실질적인 
            참고 자료로 활용했습니다.`,
          contribution: 100,
        },
      ],
    },
  ],
  meaning: [
    `첫번째로, 프로젝트에 적응하면서 실제 업무를 맡아 소스 코드를 수정했던 경험이 
    큰 도움이 되었습니다. 예를 들어, 기존에는 파티 카드만 렌더링되었지만, 카드 수가 
    적을 때 서비스가 비활성화된 것처럼 보인다는 운영팀의 피드백을 반영하여 
    드라이버 카드를 추가로 렌더링하는 작업을 진행했습니다. 처음에는 간단한 
    수정이라고 생각했지만, 프로젝트의 규모와 복잡한 로직으로 인해 예상보다 시간이 
    더 소요되었습니다. 그러나 실제 업무를 통해 소스 코드를 직접 수정하면서 기존 
    코드베이스를 깊이 이해하게 되었고, 다른 개발자들의 코드를 분석하는 능력도 
    향상되었습니다. 결국 목표를 달성하여 서비스가 더욱 활발하게 보이도록 
    구현할 수 있었고, 이로 인해 큰 보람을 느꼈습니다.`,
    `또한, 네이버 프리미엄 로그 분석을 연동하는 작업은 처음 시도해보는 일이었기에 
    많은 것을 배울 수 있었습니다. 작업 초기에는 생소한 과정이라 걱정도 많았지만, 
    관련 담당자와의 적극적인 소통과 피드백 반영을 통해 성공적으로 진행할 수 
    있었습니다. 특히, 로그 분석 연동 후 심사와 검수를 요청하는 절차를 거치면서 
    신생 플랫폼이 외부와 연동될 때 필요한 과정들도 구체적으로 이해하게 되었습니다.`,
    `마지막으로 말랑트립에 합류하면서 초기 스타트업의 빠르게 변하는 환경과 프로세스를 직접 
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
}
