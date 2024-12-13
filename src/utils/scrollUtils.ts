export const scrollToSection = (sectionId: string, sectionsRef: (HTMLDivElement | null)[]) => {
  const targetSection = sectionsRef.find((section) => section?.id === sectionId)
  if (targetSection) {
    const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    })
  }
}

export const isValidSection = (sectionId: string, sections: { id: string }[]) => {
  return sections.some((section) => section.id === sectionId)
}
