import { childVariants } from "@/styles/animations/_common"
import { motion } from "framer-motion"
import IconButton from "../IconButton"

export default function Framework() {
  return (
    <motion.div className="flex flex-col gap-5 w-full" variants={childVariants}>
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
        <IconButton
          src="/images/icon/node.png"
          text="Node.js"
          desc="Node.js 프로젝트를 파악하여 소스코드를 효율적으로 개선할 수 있습니다."
        />
      </div>
    </motion.div>
  )
}
