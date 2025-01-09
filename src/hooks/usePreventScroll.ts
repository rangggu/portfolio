import { useEffect } from "react"

// 매개변수가 true일 때 스크롤을 차단하는 커스텀 훅
const usePreventScroll = (prevent: boolean) => {
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
    }

    if (prevent) {
      window.addEventListener("wheel", preventScroll, { passive: false })
      window.addEventListener("touchmove", preventScroll, { passive: false })
      window.addEventListener("keydown", preventScroll, { passive: false })
    } else {
      window.removeEventListener("wheel", preventScroll)
      window.removeEventListener("touchmove", preventScroll)
      window.removeEventListener("keydown", preventScroll)
    }

    // 컴포넌트가 언마운트될 때도 이벤트 리스너를 제거
    return () => {
      window.removeEventListener("wheel", preventScroll)
      window.removeEventListener("touchmove", preventScroll)
      window.removeEventListener("keydown", preventScroll)
    }
  }, [prevent])
}

export default usePreventScroll
