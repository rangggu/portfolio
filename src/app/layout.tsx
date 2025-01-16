import type { Metadata } from "next"
import localFont from "next/font/local"
import "@/styles/globals.css"
import { cn } from "@/utils/commonUtils"
import { SectionsProvider } from "@/contexts/SectionContext"

const pretendard = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
})

export const metadata: Metadata = {
  title: "Lily Portfolio",
  description: "프론트엔드 개발자 김규리를 소개해요.",
  icons: {
    icon: "/favicons/favicon.ico",
  },
  openGraph: {
    title: "Lily Portfolio",
    description: "프론트엔드 개발자 김규리를 소개해요.",
    url: "https://www.lily-developer.me/",
    type: "website",
    images: [
      {
        url: "/images/metadata/image.png", // 실제 이미지 URL
        width: 1440,
        height: 1024,
        alt: "Lily Portfolio",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn("font-pretendard", pretendard.variable)}>
        <SectionsProvider>
          <div id="portal" />
          {children}
        </SectionsProvider>
      </body>
    </html>
  )
}
