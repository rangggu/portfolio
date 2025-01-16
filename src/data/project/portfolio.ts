import { ProjectType } from "../project"

export const PORTFOLIO: ProjectType = {
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
      측면에서 다소 일관성이 부족하다는 한계가 있었습니다. 특히 포트폴리오를 
      보는 사람들에게 명확한 인상을 주기에는 아쉬운 부분이 많아 개선의 필요성을 
      느끼게 되었습니다. 이에 따라 가독성이 뛰어나고 정보를 효과적으로 전달할 수 
      있는 새로운 포트폴리오를 제작하고자 했습니다.`,
    `단순히 정보만 나열하는 것이 
      아니라 직관적인 레이아웃과 디자인으로 사용자 경험을 향상시키는 것을 
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
            피로감을 최소화하는 색상 조합을 적용해 모든 탭의 디자인을 완성했습니다.`,
        },
        {
          title: "풀페이지 스크롤",
          desc: `풀페이지 스크롤 로직을 설계하기 위해 마우스 휠 이벤트의 
            기본 동작을 막고 직접 커스텀하여 구현하였습니다.`,
        },
        {
          title: "상호작용 강화",
          desc: `호버 이벤트를 전략적으로 활용하여 사용자와의 상호작용을 극대화했습니다. 
            버튼이나 텍스트 박스 등 주요 요소에 반응형 인터랙션을 추가해 더 나은 시각적 피드백을 
            제공하고자 했습니다.`,
        },
        {
          title: "애니메이션 활용",
          desc: `Framer Motion 라이브러리를 활용해 각 탭의 콘텐츠에 맞는 애니메이션을 
            구현했습니다. 자연스러운 전환 효과를 통해 사용자가 내용을 직관적으로 
            이해할 수 있도록 돕고, 인터랙션에 생동감을 더했습니다.`,
        },
        {
          title: "타이핑 애니메이션 구현",
          desc: `커스텀 훅인 useTyping을 생성하여 텍스트가 
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
            내용을 명확히 파악할 수 있도록 했습니다.`,
        },
        {
          title: "시멘틱 태그 활용",
          desc: `ul, li, h1~h5 등 시멘틱 태그를 적극적으로 활용했습니다. 
            각 요소의 의미에 맞게 태그를 정의하고 구조화하여 접근성과 SEO 점수를 
            향상시킬 수 있었습니다.`,
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
          desc: `useMemo와 useCallback 훅을 사용하여 불필요한 렌더링을 방지했습니다.`,
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
    `프론트엔드 개발자는 기능 구현뿐만 아니라 전반적인 UI/UX와 세부적인 
    디테일까지 신경 써야 한다고 생각합니다. 이를 위해 상황에 맞는 애니메이션을 
    추가하고, 다양한 사용자 상호작용을 전략적으로 적용하려고 노력했습니다. 
    또한, 직접 Figma를 사용하여 주요 색상을 선정하고 시안 작업을 진행하면서 
    디자이너의 입장에서 디자인 과정에서 겪는 어려움과 세심한 요소 조율의 
    중요성을 깊이 이해하게 되었습니다. 그 결과, 콘텐츠 배치와 색상 활용 
    등 작은 요소들이 전체 사용자 경험에 미치는 영향을 체감할 수 있었습니다.`,
    `또한, Next.js의 App Router를 공부하고 적용하면서 새로운 라우팅 패턴에 
      대한 이해도를 높일 수 있었습니다. 이미 이전 프로젝트를 통해 
      Page Router를 사용해 봤었기 때문에
      익숙한 방식에서 벗어나기가 쉽지 않았지만, 여러 자료와 공식 문서를 
      참고하면서 점차 적응해 나갔습니다. 예상 외로 코드 구조가 간소화되는 
      기능들이 꽤 많아 페이지 라우팅 관리가 더 직관적이고 체계적으로 진행된다는 
      인상을 받았습니다. 이를 통해 프로젝트 전반의 구조를 깔끔하게 유지할 수 
      있었고, 새로 도입된 기능들을 적극적으로 활용하는 계기가 
      되었습니다.`,
    `마지막으로 배포 자동화와 도메인 구매 과정을 직접 진행하며 프로젝트 
      완성도를 높일 수 있었습니다. 처음에는 도메인까지 별도로 구매할 
      필요가 있을까 고민했지만 제대로 된 포트폴리오를 구축해보자는 마음으로 
      진행했습니다. 그 결과 GitHub Actions를 이용해 빌드·테스트를 자동화하고, 
      안정성이 확보된 후 Vercel로 배포하는 파이프라인을 완성하게 되었습니다. 
      이를 통해 배포 환경 체계화로 운영 효율이 극적으로 향상되는 것을 직접 확인할 수 
      있었고, 앞으로 더 복잡한 프로젝트에서도 CI/CD 프로세스를 손쉽게 구축할 수 
      있을 거란 자신감이 생겼습니다.`,
  ],
  link: {
    web: "https://www.lily-developer.me/",
    github: "https://github.com/rangggu/portfolio",
  },
}
