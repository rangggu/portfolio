import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        yellow500: "#FEB925",
        gray300: "#AFAFAF",
        gray700: "#6B6B6B",
        blue700: "#011B2F",
      },
      fontSize: {
        h1: ["68px", "135%"],
        h2: ["60px", "135%"],
        h3: ["48px", "135%"],
        title1: ["44px", "135%"],
        title2: ["42px", "135%"],
        title3: ["40px", "135%"],
        title4: ["38px", "135%"],
        subtitle1: ["36px", "135%"],
        subtitle2: ["32px", "135%"],
        subtitle3: ["28px", "135%"],
        body1: ["20px", "150%"],
        body2: ["18px", "150%"],
        body3: ["16px", "150%"],
        caption1: ["16px", "135%"],
      },
    },
  },
  plugins: [],
} satisfies Config
