import { useState, useEffect } from 'react'

export function useCounter(target, duration = 2200, active = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return value
}
