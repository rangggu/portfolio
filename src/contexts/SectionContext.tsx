"use client"

import { TAB } from "@/types"
import React, { createContext, useContext, useRef } from "react"

type SectionsContextType = {
  sectionsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
  scrollToSection: (sectionId: TAB) => void
}

const SectionsContext = createContext<SectionsContextType | null>(null)

export const useSectionsContext = () => {
  const context = useContext(SectionsContext)
  if (!context) {
    throw new Error("useSectionsContext must be used within a SectionsProvider")
  }
  return context
}

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  const scrollToSection = (sectionId: TAB) => {
    const targetSection = sectionsRef.current.find((section) => section?.id === sectionId)
    if (targetSection) {
      const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <SectionsContext.Provider value={{ sectionsRef, scrollToSection }}>
      {children}
    </SectionsContext.Provider>
  )
}
