import IconButton from "./IconButton"

export default function Skill() {
  return (
    <div className="flex flex-col items-center justify-center gap-[52px] w-[70%] h-full mx-auto pt-20">
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-subtitle3 font-semibold text-yellow500">Language</h2>
        <div className="relative flex items-center gap-4">
          <IconButton
            src="/images/icon/html.png"
            text="HTML5"
            desc="HTML5의 웹 표준을 준수하며, 효율적이고 접근성 있는 HTML 문서 구조를 설계할 수
            있습니다."
          />
          <IconButton
            src="/images/icon/css.png"
            text="CSS3"
            desc="CSS3 규칙을 준수하며, 반응형 디자인과 크로스브라우저 호환성을 고려한 스타일링을 구현할 수 있습니다."
          />
          <IconButton
            src="/images/icon/javascript.png"
            text="JavaScript"
            desc="ES6+의 최신 문법을 활용하여 더 간결하고 효율적인 JavaScript 코드를 작성할 수 있습니다."
          />
          <IconButton
            src="/images/icon/typescript.png"
            text="TypeScript"
            desc="JavaScript의 동적 타이핑 이슈를 보완할 수 있는 TypeScript의 정적 타입 시스템에 대해 이해하고 있으며, 
            이를 통해 안정적인 코드를 작성할 수 있습니다."
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-subtitle3 font-semibold text-yellow500">Framework</h2>
        <div className="relative flex items-center gap-4">
          <IconButton
            src="/images/icon/react.png"
            text="React"
            desc="React Hooks를 활용해 효율적이고 재사용 가능한 컴포넌트 UI를 구축할 수 있으며,
            상태 관리와 생명주기 메서드를 이해하고 있습니다."
          />
          <IconButton
            src="/images/icon/react.png"
            text="React Native"
            desc="React를 사용해 iOS와 Android용 크로스 플랫폼 모바일 앱을 개발할 수 있으며, 
            네이티브 모듈을 활용해 하드웨어 접근 기능을 구현할 수 있습니다."
          />
          <IconButton
            src="/images/icon/next.png"
            text="Next.js"
            desc="서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 통해 SEO 최적화된 웹 애플리케이션을 개발할 
            수 있으며, 라우팅 시스템을 효과적으로 활용할 수 있습니다."
          />
          <IconButton
            src="/images/icon/electron.png"
            text="Electron"
            desc="Electron을 사용하여 웹 기술 기반의 데스크톱 애플리케이션을 개발할 수 있습니다."
          />
          <IconButton src="/images/icon/nodejs.png" text="Node.js" desc="" />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-subtitle3 font-semibold text-yellow500">Library</h2>
        <div className="relative flex items-center gap-4">
          <IconButton
            src="/images/icon/recoil.png"
            text="Recoil"
            desc="Recoil을 활용해 클라이언트 상태 관리를 간편하게 구현할 수 있으며, 
            React 애플리케이션에서의 상태 관리를 최적화할 수 있습니다."
          />
          <IconButton
            src="/images/icon/redux-toolkit.png"
            text="Redux Toolkit"
            desc="Redux의 복잡성을 줄이고 생산성을 높여주는 Redux-Toolkit을 활용해 
            상태 관리를 구현할 수 있으며 성공적으로 적용시킨 경험이 있습니다."
          />
          <IconButton
            src="/images/icon/react-query.png"
            text="React query"
            desc="데이터 캐싱, 자동 갱신 등 React Query의 기능을 프로젝트에 적용해 
            서버 상태 관리와 비동기 데이터를 효율적으로 처리할 수 있습니다."
          />
          <IconButton
            src="/images/icon/apexchart.png"
            text="Apexchart.js"
            desc="ApexCharts.js를 사용해 대화형 차트와 그래프를 생성할 수 있으며, 
            데이터를 시각적으로 효과적으로 표현할 수 있습니다."
          />
          <IconButton
            src="/images/icon/socket-io.png"
            text="Socket.io"
            desc="Socket.io를 통해 실시간 양방향 통신을 구현할 수 있으며, 
            웹소켓을 지원하지 않는 환경에서도 안정적인 연결을 유지할 수 있습니다."
          />
          <IconButton src="/images/icon/jquery.png" text="jQuery" desc="" />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <h2 className="text-subtitle3 font-semibold text-yellow500">Style</h2>
        <div className="relative flex items-center gap-4">
          <IconButton
            src="/images/icon/sass.png"
            text="SCSS"
            desc="CSS Module과 SCSS의 장점을 활용하여 활용하여 모듈화된 스타일링과 중첩된 스타일 규칙을 작성할 수 있습니다."
          />
          <IconButton
            src="/images/icon/css-module.png"
            text="CSS Module"
            desc="CSS Module과 SCSS의 장점을 활용하여 활용하여 모듈화된 스타일링과 중첩된 스타일 규칙을 작성할 수 있습니다."
          />
          <IconButton
            src="/images/icon/styled-components.png"
            text="Styled Components"
            desc="조건부 스타일링과 테마 관리에 대한 이해를 바탕으로 컴포넌트 기반의 CSS-in-JS 코드를 작성할 수 있습니다."
          />
          <IconButton
            src="/images/icon/styled-components.png"
            text="Emotion"
            desc="조건부 스타일링과 테마 관리에 대한 이해를 바탕으로 컴포넌트 기반의 CSS-in-JS 코드를 작성할 수 있습니다."
          />
          <IconButton
            src="/images/icon/tailwind.png"
            text="Tailwind CSS"
            desc="Tailwind CSS의 유틸리티 클래스를 활용하여 빠르고 효율적인 스타일링이 가능하며,
            커스텀 클래스를 작성해 프로젝트 요구에 맞춘 스타일링을 자유롭게 적용할 수 있습니다."
          />
          <IconButton
            src="/images/icon/tailwind.png"
            text="nativewind"
            desc="React Native 환경에서 Tailwind CSS의 유틸리티 클래스를 사용하여 스타일링할 수 있습니다."
          />
          <IconButton
            src="/images/icon/mui.png"
            text="MUI"
            desc="MUI 컴포넌트 라이브러리를 활용해 빠르고 일관성 있는 UI를 구성할 수 있으며, 
            커스터마이징을 통해 프로젝트 요구사항에 맞는 스타일을 적용할 수 있습니다."
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full pb-8">
        <h2 className="text-subtitle3 font-semibold text-yellow500">Tool</h2>
        <div className="relative flex items-center gap-4">
          <IconButton
            src="/images/icon/git.png"
            text="Git"
            desc="팀 프로젝트에서 Git 레포지토리를 생성하고 관리할 수 있으며, 
            GitHub와 Gitea를 활용해 소스 코드를 효과적으로 공유하고 버전 관리를 수행할 수 있습니다."
          />
          <IconButton
            src="/images/icon/github.png"
            text="Github"
            desc="팀 프로젝트에서 Git 레포지토리를 생성하고 관리할 수 있으며, 
            GitHub와 Gitea를 활용해 소스 코드를 효과적으로 공유하고 버전 관리를 수행할 수 있습니다."
          />
          <IconButton
            src="/images/icon/gitea.png"
            text="Gitea"
            desc="팀 프로젝트에서 Git 레포지토리를 생성하고 관리할 수 있으며, 
            GitHub와 Gitea를 활용해 소스 코드를 효과적으로 공유하고 버전 관리를 수행할 수 있습니다."
          />
          <IconButton
            src="/images/icon/figma.png"
            text="Figma"
            desc="Figma를 활용해 디자인 협업에 참여했으며, 
            제공된 디자인을 정확하게 구현하여 일관된 UI를 구성할 수 있습니다."
          />
          <IconButton src="/images/icon/notion.png" text="Notion" desc="" />
          <IconButton
            src="/images/icon/jira.png"
            text="Jira"
            desc="Notion과 Jira를 사용해 프로젝트 관리 및 작업 우선순위를 정리하고, 
            팀 협업과 업무 진척도를 효율적으로 관리할 수 있습니다."
          />
          <IconButton
            src="/images/icon/slack.png"
            text="Slack"
            desc="Notion과 Jira를 사용해 프로젝트 관리 및 작업 우선순위를 정리하고, 
            팀 협업과 업무 진척도를 효율적으로 관리할 수 있습니다."
          />
        </div>
      </div>
    </div>
  )
}
