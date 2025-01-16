import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { PreviewType } from "@/data/project"
import Slider from "react-slick"
import Image from "next/image"

interface Props {
  preview?: PreviewType
}

export default function Preview({ preview }: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className="relative w-[50%] h-full rounded-xl overflow-hidden">
      {preview?.type === "youtube" && (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={preview?.link}
          title="preview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      {preview?.type === "image" && (
        <div className="relative w-full h-full">
          <Slider {...settings}>
            {preview.link.map((image, index) => (
              <div key={index} className="relative w-full h-[290px] bg-black">
                {!!image ? (
                  <Image
                    className="object-contain"
                    src={image}
                    alt={`slide-${index}`}
                    quality={100}
                    fill
                    loading="lazy"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-blue600">
                    <span className="text-title1">🔐</span>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}
