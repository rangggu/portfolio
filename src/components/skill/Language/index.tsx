import { childVariants } from "@/styles/animations/variants"
import { motion } from "framer-motion"
import IconButton from "../IconButton"

export default function Language() {
  return (
    <motion.div className="flex flex-col gap-5 w-full" variants={childVariants}>
      <h2 className="text-subtitle3 font-semibold text-yellow500">Language</h2>
      <div className="relative flex items-center gap-4">
        <IconButton
          disabled={true}
          src="/images/icon/html.png"
          text="HTML5"
          desc="HTML5의 웹 표준을 준수하며, 효율적이고 접근성 있는 HTML 문서 구조를 설계할 수
            있습니다."
        />
        <IconButton
          disabled={true}
          src="/images/icon/css.png"
          text="CSS3"
          desc="CSS3 규칙을 준수하며, 반응형 디자인과 크로스브라우저 호환성을 고려한 스타일링을 구현할 수 있습니다."
        />
        <IconButton
          disabled={true}
          src="/images/icon/javascript.png"
          text="JavaScript"
          desc="ES6+의 최신 문법을 활용하여 더 간결하고 효율적인 JavaScript 코드를 작성할 수 있습니다."
        />
        <IconButton
          disabled={true}
          src="/images/icon/typescript.png"
          text="TypeScript"
          desc="JavaScript의 동적 타이핑 이슈를 보완할 수 있는 TypeScript의 정적 타입 시스템에 대해 이해하고 있으며, 
            이를 통해 안정적인 코드를 작성할 수 있습니다."
        />
      </div>
    </motion.div>
  )
}
