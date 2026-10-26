'use client'

import { useEffect, useRef } from 'react'

// elements that get a light-catching border following the pointer
const CARDS = '.stackCard,.quickCard,.projectCard,.priceCard,.certificateCard,.contactBox,.aboutPanel,.capGrid,.workflowMonitor'

export default function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // mouse-like pointers only; skip touch screens
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches // no trailing, glow sticks to the pointer
    const g = glow.current
    if (!g) return

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2
    let gx = tx, gy = ty
    let raf = 0
    let seen = false
    let lit = 0

    const lightCards = () => {
      lit = 0
      document.querySelectorAll<HTMLElement>(CARDS).forEach(el => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${tx - r.left}px`)
        el.style.setProperty('--my', `${ty - r.top}px`)
      })
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY
      if (!seen) { seen = true; gx = tx; gy = ty; g.style.opacity = '1' }
      if (!lit) lit = requestAnimationFrame(lightCards)
    }
    const onLeave = () => { g.style.opacity = '0'; seen = false }

    const frame = () => {
      gx += (tx - gx) * (calm ? 1 : 0.12); gy += (ty - gy) * (calm ? 1 : 0.12) // soft trailing glow
      g.style.transform = `translate3d(${gx}px,${gy}px,0) translate(-50%,-50%)`
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onMove as unknown as EventListener, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(lit)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onMove as unknown as EventListener)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={glow} className="cursorGlow" aria-hidden="true" />
}
