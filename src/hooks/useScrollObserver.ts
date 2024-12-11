import { useEffect } from "react"

export const useScrollObserver = (
  sectionsRef: (HTMLDivElement | null)[],
  updateUrl: (newUrl: string) => void,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const newUrl = sectionId === "main" ? "/" : `/${sectionId}`
            updateUrl(newUrl)
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    )

    sectionsRef.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [sectionsRef, updateUrl])
}
