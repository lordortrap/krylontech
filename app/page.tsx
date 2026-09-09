'use client'

import { motion } from 'framer-motion'
import { FormEvent, useState } from 'react'

const projects = [
  {
    n: '01',
    title: 'E-Pharmacy',
    type: 'Bubble / Web App',
    year: '2026',
    text: 'A responsive e-pharmacy experience with medicine discovery, nearby pharmacy listings and a clean conversion-focused interface.',
    tags: ['Bubble.io', 'UX/UI', 'Responsive'],
    image: '/projects/e-pharmacy.png',
    url: 'https://epharmacyvpietukhov-31602.bubbleapps.io/version-test',
  },
  {
    n: '02',
    title: 'Growly',
    type: 'Bubble / EdTech',
    year: '2026',
    text: 'An online learning platform concept with courses, categories, FAQ, registration flow and a friendly product experience.',
    tags: ['Bubble.io', 'MVP', 'Product'],
    image: '/projects/growly.png',
    url: 'https://growly-67500.bubbleapps.io/version-test',
  },
]

const services = [
  ['01', 'Landing pages', 'High-converting landing pages with responsive layouts, motion and technical SEO.'],
  ['02', 'MVP development', 'Fast product validation in Bubble.io with workflows, databases and integrations.'],
  ['03', 'Web development', 'Modern websites and digital experiences built with Next.js, TypeScript and Vercel.'],
]

export default function Home() {
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main>
      <div className="noise" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="nav wrap">
        <a className="logo" href="#home" onClick={() => setMenu(false)}>
          KRYLON<span>TECH</span>
        </a>
        <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? 'CLOSE' : 'MENU'} <i /></button>
        <nav className={menu ? 'open' : ''}>
          <a href="#about" onClick={() => setMenu(false)}>About</a>
          <a href="#projects" onClick={() => setMenu(false)}>Project</a>
          <a href="#price" onClick={() => setMenu(false)}>Price</a>
          <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
        </nav>
        <a className="navCta" href="#contact">START A PROJECT <span>↗</span></a>
      </header>

      <section id="home" className="hero wrap">
        <div className="heroCopy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><span /> KRYLONTECH / DIGITAL DEVELOPMENT</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1 }}>WE ARE<br /><em>BUILDING</em><br />THE <span>FUTURE.</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .35 }}>I build websites, MVPs and digital products where technology, design and business meet.</motion.p>
          <div className="actions"><a className="primary" href="#projects">EXPLORE PROJECTS <b>↗</b></a><a className="textLink" href="#about">ABOUT KRYLONTECH</a></div>
        </div>

        <div className="heroVisual" aria-hidden="true">
          <div className="techOrb" />
          <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
          <div className="core"><span /><span /><span /><span /></div>
          <div className="hud hudA">SYSTEM / 01<br /><b>ONLINE</b></div>
          <div className="hud hudB">BUILD<br /><b>∞</b></div>
          <div className="beam" />
        </div>
        <div className="heroMeta"><span>SCROLL TO EXPLORE</span><span>© 2026 KRYLONTECH</span></div>
      </section>

      <section id="about" className="section wrap about">
        <div className="sectionNo">01 / ABOUT</div>
        <div className="aboutMain">
          <h2>TURNING IDEAS<br /><span>INTO DIGITAL PRODUCTS.</span></h2>
          <p className="lead">I&apos;m Vitalii — a Bubble.io developer focused on MVPs, landing pages and modern web experiences.</p>
          <p>I work from the first idea to a live product: structure, UI, responsive development, workflows, integrations, testing and deployment.</p>
          <a className="textLink" href="#contact">LET&apos;S BUILD SOMETHING <span>→</span></a>
        </div>
        <div className="profileCard">
          <div className="profileFrame"><img src="/profile/vitalii.jpg" alt="Vitalii — KrylonTech" /></div>
          <div className="profileMeta"><span>VITALII</span><span>DEVELOPER / BUILDER</span></div>
        </div>
      </section>

      <section className="section wrap services">
        <div className="sectionHead"><div><div className="sectionNo">02 / CAPABILITIES</div><h2>WHAT I<br /><span>BUILD.</span></h2></div><span className="sideNote">IDEA / DESIGN / DEVELOPMENT / LAUNCH</span></div>
        <div className="serviceGrid">{services.map(([n, title, text]) => <motion.article key={n} whileHover={{ y: -6 }} className="service"><span>{n}</span><h3>{title}</h3><p>{text}</p><i>↗</i></motion.article>)}</div>
      </section>

      <section id="projects" className="section wrap projects">
        <div className="sectionHead"><div><div className="sectionNo">03 / PROJECTS</div><h2>SELECTED<br /><span>WORK.</span></h2></div><span className="sideNote">REAL PROJECTS / REAL PRODUCTS</span></div>
        <div className="projectList">
          {projects.map((p) => <motion.a key={p.n} href={p.url} target="_blank" rel="noreferrer" className="project" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            <div className="projectTop"><span>{p.n}</span><span>{p.type} / {p.year}</span></div>
            <div className="projectImage"><img src={p.image} alt={`${p.title} project`} /><div className="projectOverlay"><span>OPEN LIVE PROJECT</span><b>↗</b></div></div>
            <div className="projectInfo"><h3>{p.title}</h3><p>{p.text}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></div>
          </motion.a>)}
        </div>
      </section>

      <section id="price" className="section wrap pricing">
        <div className="sectionNo">04 / PRICE</div>
        <div className="priceGrid">
          <div><h2>START SMALL.<br /><span>THINK BIG.</span></h2><p className="lead">Transparent starting prices for businesses that need a serious digital presence or a fast MVP.</p><p className="muted">Every project is scoped individually after a short conversation.</p></div>
          <div className="priceCard"><span>STARTING FROM</span><strong>€450</strong><p>Landing pages, portfolio websites and focused MVP interfaces.</p><ul><li>Responsive development</li><li>Animations & interactions</li><li>Technical SEO setup</li><li>Vercel deployment</li><li>Post-launch changes</li></ul><a className="primary" href="#contact">GET A QUOTE <b>↗</b></a></div>
        </div>
      </section>

      <section id="contact" className="section wrap contact">
        <div><div className="sectionNo">05 / CONTACT</div><h2>HAVE AN IDEA?<br /><span>LET&apos;S BUILD IT.</span></h2><p className="lead">Tell me what you want to create. I&apos;ll turn the rough idea into a clear digital direction.</p><div className="contactLine">AVAILABLE FOR SELECT PROJECTS <span>●</span></div></div>
        <form onSubmit={submit}>{sent ? <div className="success"><b>MESSAGE RECEIVED.</b><span>Thanks — I&apos;ll get back to you shortly.</span></div> : <><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required name="email" type="email" placeholder="you@company.com" /></label><label>Project type<select name="type" defaultValue=""><option value="" disabled>Select a project</option><option>Landing page</option><option>Portfolio website</option><option>Bubble MVP</option><option>Next.js website</option><option>Other</option></select></label><label>Message<textarea required name="message" placeholder="Tell me about the idea..." rows={5} /></label><button className="primary" type="submit">SEND MESSAGE <b>↗</b></button></>}</form>
      </section>

      <footer className="footer wrap"><div className="logo">KRYLON<span>TECH</span></div><div>BUILDING DIGITAL FUTURES.</div><div>© 2026</div></footer>
    </main>
  )
}
