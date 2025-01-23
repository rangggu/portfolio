import { ProjectType } from "../project"

export const SUPERPOSITION: ProjectType = {
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
  contribution: 40,
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
      운영 환경을 깊이 이해하고 그에 맞게 설계하는 과정이었습니다. 
      우선 관리자들에게 가장 중요한 것은 "빠르고 효율적으로 작업을 처리하는 것"임을 알게 되어서, 
      이를 위해 직관적이고 사용하기 쉬운 화면을 만드는 데 집중했습니다. 
      뿐만 아니라 실제 운영진과 적극적으로 대화하며 필요한 기능과 불편한 점을 파악했고, 
      그 내용을 서비스에 반영하고자 노력했습니다. 이후 운영진들이 
      인터페이스가 편리하고 필요한 기능을 잘 찾아서 사용할 수 있게 되었다는 
      말씀을 해주셨을 때 정말 뿌듯했던 것 같습니다.`,
    `마지막으로, 프로젝트 전반에 걸쳐 팀원들과 원활하게 소통하며 협업할 수 있어서 좋았습니다. 
    소통이 잘 되고 팀워크가 뛰어난 동료들과 함께 일하면서 개발자로서의 시야를 넓힐 수 
    있었고, 서로의 강점을 살려 시너지를 창출할 수 있었습니다. 이러한 경험을 통해 
    소통과 신뢰가 프로젝트의 성공에 얼마나 중요한지 알 수 있었습니다.`,
  ],
  link: {
    web: "https://superposition-event.vercel.app",
    github: "https://github.com/Superposition-dev/Super_FE_Remake",
  },
}
