import { cn } from "@/utils/commonUtils"
import Image from "next/image"
import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { IoClose } from "react-icons/io5"

interface Props {
  functions?: {
    name: string
    icon: string
    info?: { title?: string; desc: string }[]
    code?: string[]
    image?: {
      url: string
      landscape: boolean
    }
  }[]
  tag: "직장" | "사이드" | "개인"
}
export default function Function(props: Props) {
  const { functions, tag } = props
  const [func, setFunc] = useState<number>(-1)
  const [isCodeActive, setIsCodeActive] = useState<boolean>(false)

  return (
    <div className="relative flex flex-col items-center w-full bg-blue600">
      <h4 className="w-full py-5 text-center text-body1 font-semibold bg-blue600">
        {tag === "직장" ? "상세 업무" : "주요 기능"}
      </h4>
      <div className="flex flex-wrap justify-center gap-4 w-full px-16 pt-2 py-5">
        {functions?.map(({ name, icon, info, code, image }, index) => (
          <div className="relative w-[48%] min-h-16" key={index}>
            <div
              key={index}
              className={cn(
                "absolute flex flex-col w-full bg-black bg-opacity-15 rounded-xl hover:bg-[#111d25] transition-[max-height] duration-200 overflow-hidden",
                index === func
                  ? "h-auto max-h-[520px] bg-[#111d25] bg-opacity-100 z-20 shadow-total"
                  : "h-auto max-h-16 transition-all z-10 delay-100",
              )}
            >
              <div
                className="relative flex items-center justify-center gap-1 w-full py-4 cursor-pointer"
                onClick={() => {
                  func === index ? setFunc(-1) : setFunc(index)
                }}
              >
                <span className="text-body1">{icon}</span>
                <h5 className="text-body2">{name}</h5>
                {func === index && (
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFunc(-1)
                    }}
                  >
                    <IoClose className="w-full h-full" />
                  </button>
                )}
              </div>
              <div className={cn("flex flex-col w-full h-full", index === func && "overflow-auto")}>
                {image && (
                  <div
                    className={cn(
                      "flex mx-auto",
                      image.landscape ? "w-full h-[280px]" : "w-[50%] h-[380px]",
                      index === func ? "opacity-100 delay-200" : "opacity-0 delay-200",
                    )}
                  >
                    <Image
                      className="object-cover"
                      src={image.url}
                      alt={`slide`}
                      quality={100}
                      loading="lazy"
                      width={image.landscape ? 600 : 440}
                      height={image.landscape ? 280 : 380}
                    />
                  </div>
                )}
                {info?.map(({ title, desc }, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex flex-col gap-2 p-4",
                      index === func ? "opacity-100 delay-200" : "opacity-0 delay-200",
                    )}
                  >
                    {title && <h5 className="font-semibold">{title}</h5>}
                    <p
                      className="text-body3 font-light text-gray100 px-3 py-1.5 rounded-lg bg-white bg-opacity-10"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    />
                  </div>
                ))}

                {code && (
                  <div
                    className={cn(
                      "flex flex-col gap-2 p-4 w-full text-body4",
                      index === func ? "opacity-100 delay-200" : "opacity-0 delay-200",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-body1 font-semibold">관련 코드</h5>
                      <button className="w-5 h-5" onClick={() => setIsCodeActive(!isCodeActive)}>
                        {isCodeActive ? (
                          <IoIosArrowUp className="w-full h-full" />
                        ) : (
                          <IoIosArrowDown className="w-full h-full" />
                        )}
                      </button>
                    </div>
                    {isCodeActive &&
                      code?.map((item, idx) => (
                        <pre
                          key={idx}
                          className="p-2 px-3 font-light text-gray-100 bg-black bg-opacity-30 rounded-lg overflow-auto"
                        >
                          <code>{item}</code>
                        </pre>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {functions && functions?.length % 2 === 1 && <div className="relative w-[48%] min-h-16" />}
      </div>
    </div>
  )
}
