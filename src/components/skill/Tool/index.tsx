import { childVariants } from "@/styles/animations/_common"
import { motion } from "framer-motion"
import IconButton from "../IconButton"

export default function Tool() {
  return (
    <motion.div className="flex flex-col gap-5 w-full pb-8" variants={childVariants}>
      <h2 className="text-subtitle3 font-semibold text-yellow500">Tool</h2>
      <div className="relative flex items-center gap-4">
        <IconButton
          src="/images/icon/git.png"
          text="Git"
          desc="Git을 활용해 소스 코드 버전 관리를 효율적으로 수행하며, 브랜치를 관리하고 병합 충돌을 해결할 수 있습니다."
        />
        <IconButton
          src="/images/icon/github.png"
          text="GitHub"
          desc="GitHub를 통해 협업 프로젝트를 관리하고, Pull Request와 코드 리뷰 프로세스를 원활히 수행할 수 있습니다."
        />
        <IconButton
          src="/images/icon/gitea.png"
          text="Gitea"
          desc="Gitea를 활용해 사내 저장소를 관리하고, 팀 협업을 지원하는 Git 레포지토리를 운영한 경험이 있습니다."
        />
        <IconButton
          src="/images/icon/figma.png"
          text="Figma"
          desc="Figma를 사용해 디자인 시안을 확인하고 개발에 반영하며, UI 일관성을 유지하는 데 기여했습니다."
        />
        <IconButton
          src="/images/icon/notion.png"
          text="Notion"
          desc="Notion을 이용해 프로젝트 계획 및 작업 진행 상황을 정리하고 문서화를 효율적으로 수행할 수 있습니다."
        />
        <IconButton
          src="/images/icon/jira.png"
          text="Jira"
          desc="Jira를 통해 프로젝트 업무를 체계적으로 관리하고, 작업 우선순위를 설정해 팀 생산성을 높일 수 있습니다."
        />
        <IconButton
          src="/images/icon/slack.png"
          text="Slack"
          desc="Slack을 활용해 팀원들과 효과적으로 소통하고, 알림 및 채널 관리를 통해 업무 효율성을 증대시켰습니다."
        />
      </div>
    </motion.div>
  )
}
