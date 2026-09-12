'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id:'01', title:'E-Pharmacy', type:'WEB APP', year:'2026', stack:['Bubble.io','API','Workflows'],
    description:'Online pharmacy platform with medicine-store discovery, pharmacy listings, medicine browsing, registration/login and customer reviews.',
    link:'https://epharmacyvpietukhov-31602.bubbleapps.io/version-test'
  },
  {
    id:'02', title:'Growly', type:'EDTECH', year:'2026', stack:['Bubble.io','UI/UX','Database'],
    description:'Online learning platform with course catalog, search and categories, course pricing, FAQ, registration and a personal-development focused landing flow.',
    link:'https://growly-67500.bubbleapps.io/version-test'
  },
]

const capabilities = [
  ['01','Landing Pages','Conversion-focused pages with responsive UI, clear hierarchy and strong CTA flows.'],
  ['02','MVP Development','From product idea and database structure to workflows, launch and iteration.'],
  ['03','Web Applications','Custom Bubble platforms with authentication, roles, dashboards and business logic.'],
  ['04','SaaS Products','Scalable product architecture, subscriptions, user flows and operational dashboards.'],
  ['05','API & Webhooks','Connect external services and move data between systems reliably.'],
  ['06','Automation & AI','n8n workflows and practical AI features that reduce repetitive work.'],
]

const stack = [
  ['Bubble.io','No-code development / MVP / SaaS'],['Figma','UI design / prototypes'],['FigJam','Flows / product mapping'],['UXpilot','AI-assisted UX / wireframes'],['n8n','Automation / workflows'],['API','Third-party integrations'],['Webhooks','Event-driven workflows'],['AI Integrations','Practical AI features']
]

const workflow = [
  ['01','DISCOVER','Clarify the problem, users, scope and success criteria.'],
  ['02','DESIGN','Map the user flow and build the interface system.'],
  ['03','BUILD','Create database structure, workflows and responsive UI.'],
  ['04','CONNECT','Add APIs, webhooks, automation and AI where useful.'],
  ['05','LAUNCH','Test, optimize, deploy and prepare the handover.'],
]

const pricing = [
  ['STARTER','€250+','Landing pages / small UI builds','Best for focused websites and validation.'],
  ['MVP','€600+','MVP / web application','For a real product with database, workflows and user flows.'],
  ['SAAS / CUSTOM','€1,200+','Complex product builds','For SaaS, custom systems and deeper integrations.'],
  ['HOURLY','€25','Development / fixes / iterations','Flexible support when scope changes during a project.'],
]

function HudIcon({kind}:{kind:'about'|'projects'|'certificate'|'mail'|'bolt'|'flow'}){
  return <span className={`hudIcon hud-${kind}`} aria-hidden="true"><span /></span>
}

export default function Home(){
  const [activeStep,setActiveStep]=useState('01')
  const [activeCapability,setActiveCapability]=useState(0)
  const [selectedProject,setSelectedProject]=useState<typeof projects[number]|null>(null)
  const [menu,setMenu]=useState(false)

  useEffect(()=>{
    const onKeyDown=(e:KeyboardEvent)=>{ if(e.key==='Escape') setSelectedProject(null) }
    window.addEventListener('keydown',onKeyDown)
    return ()=>window.removeEventListener('keydown',onKeyDown)
  },[])

  useEffect(()=>{
    const els=Array.from(document.querySelectorAll<HTMLElement>('[data-step]'))
    const io=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
      if(visible) setActiveStep(visible.target.getAttribute('data-step') || '01')
    },{threshold:[.35,.6,.85]})
    els.forEach(e=>io.observe(e)); return ()=>io.disconnect()
  },[])

  return <main>
    <div className="scanline" />
    <header className="navWrap">
      <a className="brand" href="#home"><span>KRYLON</span><b>TECH</b></a>
      <button className="menuBtn" onClick={()=>setMenu(v=>!v)} aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu}>☰</button>
      <nav className={menu?'nav open':'nav'}>
        {['about','capabilities','tech-stack','projects','price','contact'].map(x=><a key={x} href={'#'+x} onClick={()=>setMenu(false)}>{x.replace('-',' ')}</a>)}
      </nav>
      <a className="navCta" href="#contact">LET&apos;S BUILD <span>↗</span></a>
    </header>

    <section id="home" className="hero sectionFrame">
      <div className="hudCorner tl"/><div className="hudCorner tr"/><div className="hudCorner bl"/><div className="hudCorner br"/>
      <div className="heroGrid">
        <motion.div className="heroCopy" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}}>
          <div className="eyebrow"><i/> KRYLONTECH // DIGITAL PRODUCT SYSTEM</div>
          <h1>Ideas into <em>real products.</em></h1>
          <p>KRYLONTECH turns ideas into scalable digital products — from landing pages and MVPs to SaaS platforms and web apps.</p>
          <div className="heroActions"><a className="primaryBtn" href="#projects">VIEW PROJECTS <span>↗</span></a><a className="ghostBtn" href="#contact">START A PROJECT</a></div>
          <div className="microStats"><span><b>NO-CODE</b> DEVELOPMENT</span><span><b>AI</b> INTEGRATIONS</span><span><b>API</b> AUTOMATION</span></div>
        </motion.div>
        <motion.div className="systemPanel" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{delay:.15,duration:.7}}>
          <div className="panelTop"><span>SYSTEM / 01</span><span className="live"><i/> AVAILABLE FOR PROJECTS</span></div>
          <div className="orb"><div className="orbCore"/><div className="orbRing r1"/><div className="orbRing r2"/><div className="orbRing r3"/><span className="cross c1"/><span className="cross c2"/></div>
          <div className="panelReadout"><span>BUILD MODE</span><strong>ACTIVE</strong><span>STACK</span><strong>BUBBLE / AI / API</strong></div>
          <div className="codeLine">KRYL-X01 // PRODUCT_READY // 2026</div>
        </motion.div>
      </div>
      <div className="scrollHint">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section className="quickNav container">
      {[
        ['01','about','ABOUT','Who I am, what I build and how I work.','about'],
        ['02','projects','PROJECTS','Real-world builds and product experiments.','projects'],
        ['03','certificates','CERTIFICATES','Verified learning and AI No-Code training.','certificate'],
      ].map(([n,id,title,desc,kind])=><a href={'#'+id} className="quickCard" key={id}><img className="quickCardImage" src={id==='about'?'/images/cards/about.png':id==='projects'?'/images/cards/projects.png':'/images/cards/contact.png'} alt=""/><div className="quickCardOverlay"/><span className="index">{n}</span><HudIcon kind={kind as any}/><h3>{title}</h3><p>{desc}</p><span className="cardArrow">OPEN ↗</span></a>)}
      </div>
    </section>

    <section id="about" className="section container twoCol">
      <div><div className="sectionTag">01 / ABOUT</div><h2>Product thinking.<br/><em>No-code execution.</em></h2><p className="lead">I build digital products with a product-first mindset: understand the problem, map the flow, design the interface, then connect the logic and integrations that make the product useful.</p><p>My focus is Bubble.io, AI-assisted UX, APIs, webhooks and automation — the practical layer between an idea and a working product.</p><a className="textLink" href="#contact">WORK WITH ME <span>→</span></a></div>
      <div className="aboutPanel"><div className="profilePhotoWrap"><img className="profilePhoto" src="/images/profile/vitalii.jpg" alt="KRYLONTECH developer portrait"/></div><div className="terminal"><div><span>ROLE</span><b>AI NO-CODE DEVELOPER</b></div><div><span>CORE</span><b>BUBBLE.IO ARCHITECT</b></div><div><span>MODE</span><b>MVP → SAAS</b></div><div><span>STATUS</span><b className="green">ONLINE</b></div></div></div>
    </section>

    <section id="capabilities" className="section container">
      <div className="sectionHead"><div><div className="sectionTag">02 / CAPABILITIES</div><h2>What I can <em>build.</em></h2></div><p>Each capability is a building block. Combine them into a complete product workflow.</p></div>
      <div className="capGrid"><div className="capList">{capabilities.map((c,i)=><button key={c[0]} className={i===activeCapability?'capItem active':'capItem'} onMouseEnter={()=>setActiveCapability(i)} onFocus={()=>setActiveCapability(i)}><span>{c[0]}</span><strong>{c[1]}</strong><b>↗</b></button>)}</div><div className="capDisplay"><div className="displayCode">MODULE // {capabilities[activeCapability][0]}</div><h3>{capabilities[activeCapability][1]}</h3><p>{capabilities[activeCapability][2]}</p><div className="displayLines"><i/><i/><i/><i/></div><div className="displayFooter">KRYLON-X / READY TO DEPLOY</div></div></div>
    </section>

    <section id="tech-stack" className="section container">
      <div className="sectionHead"><div><div className="sectionTag">03 / TECH STACK</div><h2>The tools behind the <em>build.</em></h2></div><p>Focused on the stack I actually use for no-code product development.</p></div>
      <div className="stackGrid">{stack.map(([name,desc],i)=><motion.div className="stackCard" key={name} whileHover={{y:-5}}><span>0{i+1}</span><div><strong>{name}</strong><p>{desc}</p></div><b>+</b></motion.div>)}</div>
    </section>

    <section className="section workflowSection">
      <div className="container"><div className="sectionTag">04 / WORKFLOW</div><div className="workflowLayout"><div><h2>From <em>idea</em> to launch.</h2><p className="lead">A transparent process that keeps the product, design and technical logic moving together.</p><div className="workflowRail">{workflow.map(([num,title,desc])=><div data-step={num} className={activeStep===num?'workflowStep active':'workflowStep'} key={num}><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></div><div className="workflowMonitor"><div className="monitorHeader"><span>PIPELINE</span><b>{activeStep} / 05</b></div><div className="pipeline">{workflow.map(([num,title])=><div key={num} className={activeStep===num?'pipe active':'pipe'}><span>{num}</span><i/><b>{title}</b></div>)}</div><div className="monitorFooter">STATUS: <strong>PRODUCT FLOW OPTIMIZED</strong></div></div></div></div>
    </section>

    <section id="projects" className="section container">
      <div className="sectionHead"><div><div className="sectionTag">05 / PROJECTS</div><h2>Selected <em>builds.</em></h2></div><a className="textLink" href="#contact">DISCUSS A PROJECT →</a></div>
      <div className="projectGrid">{projects.map(p=><button className="projectCard" key={p.id} onClick={()=>setSelectedProject(p)}><div className="projectVisual"><div className="projectHud"><span>{p.id}</span><span>LIVE SYSTEM</span></div><img className="projectImage" src={p.id==='01'?'/images/projects/e-pharmacy.png':'/images/projects/growly.png'} alt={p.title+' project screenshot'}/></div><div className="projectMeta"><div><span>{p.type} / {p.year}</span><h3>{p.title}</h3></div><b>↗</b></div><p>{p.description}</p><div className="tags">{p.stack.map(s=><span key={s}>{s}</span>)}</div></button>)}</div>
    </section>

    <section id="certificates" className="section container certificateSection">
      <div className="certificateCard"><div><div className="sectionTag">06 / CERTIFICATES</div><h2>Learning that <em>ships.</em></h2><p className="lead">AI No-Code training covering Bubble fundamentals, databases, APIs, security, AI integrations, deployment and n8n automation.</p><div className="certMeta"><span>GOIT</span><span>AI NO-CODE</span><span>08 / 09 / 2026</span></div><a className="primaryBtn" href="/certificates/Vitalii-Pietukhov.pdf" target="_blank">VIEW CERTIFICATE ↗</a></div><div className="certificateVisual"><HudIcon kind="certificate"/><div className="seal">AI<br/>NO-CODE</div><span className="certCode">CERT / 47952</span></div></div>
    </section>

    <section id="price" className="section container">
      <div className="sectionHead"><div><div className="sectionTag">07 / PRICE</div><h2>Clear starting <em>points.</em></h2></div><p>Final scope and estimate are confirmed after a short discovery.</p></div>
      <div className="priceGrid">{pricing.map((p,i)=><div className={i===1?'priceCard featured':'priceCard'} key={p[0]}>{i===1&&<span className="popular">MOST REQUESTED</span>}<span>{p[0]}</span><strong>{p[1]}</strong><h3>{p[2]}</h3><p>{p[3]}</p><a href="#contact">START →</a></div>)}</div>
    </section>

    <section id="contact" className="section contactSection"><div className="container contactBox"><div className="contactIcon"><HudIcon kind="mail"/></div><div><div className="sectionTag">08 / CONTACT</div><h2>Let&apos;s build something <em>real.</em></h2><p>Tell me what you want to launch and I&apos;ll help turn it into a clear product plan.</p></div><div className="contactLinks"><a href="mailto:vitaliipietukhov@gmail.com">EMAIL <span>↗</span></a><a href="tel:+48666675728">PHONE <span>↗</span></a><a href="https://wa.me/48666675728" target="_blank" rel="noreferrer">WHATSAPP <span>↗</span></a><a href="https://www.linkedin.com/in/vitalii-pietukhov" target="_blank" rel="noreferrer">LINKEDIN <span>↗</span></a><a href="https://t.me/vitalii_bioome" target="_blank" rel="noreferrer">TELEGRAM <span>↗</span></a><a href="https://krylontech-portfolio.vercel.app" target="_blank" rel="noreferrer">PORTFOLIO <span>↗</span></a></div></div></section>

    <footer className="footer container"><span>KRYLONTECH</span><span>IDEAS / PRODUCTS / REAL IMPACT</span><span>© 2026</span></footer>

    <AnimatePresence>{selectedProject&&<motion.div className="modalBackdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelectedProject(null)}><motion.div className="projectModal" initial={{y:25,scale:.98}} animate={{y:0,scale:1}} exit={{y:25,scale:.98}} onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelectedProject(null)}>×</button><div className="sectionTag">PROJECT / {selectedProject.id}</div><img className="modalProjectImage" src={selectedProject.id==='01'?'/images/projects/e-pharmacy.png':'/images/projects/growly.png'} alt={selectedProject.title+' project screenshot'}/><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modalTags">{selectedProject.stack.map(s=><span key={s}>{s}</span>)}</div><a className="primaryBtn" href={selectedProject.link} target="_blank" rel="noreferrer">OPEN LIVE PROJECT ↗</a></motion.div></motion.div>}</AnimatePresence>
  </main>
}
