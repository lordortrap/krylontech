'use client'

import { useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { languages, expertise } from './data'

const slides = [
  { id: 'languages', label: 'LANGUAGES', title: 'Languages I work in' },
  { id: 'expertise', label: 'EXPERTISE', title: 'What I am good at' },
] as const

const SWIPE_DISTANCE = 60
const SWIPE_VELOCITY = 400

export default function SkillsSwipe() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next: number) => {
    const n = (next + slides.length) % slides.length
    if (n === index) return
    setDir(next > index ? 1 : -1)
    setIndex(n)
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(index + 1)
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(index - 1)
  }

  const slide = slides[index]

  return (
    <div className="swipePanel" role="group" aria-roledescription="carousel" aria-label="Languages and expertise" tabIndex={0}
      onKeyDown={e => { if (e.key === 'ArrowRight') go(index + 1); if (e.key === 'ArrowLeft') go(index - 1) }}>
      <div className="swipeHead">
        <div className="swipeTabs" role="tablist">
          {slides.map((s, i) => (
            <button key={s.id} role="tab" aria-selected={i === index} className={i === index ? 'swipeTab active' : 'swipeTab'} onClick={() => go(i)}>{s.label}</button>
          ))}
        </div>
        <div className="swipeNav">
          <span className="swipeHint">SWIPE ⇄</span>
          <button type="button" aria-label="Previous" onClick={() => go(index - 1)}>‹</button>
          <button type="button" aria-label="Next" onClick={() => go(index + 1)}>›</button>
        </div>
      </div>

      <div className="swipeViewport">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={slide.id}
            className="swipeSlide"
            custom={dir}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={onDragEnd}
            variants={{
              enter: (d: number) => ({ x: d * 70, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d * -70, opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <h3>{slide.title}</h3>
            {slide.id === 'languages' ? (
              <ul className="langList">
                {languages.map(l => (
                  <li key={l.name}>
                    <div><strong>{l.name}</strong><span>{l.level}</span></div>
                    <i style={{ ['--lvl' as string]: `${l.percent}%` }} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="expertList">
                {expertise.map(x => <li key={x}>{x}</li>)}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="swipeDots" aria-hidden="true">
        {slides.map((s, i) => <i key={s.id} className={i === index ? 'on' : ''} />)}
      </div>
    </div>
  )
}
