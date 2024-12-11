import Image from "next/image"

export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
      <Image
        className="w-full h-full"
        src="/images/background.png"
        alt="배경 이미지"
        objectFit="cover"
        width={1920}
        height={1080}
        quality={100}
        priority
      />
    </div>
  )
}
