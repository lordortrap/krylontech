'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ContactForm from './ContactForm'
import ShaderBackground from './ShaderBackground'
import CursorGlow from './CursorGlow'
import RevealController from './RevealController'
import { projects, capabilities, stack, workflow, pricing, contact, testimonials, certificate, faq, type Project } from './data'

const navItems = ['about', 'capabilities', 'tech-stack', 'projects', 'certificates', 'reviews', 'price', 'faq', 'contact']

const quickCards = [
  { n: '01', id: 'about', title: 'ABOUT', desc: 'Who I am, what I build and how I work.', img: '/images/cards/about.png' },
  { n: '02', id: 'projects', title: 'PROJECTS', desc: 'Four Bubble demo products with live links.', img: '/images/cards/projects.png' },
  { n: '03', id: 'contact', title: 'CONTACT', desc: 'Tell me about your idea and get a clear plan.', img: '/images/cards/contact.png' },
]

function HudIcon({ kind }: { kind: 'about' | 'projects' | 'certificate' | 'mail' }) {
  return <span className={`hudIcon hud-${kind}`} aria-hidden="true"><span /></span>
}

function ProjectCover({ p, priority }: { p: Project; priority?: boolean }) {
  return <Image className="projectImage" src={p.gallery[0].src} alt={`${p.title} project screenshot`} width={800} height={570} sizes="(max-width:900px) 90vw, 480px" priority={priority} />
}

export default function Home() {
  const [activeStep, setActiveStep] = useState('01')
  const [activeCapability, setActiveCapability] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [shot, setShot] = useState(0)
  const [menu, setMenu] = useState(false)
  const [plan, setPlan] = useState('')
  const [message, setMessage] = useState('')
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelectedProject(null); setMenu(false) }
      if (!selectedProject) return
      const n = selectedProject.gallery.length
      if (e.key === 'ArrowRight') setShot(s => (s + 1) % n)
      if (e.key === 'ArrowLeft') setShot(s => (s - 1 + n) % n)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedProject])

  const openProject = (p: Project) => { setShot(0); setSelectedProject(p) }

  useEffect(() => {
    if (!selectedProject) return
    lastFocus.current = document.activeElement as HTMLElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      lastFocus.current?.focus()
    }
  }, [selectedProject])

  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const f = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button'))
    if (!f.length) return
    const first = f[0], last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }

  const choosePlan = (name: string, text: string) => {
    setPlan(name)
    setMessage(text)
    setTimeout(() => document.getElementById('message')?.focus({ preventScroll: true }), 600)
  }

  return (
    <main>
      <ShaderBackground />
      <CursorGlow />
      <RevealController />
      <div className="scanline" />
      <header className="navWrap">
        <a className="brand" href="#home"><span>VITALII</span><b> PIETUKHOV</b></a>
        <button className="menuBtn" onClick={() => setMenu(v => !v)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mainNav">{menu ? '✕' : '☰'}</button>
        <nav id="mainNav" className={menu ? 'nav open' : 'nav'} aria-label="Main">
          {navItems.map(x => <a key={x} href={'#' + x} onClick={() => setMenu(false)}>{x.replace('-', ' ')}</a>)}
        </nav>
        <a className="navCta" href="#contact">LET&apos;S BUILD <span>↗</span></a>
      </header>

      <section id="home" className="hero sectionFrame">
        <div className="hudCorner tl" /><div className="hudCorner tr" /><div className="hudCorner bl" /><div className="hudCorner br" />
        <div className="heroGrid">
          <motion.div className="heroCopy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="eyebrow"><i /> VITALII PIETUKHOV // AI NO-CODE DEVELOPER</div>
            <h1>Ideas into <em>real products.</em></h1>
            <p>I build Bubble.io client portals, operations tools, booking and CRM systems, learning platforms and marketplaces — with clean data models, role-based security and reliable workflows.</p>
            <div className="heroActions"><a className="primaryBtn" href="#projects">VIEW PROJECTS <span>↗</span></a><a className="ghostBtn" href="#contact">START A PROJECT</a></div>
            <div className="microStats"><span><b>NO-CODE</b> DEVELOPMENT</span><span><b>AI</b> INTEGRATIONS</span><span><b>API</b> AUTOMATION</span></div>
          </motion.div>
          <motion.div className="systemPanel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.7 }}>
            <div className="panelTop"><span>SYSTEM / 01</span><span className="live"><i /> AVAILABLE FOR PROJECTS</span></div>
            <div className="orb"><div className="orbCore" /><div className="orbRing r1" /><div className="orbRing r2" /><div className="orbRing r3" /><span className="cross c1" /><span className="cross c2" /></div>
            <div className="panelReadout"><span>BUILD MODE</span><strong>ACTIVE</strong><span>STACK</span><strong>BUBBLE / AI / API</strong></div>
            <div className="codeLine">VP-X01 // PRODUCT_READY // 2026</div>
          </motion.div>
        </div>
        <a className="scrollHint" href="#about">SCROLL TO EXPLORE <span>↓</span></a>
      </section>

      <section className="quickNav container" aria-label="Quick links">
        <div className="quickNavInner">
          {quickCards.map(c => (
            <a href={'#' + c.id} className="quickCard" key={c.id}>
              <Image className="quickCardImage" src={c.img} alt="" fill sizes="(max-width:900px) 100vw, 380px" />
              <div className="quickCardOverlay" />
              <span className="index">{c.n}</span>
              <HudIcon kind={c.id === 'about' ? 'about' : c.id === 'projects' ? 'projects' : 'mail'} />
              <h3>{c.title}</h3><p>{c.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="section container twoCol">
        <div>
          <div className="sectionTag">01 / ABOUT</div>
          <h2>Product thinking.<br /><em>No-code execution.</em></h2>
          <p className="lead">I&apos;m a No-Code Bubble.io developer. I build apps end-to-end: data model, workflows, privacy rules, integrations and a responsive UI — with fixed scope, clear stages and a clickable demo after every milestone.</p>
          <p>My projects are demo apps built on Bubble (test environment, Stripe in test mode). They show the full development lifecycle — from analysis and planning to logic, integrations, security and optimization.</p>
          <a className="textLink" href="#contact">WORK WITH ME <span>→</span></a>
        </div>
        <div className="aboutPanel">
          <div className="profilePhotoWrap">
            <Image className="profilePhoto" src="/images/profile/vitalii.jpg" alt="Vitalii Pietukhov — AI No-Code Developer" fill sizes="(max-width:900px) 90vw, 520px" />
          </div>
          <div className="terminal">
            <div><span>ROLE</span><b>AI NO-CODE DEVELOPER</b></div>
            <div><span>CORE</span><b>BUBBLE.IO ARCHITECT</b></div>
            <div><span>MODE</span><b>MVP → SAAS</b></div>
            <div><span>STATUS</span><b className="green">ONLINE</b></div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="section container">
        <div className="sectionHead"><div><div className="sectionTag">02 / CAPABILITIES</div><h2>What I can <em>build.</em></h2></div><p>Each capability is a building block. Combine them into a complete product workflow.</p></div>
        <div className="capGrid">
          <div className="capList" role="tablist" aria-label="Capabilities">
            {capabilities.map((c, i) => (
              <button key={c[0]} role="tab" aria-selected={i === activeCapability} className={i === activeCapability ? 'capItem active' : 'capItem'}
                onMouseEnter={() => setActiveCapability(i)} onFocus={() => setActiveCapability(i)} onClick={() => setActiveCapability(i)}>
                <span>{c[0]}</span><strong>{c[1]}</strong><b>↗</b>
              </button>
            ))}
          </div>
          <div className="capDisplay" role="tabpanel" aria-live="polite">
            <div className="displayCode">MODULE // {capabilities[activeCapability][0]}</div>
            <h3>{capabilities[activeCapability][1]}</h3>
            <p>{capabilities[activeCapability][2]}</p>
            <div className="displayLines"><i /><i /><i /><i /></div>
            <a className="textLink" href="#contact" onClick={() => choosePlan(capabilities[activeCapability][1], `Hi Vitalii! I'm interested in ${capabilities[activeCapability][1]}. My project: `)}>DISCUSS THIS <span>→</span></a>
          </div>
        </div>
      </section>

      <section id="tech-stack" className="section container">
        <div className="sectionHead"><div><div className="sectionTag">03 / TECH STACK</div><h2>The tools behind the <em>build.</em></h2></div><p>Focused on the stack I actually use for no-code product development.</p></div>
        <div className="stackGrid">
          {stack.map(([name, desc], i) => (
            <motion.div className="stackCard" key={name} whileHover={{ y: -5 }}>
              <span>0{i + 1}</span><div><strong>{name}</strong><p>{desc}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section workflowSection">
        <div className="container">
          <div className="sectionTag">04 / WORKFLOW</div>
          <div className="workflowLayout">
            <div>
              <h2>From <em>idea</em> to launch.</h2>
              <p className="lead">A transparent process that keeps the product, design and technical logic moving together.</p>
              <div className="workflowRail">
                <i className="railFill" style={{ height: `${(Number(activeStep) / workflow.length) * 100}%` }} />
                {workflow.map(([num, title, desc]) => (
                  <div tabIndex={0} onMouseEnter={() => setActiveStep(num)} onFocus={() => setActiveStep(num)} onClick={() => setActiveStep(num)} className={activeStep === num ? 'workflowStep active' : 'workflowStep'} key={num}>
                    <span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="workflowMonitor">
              <div className="monitorHeader"><span>PIPELINE</span><b>{activeStep} / 05</b></div>
              <div className="pipeline">
                {workflow.map(([num, title]) => (
                  <div key={num} onMouseEnter={() => setActiveStep(num)} onClick={() => setActiveStep(num)} className={Number(num) < Number(activeStep) ? 'pipe done' : activeStep === num ? 'pipe active' : 'pipe'}><span>{num}</span><i /><b>{title}</b></div>
                ))}
              </div>
              <div className="monitorFooter">STATUS: <strong>PRODUCT FLOW OPTIMIZED</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section container">
        <div className="sectionHead"><div><div className="sectionTag">05 / PROJECTS</div><h2>Selected <em>builds.</em></h2></div><a className="textLink" href="#contact">DISCUSS A PROJECT →</a></div>
        <div className="projectGrid">
          {projects.map((p, i) => (
            <button className="projectCard" key={p.id} onClick={() => openProject(p)} aria-haspopup="dialog" aria-label={`Open ${p.title} case study`}>
              <div className="projectVisual">
                <div className="projectHud"><span>{p.id}</span><span>{p.status}</span></div>
                <ProjectCover p={p} priority={i < 2} />
                {p.gallery.length > 1 && <span className="shotCount">{p.gallery.length} SCREENS</span>}
              </div>
              <div className="projectMeta"><div><span>{p.type} / {p.year}</span><h3>{p.title}</h3></div><b>↗</b></div>
              <p>{p.description}</p>
              <div className="facts">{p.facts.map(f => <span key={f}>{f}</span>)}</div>
              <div className="tags">{p.stack.slice(0, 4).map(s => <span key={s}>{s}</span>)}</div>
            </button>
          ))}
        </div>
        <p className="demoNote">All projects are demo apps running in a Bubble test environment (Stripe in test mode). The first load of a test app may take a few seconds.</p>
      </section>

      <section id="certificates" className="section container certificateSection">
        <div className="certificateCard">
          <div>
            <div className="sectionTag">06 / CERTIFICATES</div>
            <h2>Learning that <em>ships.</em></h2>
            <p className="lead">AI No-Code training covering Bubble fundamentals, databases, APIs, security, AI integrations, deployment and n8n automation.</p>
            <div className="certMeta"><span>{certificate.issuer.toUpperCase()}</span><span>{certificate.course.toUpperCase()}</span><span>{certificate.date}</span><span>ID {certificate.id}</span></div>
            <div className="certActions">
              <a className="primaryBtn" href={certificate.pdf} target="_blank" rel="noreferrer">OPEN FULL CERTIFICATE ↗</a>
              <a className="ghostBtn" href={certificate.site} target="_blank" rel="noreferrer">ISSUER: GOIT.GLOBAL ↗</a>
            </div>
            <p className="certNote">Issued by GoIT, signed by its CEO. To verify, quote Unique ID {certificate.id} to the issuer.</p>
          </div>
          <a className="certificateVisual" href={certificate.pdf} target="_blank" rel="noreferrer" aria-label="Open the GoIT AI No-Code certificate (PDF)">
            <Image className="certImage" src={certificate.image} alt="GoIT AI No-Code certificate issued to Vitalii Pietukhov" width={1287} height={910} sizes="(max-width:900px) 90vw, 520px" />
            <span className="certZoom">VIEW PDF ↗</span>
          </a>
        </div>
      </section>

      <section id="reviews" className="section container">
        <div className="sectionHead"><div><div className="sectionTag">07 / REVIEWS</div><h2>What clients <em>say.</em></h2></div><p>Feedback from people I have worked with.</p></div>
        {testimonials.length > 0 ? (
          <div className="reviewGrid">
            {testimonials.map(t => (
              <figure className="reviewCard" key={t.name}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption><b>{t.name}</b><span>{t.role}</span></figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="reviewEmpty">
            <div>
              <h3>Client reviews will appear here</h3>
              <p>The four projects above are full demos you can click through yourself, with live links and screenshots. Have a project in mind? Tell me about it and I will reply with a clear plan and quote.</p>
            </div>
            <a className="primaryBtn" href="#contact">TELL ME ABOUT YOUR PROJECT ↗</a>
          </div>
        )}
      </section>

      <section id="price" className="section container">
        <div className="sectionHead"><div><div className="sectionTag">08 / PRICE</div><h2>Clear starting <em>points.</em></h2></div><p>Timelines depend on scope. Final estimate is confirmed after a short discovery.</p></div>
        <div className="priceGrid">
          {pricing.map((p, i) => (
            <div className={i === 1 ? 'priceCard featured' : 'priceCard'} key={p[0]}>
              {i === 1 && <span className="popular">MOST REQUESTED</span>}
              <span>{p[0]}</span><strong>{p[1]}</strong><h3>{p[2]}</h3><p>{p[3]}</p><em className="timeline">{p[4]}</em>
              <a href="#contact" onClick={() => choosePlan(p[0], `Hi Vitalii! I'm interested in the ${p[0]} package (${p[2]}, from ${p[1]}, ${p[4]}). My project idea: `)}>START →</a>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="section container">
        <div className="sectionHead"><div><div className="sectionTag">09 / FAQ</div><h2>Before we <em>start.</em></h2></div><p>How I work, what it costs and what you get at the end.</p></div>
        <div className="faqList">
          {faq.map(([q, a]) => (
            <details className="faqItem" key={q}>
              <summary>{q}<span aria-hidden="true" /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        }) }} />
      </section>

      <section id="contact" className="section contactSection">
        <div className="container contactBox">
          <div className="contactIcon"><HudIcon kind="mail" /></div>
          <div>
            <div className="sectionTag">10 / CONTACT</div>
            <h2>Let&apos;s build something <em>real.</em></h2>
            <p>I&apos;m open to freelance projects, collaborations and long-term development work. Tell me what you want to launch and I&apos;ll reply with a clear plan and quote.</p>
            <ContactForm plan={plan} message={message} setMessage={setMessage} />
          </div>
          <div className="contactLinks">
            <a href={`mailto:${contact.email}`}>EMAIL <span>↗</span></a>
            <a href={`tel:${contact.phone}`}>PHONE <span>↗</span></a>
            <a href={contact.whatsapp} target="_blank" rel="noreferrer">WHATSAPP <span>↗</span></a>
            <a href={contact.telegram} target="_blank" rel="noreferrer">TELEGRAM <span>↗</span></a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer className="footer container"><span>VITALII PIETUKHOV</span><span>AI NO-CODE DEVELOPER / KRYLONTECH</span><span>© 2026</span></footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modalBackdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.div className="projectModal" role="dialog" aria-modal="true" aria-label={selectedProject.title} onKeyDown={trapFocus}
              initial={{ y: 25, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 25, scale: 0.98 }} onClick={e => e.stopPropagation()}>
              <button ref={closeRef} className="close" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button>
              <div className="sectionTag">CASE STUDY / {selectedProject.id} / {selectedProject.status}</div>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              {selectedProject.video && (
                <video className="modalVideo" src={selectedProject.video} controls preload="metadata" poster={selectedProject.gallery[0].src} />
              )}
              <figure className="gallery">
                <div className="galleryStage">
                  <Image key={selectedProject.gallery[shot].src} className="galleryImage" src={selectedProject.gallery[shot].src} alt={`${selectedProject.title}: ${selectedProject.gallery[shot].caption}`} width={800} height={570} sizes="(max-width:900px) 92vw, 760px" />
                  {selectedProject.gallery.length > 1 && (
                    <>
                      <button type="button" className="galleryNav prev" aria-label="Previous screenshot" onClick={() => setShot(s => (s - 1 + selectedProject.gallery.length) % selectedProject.gallery.length)}>‹</button>
                      <button type="button" className="galleryNav next" aria-label="Next screenshot" onClick={() => setShot(s => (s + 1) % selectedProject.gallery.length)}>›</button>
                    </>
                  )}
                </div>
                <figcaption><b>{shot + 1} / {selectedProject.gallery.length}</b> {selectedProject.gallery[shot].caption}</figcaption>
                {selectedProject.gallery.length > 1 && (
                  <div className="thumbs">
                    {selectedProject.gallery.map((g, i) => (
                      <button type="button" key={g.src} className={i === shot ? 'thumb active' : 'thumb'} onClick={() => setShot(i)} aria-label={`Show screenshot ${i + 1}`} aria-current={i === shot}>
                        <Image src={g.src} alt="" width={160} height={114} sizes="120px" loading="eager" />
                      </button>
                    ))}
                  </div>
                )}
              </figure>
              <div className="facts">{selectedProject.facts.map(f => <span key={f}>{f}</span>)}</div>
              <div className="caseGrid">
                <section><h3>CHALLENGE</h3><p>{selectedProject.challenge}</p></section>
                <section><h3>SOLUTION</h3><ul>{selectedProject.solution.map(x => <li key={x}>{x}</li>)}</ul></section>
                <section><h3>RESULT</h3><ul>{selectedProject.result.map(x => <li key={x}>{x}</li>)}</ul></section>
              </div>
              <div className="modalTags">{selectedProject.stack.map(s => <span key={s}>{s}</span>)}</div>
              <div className="modalActions">
                <a className="primaryBtn" href={selectedProject.link} target="_blank" rel="noreferrer">OPEN LIVE PROJECT ↗</a>
                <a className="ghostBtn" href="#contact" onClick={() => { setSelectedProject(null); choosePlan(`Like ${selectedProject.title}`, `Hi Vitalii! I liked ${selectedProject.title} and want something similar. My project idea: `) }}>BUILD SOMETHING SIMILAR</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
