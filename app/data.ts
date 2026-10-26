export type Shot = { src: string; caption: string }

export type Project = {
  id: string
  title: string
  type: string
  year: string
  status: string
  stack: string[]
  description: string
  challenge: string
  solution: string[]
  result: string[]
  facts: string[]
  gallery: Shot[]
  video?: string
  link: string
}

export const projects: Project[] = [
  {
    id: '01', title: 'ClientPortal', type: 'AGENCY PORTAL', year: '2026', status: 'IN PROGRESS',
    stack: ['Bubble.io', 'Privacy Rules', 'Backend workflows', 'API Connector'],
    description: 'Demo portal for creative agencies: share deliverables with clients, collect approvals and track milestones in one place. Every client sees only their own projects.',
    challenge: 'Versions, comments and approvals get lost in email threads. Agency staff and client members must each see only what they are granted, and clients should always know what is waiting for their decision.',
    solution: [
      'Data model of 12 types: Agency, ClientCompany, Project, Deliverable, DeliverableVersion, Approval, Milestone, Comment, Invitation, Notification and memberships',
      'Role-based access with grants maintained by backend workflows (apply agency access, revoke project access, refresh access)',
      'Approval center with versions, feedback history and Approve / Request changes decisions',
      'Invitations, join-by-code, switching between agency workspaces, comments with visibility levels and in-app notifications',
      'Milestone reminder emails, sample-data seeding for demos and a QA page that checks who can see what',
    ],
    result: [
      'Multi-role collaboration app running in a Bubble test environment with sample data',
      'New agencies, clients and projects can be added without changing the architecture',
    ],
    facts: ['12 data types', 'Role-based access', 'Approvals + milestones'],
    gallery: [
      { src: '/images/projects/clientportal-01-dashboard-desktop.jpg', caption: 'Agency dashboard: active projects, pending approvals, change requests, activity feed and upcoming deadlines.' },
      { src: '/images/projects/clientportal-02-projects-desktop.jpg', caption: 'Projects: cards with status chips, milestone progress, deadlines and filters by status and client.' },
      { src: '/images/projects/clientportal-03-approval-center-desktop.jpg', caption: 'Approval center: client-facing review queue with version tags, feedback history and Approve / Request changes.' },
      { src: '/images/projects/clientportal-04-clients-desktop.jpg', caption: 'Clients: directory with portal invite codes and one-click portal invitations.' },
    ],
    link: 'https://clientportal-54921.bubbleapps.io/version-test',
  },
  {
    id: '02', title: 'SoloFlow', type: 'OPERATIONS PLATFORM', year: '2026', status: 'IN PROGRESS',
    stack: ['Bubble.io', 'Privacy Rules', 'Backend workflows', 'Drag & drop'],
    description: 'Demo operations platform for small service businesses: pipeline, jobs, clients, bookings, finances and team, plus a secure portal where the client follows their own work.',
    challenge: 'A small service company runs on spreadsheets and chats. The owner needs the whole business in one place, and clients want to follow status and files themselves instead of asking by phone or email.',
    solution: [
      '14 app pages: dashboard, drag-and-drop pipeline, jobs, clients, calendar and bookings, services, finances, team, time tracker, settings, onboarding and client portal',
      'Data model with 20+ types: Company, Customer, Job, Order, Booking, Service, Invoice, Time Entry, Membership, Invitation, Attachment, Audit and more',
      'About 50 backend workflows: audit trail for key records, booking conflict checks, scheduled appointment reminders, automatic job totals',
      'Email outbox with delivery tracking, team invitations and client-portal links with expiry, private file links and record-level access',
      'Multi-currency support with exchange rates',
    ],
    result: [
      'Multi-role operations app (roles, scheduling, finance, client portal, automation) running in a Bubble test environment',
      'New services, customers and team members can be added without changing the architecture',
    ],
    facts: ['14 pages', '20+ data types', '~50 backend workflows'],
    gallery: [
      { src: '/images/projects/soloflow-00-landing-desktop.jpg', caption: 'Landing page: product pitch with capabilities, language switcher and sign-in / sign-up entry points.' },
      { src: '/images/projects/soloflow-01-overview-desktop.jpg', caption: 'Overview: live dashboard of active tasks, orders, overdue and unassigned work, checklist and deadlines.' },
      { src: '/images/projects/soloflow-02-orders-kanban-desktop.jpg', caption: 'Orders: Kanban, Table and Calendar views with stages, client filter and order totals.' },
      { src: '/images/projects/soloflow-03-tasks-desktop.jpg', caption: 'Tasks: team board with status counters, quick filters (my tasks, overdue, unassigned), search and priorities.' },
    ],
    link: 'https://lordortrap12.bubbleapps.io/version-test',
  },
  {
    id: '03', title: 'E-Pharmacy', type: 'MARKETPLACE', year: '2026', status: 'DONE',
    stack: ['Bubble.io', 'Stripe (test mode)', 'Stripe webhook', 'Groq AI', 'Figma', 'EN / UA'],
    description: 'Demo online-pharmacy marketplace: pharmacies have their own pages and product lists; customers search medicines, add them to a cart and pay through Stripe test mode.',
    challenge: 'Customers want to find and compare medicines from several pharmacies in one place, and pharmacies need an online storefront without building their own site.',
    solution: [
      'Data model: Shop, Product, ShopsProduct (per-pharmacy product and price), Review, Cart and Order, User',
      'Catalog with search and category filters; pharmacy pages with open/closed status, ratings, reviews and likes',
      'Role-based access (Privacy Rules): Customer / Pharmacy Owner / Admin',
      'Cart and Stripe checkout in test mode with a webhook as backup confirmation',
      'AI assistant through the Groq API (API Connector); pages built from a Figma design; EN/UA language switcher',
    ],
    result: [
      'Multi-role marketplace with catalog, cart, payments, reviews, owner and admin views',
      'More pharmacies and products can be added without changing the architecture',
    ],
    facts: ['3 roles', 'Stripe + webhook', 'AI assistant'],
    gallery: [
      { src: '/images/projects/e-pharmacy.png', caption: 'Home page with the pharmacy directory: stores with address, phone, rating and live open/closed status.' },
    ],
    link: 'https://epharmacyvpietukhov-31602.bubbleapps.io/version-test',
  },
  {
    id: '04', title: 'Growly', type: 'EDTECH', year: '2026', status: 'DONE',
    stack: ['Bubble.io', 'Stripe (test mode)', 'PDF Conjurer', 'Vimeo player', 'Figma', 'EN / UA'],
    description: 'Demo online-learning platform for soft skills: users buy courses, study modules and video lessons, pass a final test and receive a certificate with a PDF and a public link.',
    challenge: 'Adults learning soft skills need structured video courses with notes, progress tracking and proof of completion, while administrators need to manage content and users.',
    solution: [
      'Course catalog with live search and category filters, cart and Stripe checkout in test mode',
      'Learning space with modules, video lessons, progress tracking and a server-graded final test',
      'Certificate PDF generated in the browser (PDF Conjurer) plus a public certificate page the owner can switch off',
      'Admin panel: courses, users with moderation and notes, analytics',
      'Privacy Rules for guest / student / admin: notes and videos only for buyers, test answers admin-only',
    ],
    result: [
      'Full learning flow: catalog, purchase, lessons, test, certificate',
      'New courses can be added without changing the architecture (content kept in EN and UA fields)',
    ],
    facts: ['3 roles', 'Server-graded test', 'PDF certificate'],
    gallery: [
      { src: '/images/projects/growly.png', caption: 'Landing page: value proposition, hero section and entry points for log in, sign up and the course catalog.' },
    ],
    link: 'https://growly-67500.bubbleapps.io/version-test',
  },
]

export type Testimonial = { quote: string; name: string; role: string }

// Add real client or mentor reviews here; the Reviews section shows them automatically.
export const testimonials: Testimonial[] = []

export const certificate = {
  issuer: 'GoIT',
  course: 'AI No-Code',
  date: '08 / 09 / 2026',
  id: '47952',
  site: 'https://goit.global',
  pdf: '/certificates/Vitalii-Pietukhov.pdf',
  image: '/images/certificate.jpg',
}

export const capabilities = [
  ['01', 'Landing Pages', 'Conversion-focused pages with responsive UI, clear hierarchy and strong CTA flows.'],
  ['02', 'MVP Development', 'From product idea and database structure to workflows, launch and iteration.'],
  ['03', 'Web Applications', 'Custom Bubble platforms with authentication, roles, dashboards and business logic.'],
  ['04', 'Client & Ops Portals', 'Separate dashboards for admins and clients with role-based access and privacy rules.'],
  ['05', 'API & Webhooks', 'Stripe, REST APIs through API Connector, webhooks, PDF generation and email.'],
  ['06', 'Automation & AI', 'n8n workflows and practical AI features that reduce repetitive work.'],
]

export const stack = [
  ['Bubble.io', 'No-code development / MVP / SaaS'],
  ['Figma', 'UI design / prototypes'],
  ['FigJam', 'Flows / product mapping'],
  ['UXpilot', 'AI-assisted UX / wireframes'],
  ['n8n', 'Automation / workflows'],
  ['Stripe', 'Payments / test and live mode'],
  ['API Connector', 'REST integrations / webhooks'],
  ['PDF Conjurer', 'PDF generation'],
]

export const workflow = [
  ['01', 'DISCOVER', 'Clarify the problem, users, scope and success criteria.'],
  ['02', 'DESIGN', 'Map the user flow and build the interface system.'],
  ['03', 'BUILD', 'Create database structure, workflows and responsive UI.'],
  ['04', 'CONNECT', 'Add APIs, webhooks, automation and AI where useful.'],
  ['05', 'LAUNCH', 'Test, optimize, deploy and prepare the handover.'],
]

export const pricing = [
  ['STARTER', '€250+', 'Landing pages / small UI builds', 'Best for focused websites and validation.', '1–2 weeks'],
  ['MVP', '€600+', 'MVP launch', 'Landing page, authentication, roles, core data model and 3–5 key workflows.', '3–5 weeks'],
  ['PORTAL / SAAS', '€1,200+', 'Client or operations portal', 'Admin and client dashboards with role-based access, privacy rules and integrations.', '4–6 weeks'],
  ['HOURLY', '€25', 'Development / fixes / iterations', 'Flexible support when scope changes during a project.', 'Flexible'],
] as const

export const contact = {
  email: 'vitaliipietukhov@gmail.com',
  phone: '+48666675728',
  whatsapp: 'https://wa.me/48666675728',
  linkedin: 'https://www.linkedin.com/in/vitalii-pietukhov/',
  telegram: 'https://t.me/vitalii_bioome',
}

export const faq = [
  ['How does a project work?', 'Every project follows five stages: discover, design, build, connect and launch. Scope is fixed up front, work goes in clear stages, and you get a clickable demo after every milestone, so you always see real progress.'],
  ['How long does it take?', 'An MVP launch takes about 3–5 weeks, a client or operations portal 4–6 weeks, and integrations and automation 1–2 weeks. Exact timelines depend on scope and are confirmed after a short discovery.'],
  ['How much does it cost?', 'Prices start at €250 for landing pages, €600 for an MVP and €1,200 for portals and SaaS products. I confirm a fixed estimate after discovery. For fixes and iterations the hourly rate is €25.'],
  ['How does payment work?', 'Payment goes by milestone: you pay for each stage after seeing the clickable demo of it, so there are no surprises at the end.'],
  ['Who owns the app after delivery?', 'You do. At launch I hand over the Bubble app (account access or a copy) together with a short handover guide, so the product is yours to run and extend.'],
  ['What happens after launch?', 'Support after launch is discussed individually, depending on what your product needs. Fixes, changes and new features can also be done at the hourly rate.'],
  ['Is it secure and ready for payments?', 'I build role-based access with Bubble Privacy Rules, so each user sees only what they are allowed to. Stripe payments are tested in test mode first and switched to live mode when you are ready.'],
  ['Which languages and devices do you support?', 'Interfaces are responsive for desktop and mobile, and can be English and Ukrainian (EN/UA) when needed, as in E-Pharmacy and Growly.'],
  ['What do I need to get started?', 'A short description of your idea: who the users are and the three to five things the product must do. Send it through the form and I will reply with a clear plan and quote.'],
  ['Are the projects on this page real clients?', 'They are portfolio demos built on Bubble in a test environment with Stripe in test mode. They show the full development lifecycle, from analysis and planning to logic, integrations, security and optimization.'],
] as const
