import { childVariants } from "@/styles/animations/_common"
import { motion } from "framer-motion"
import IconButton from "../IconButton"

export default function Library() {
  return (
    <motion.div className="flex flex-col gap-5 w-full" variants={childVariants}>
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
        <IconButton
          src="/images/icon/jquery.png"
          text="jQuery"
          desc="jQuery를 사용해 DOM 조작과 이벤트 핸들링을 간편하게 처리할 수 있습니다."
        />
      </div>
    </motion.div>
  )
}
