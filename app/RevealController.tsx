'use client'

import { useEffect } from 'react'

// blocks that fade/slide/unblur into view when scrolled to
const BLOCKS = [
  '.sectionHead > *', '.twoCol > *', '.capGrid', '.stackCard', '.workflowLayout > *', '.quickCard',
  '.projectCard', '.reviewEmpty', '.faqItem', '.reviewCard', '.demoNote', '.certificateCard', '.priceCard', '.contactBox', '.footer',
].join(',')
// headings revealed word by word
const HEADINGS = '.section h2, .workflowLayout h2'

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return
  el.dataset.split = '1'
  let i = 0
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach(n => {
      if (n.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment()
        ;(n.textContent || '').split(/(\s+)/).forEach(part => {
          if (!part) return
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return }
          const w = document.createElement('span')
          w.className = 'w'
          w.style.setProperty('--i', String(i++))
          w.textContent = part
          frag.appendChild(w)
        })
        n.parentNode?.replaceChild(frag, n)
      } else if (n.nodeType === Node.ELEMENT_NODE) walk(n)
    })
  }
  walk(el)
  el.classList.add('words')
}

export default function RevealController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const vh = window.innerHeight
    const targets: HTMLElement[] = []

    document.querySelectorAll<HTMLElement>(HEADINGS).forEach(h => {
      if (h.getBoundingClientRect().top < vh * 0.9) return // already on screen at load
      splitWords(h)
      targets.push(h)
    })

    const groups = new Map<Element, number>()
    document.querySelectorAll<HTMLElement>(BLOCKS).forEach(el => {
      if (el.getBoundingClientRect().top < vh * 0.9) return
      const idx = groups.get(el.parentElement as Element) ?? 0
      groups.set(el.parentElement as Element, idx + 1)
      el.style.setProperty('--d', `${Math.min(idx, 5) * 0.09}s`)
      el.classList.add('reveal')
      targets.push(el)
    })

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        e.target.classList.add('in')
        io.unobserve(e.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  return null
}
