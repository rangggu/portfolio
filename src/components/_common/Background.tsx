import { cn } from "@/utils/commonUtils"
import Image from "next/image"
import { memo } from "react"

export default memo(function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
      <Image
        className={cn("w-full h-full object-cover")}
        src="/images/background.png"
        alt="배경 이미지"
        width={1920}
        height={1080}
        quality={100}
        priority
      />
    </div>
  )
})
