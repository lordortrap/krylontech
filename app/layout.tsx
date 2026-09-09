import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'KrylonTech — Building Digital Futures',
  description: 'KrylonTech — Bubble.io, Next.js and modern digital product development.',
  keywords: ['KrylonTech', 'Bubble Developer', 'Next.js', 'MVP development', 'web development'],
  openGraph: { title: 'KrylonTech — Building Digital Futures', description: 'Websites, MVPs and digital products built for what comes next.', type: 'website' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
