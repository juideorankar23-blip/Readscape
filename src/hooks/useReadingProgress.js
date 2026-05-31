import { useEffect, useState } from 'react'

export function useReadingProgress(targetRef) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculate = () => {
      const el = targetRef?.current
      if (!el) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = window.scrollY
        setProgress(docHeight > 0 ? (scrolled / docHeight) * 100 : 0)
        return
      }

      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = -rect.top

      if (total <= 0) {
        setProgress(rect.top < 0 ? 100 : 0)
        return
      }

      const value = (scrolled / total) * 100
      setProgress(Math.min(100, Math.max(0, value)))
    }

    calculate()

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculate()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', calculate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', calculate)
    }
  }, [targetRef])

  return progress
}