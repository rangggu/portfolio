import { childVariants } from "@/styles/animations/_common"
import { motion } from "framer-motion"
import IconButton from "../IconButton"

export default function Style() {
  return (
    <motion.div className="flex flex-col gap-5 w-full" variants={childVariants}>
      <h2 className="text-subtitle3 font-semibold text-yellow500">Style</h2>
      <div className="relative flex items-center gap-4">
        <IconButton
          src="/images/icon/sass.png"
          text="SCSS"
          desc="SCSS를 활용해 코드의 재사용성과 유지 보수성을 높인 스타일링을 할 수 있습니다."
        />
        <IconButton
          src="/images/icon/css-module.png"
          text="CSS Module"
          desc="CSS Module을 통해 클래스명 충돌 없이 모듈화된 스타일링을 구현할 수 있습니다."
        />
        <IconButton
          src="/images/icon/styled-components.png"
          text="Styled Components"
          desc="Styled Components를 사용해 컴포넌트 기반 스타일링을 구현할 수 있고, 
          props와 조건부 로직을 활용해 동적인 스타일을 작성할 수 있습니다."
        />
        <IconButton
          src="/images/icon/styled-components.png"
          text="Emotion"
          desc="Emotion을 활용해 컴포넌트 기반 CSS-in-JS 스타일링을 구현할 수 있고, 
          props를 활용한 동적 스타일링이 가능합니다."
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
    </motion.div>
  )
}
