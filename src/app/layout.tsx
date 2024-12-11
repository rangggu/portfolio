import type { Metadata } from "next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Lily Portfolio",
  description: "프론트엔드 개발자 김규리를 소개해요.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
