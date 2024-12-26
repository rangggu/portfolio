import { useEffect, useRef, useState } from "react"

export const useTyping = (sentence: string, msDelay: number = 100): string => {
  const [word, setWord] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastTimestampRef = useRef<number | null>(null)

  useEffect(() => {
    let animationFrameId: number
    const animateTyping = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp
      }
      const elapsed = timestamp - lastTimestampRef.current
      if (elapsed > msDelay && currentIndex < sentence.length) {
        lastTimestampRef.current = timestamp
        setWord((prev) => prev + sentence[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }
      if (currentIndex < sentence.length) {
        animationFrameId = requestAnimationFrame(animateTyping)
      }
    }
    animationFrameId = requestAnimationFrame(animateTyping)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [currentIndex, msDelay, sentence])
  return word
}
