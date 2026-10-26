export type Project = {
  id: string
  title: string
  type: string
  year: string
  status: string
  image?: string
  stack: string[]
  description: string
  features: string[]
  link: string
}

export const projects: Project[] = [
  {
    id: '01', title: 'ClientPortal', type: 'AGENCY PORTAL', year: '2026', status: 'IN PROGRESS',
    stack: ['Bubble.io', 'Privacy Rules', 'Backend workflows', 'API Connector'],
    description: 'Demo portal for creative agencies: share deliverables with clients, collect approvals and track milestones in one place. Every client sees only their own projects.',
    features: [
      'Role-based access with grants maintained by backend workflows',
      'Approval center with versions, feedback history and Approve / Request changes',
      'Invitations, join-by-code and switching between agency workspaces',
      'Comments with visibility levels, notifications and milestone reminder emails',
    ],
    link: 'https://clientportal-54921.bubbleapps.io/version-test',
  },
  {
    id: '02', title: 'SoloFlow', type: 'OPERATIONS PLATFORM', year: '2026', status: 'IN PROGRESS',
    stack: ['Bubble.io', 'Privacy Rules', 'Backend workflows', 'Drag & drop'],
    description: 'Demo operations platform for small service businesses: pipeline, jobs, clients, bookings, finances and team, plus a secure portal where the client follows their own work.',
    features: [
      '14 app pages with Kanban / Table / Calendar views and drag-and-drop stages',
      '20+ data types and about 50 backend workflows',
      'Booking conflict checks, scheduled reminders, audit trail',
      'Multi-currency support, expiring team invitations and client-portal links',
    ],
    link: 'https://lordortrap12.bubbleapps.io/version-test',
  },
  {
    id: '03', title: 'E-Pharmacy', type: 'MARKETPLACE', year: '2026', status: 'DEMO',
    image: '/images/projects/e-pharmacy.png',
    stack: ['Bubble.io', 'Stripe (test mode)', 'API', 'Workflows'],
    description: 'Demo online-pharmacy marketplace: pharmacies have their own pages and product lists; customers search medicines, add them to a cart and pay through Stripe test mode.',
    features: [
      'Pharmacy pages and product listings',
      'Medicine search, cart and Stripe checkout in test mode',
      'Registration, login and customer reviews',
    ],
    link: 'https://epharmacyvpietukhov-31602.bubbleapps.io/version-test',
  },
  {
    id: '04', title: 'Growly', type: 'EDTECH', year: '2026', status: 'DEMO',
    image: '/images/projects/growly.png',
    stack: ['Bubble.io', 'Stripe (test mode)', 'PDF Conjurer', 'EN / UA'],
    description: 'Demo online-learning platform for soft skills: users buy courses, study modules and video lessons, pass a final test and receive a certificate with a PDF and a public link.',
    features: [
      'Course catalog, search, categories and Stripe test payments',
      'Modules, video lessons, final test and progress tracking',
      'Certificate generation with PDF and public link',
      'Admin panel and EN / UA interface',
    ],
    link: 'https://growly-67500.bubbleapps.io/version-test',
  },
]

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
