import { ProjectType } from "../project"

export const WHAT: ProjectType = {
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
}
