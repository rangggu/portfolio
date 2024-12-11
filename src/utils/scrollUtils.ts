export const scrollToSection = (sectionId: string, sectionsRef: (HTMLDivElement | null)[]) => {
  const targetSection = sectionsRef.find((section) => section?.id === sectionId)
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" })
  }
}

export const isValidSection = (sectionId: string, sections: { id: string }[]) => {
  return sections.some((section) => section.id === sectionId)
}
