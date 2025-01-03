import { useAnimation } from "@/hooks/useAnimation"
import Image from "next/image"
import Link from "next/link"
import { BsFillTelephoneFill } from "react-icons/bs"
import { FaGithub } from "react-icons/fa"
import { IoIosSend } from "react-icons/io"
import { motion } from "framer-motion"
import { infoVariants } from "@/styles/animations/profile"

interface Props {
  isVisible: boolean
}

export default function Information({ isVisible }: Props) {
  const infoAnimation = useAnimation(isVisible, infoVariants)

  return (
    <motion.div
      {...infoAnimation}
      className="flex flex-col items-center justify-between w-[300px] h-[88%]"
    >
      <motion.div className="flex flex-col items-center w-full text-h3 font-semibold">
        <h2 className="text-yellow500 tracking-widest leading-tight">FRONTEND</h2>
        <h2 className="text-yellow500 tracking-wider leading-tight">DEVELOPER</h2>
        <h2 className="tracking-[0.12em] leading-tight">KIM GYURI</h2>
      </motion.div>
      <motion.div className="relative w-[290px] h-[350px] rounded-3xl overflow-hidden">
        <Image
          className="object-cover"
          src="/images/headshot.jpg"
          alt="프로필 사진"
          width={290}
          height={350}
          quality={100}
          priority
        />
      </motion.div>
      <motion.div className="flex flex-col gap-4 w-full text-body1 tracking-wider">
        <div className="flex items-center gap-5">
          <BsFillTelephoneFill className="w-6 h-6" />
          <p>+82 10-5212-7478</p>
        </div>
        <div className="flex items-center gap-3">
          <IoIosSend className="relative top-[2px] -left-1 w-8 h-8" />
          <p>aliyah521@naver.com</p>
        </div>
        <div className="flex items-center gap-5">
          <FaGithub className="w-6 h-6" />
          <Link
            className="underline"
            href="https://github.com/rangggu"
            rel="noopener noreferrer"
            target="_blank"
          >
            링크
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
