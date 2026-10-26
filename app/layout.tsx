import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'

const sg = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sg', display: 'swap' })

const title = 'Vitalii Pietukhov — AI No-Code Developer (Bubble.io)'
const description = 'Bubble.io developer building client portals, operations tools, marketplaces and learning platforms with role-based security, Stripe, APIs and n8n automation.'

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL('https://krylontech-portfolio.vercel.app'),
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  openGraph: { title, description, url: 'https://krylontech-portfolio.vercel.app', siteName: 'KRYLONTECH', type: 'website', images: [{ url: '/images/cards/projects.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title, description },
}

export const viewport: Viewport = { themeColor: '#030711', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={sg.variable}><body>{children}</body></html>
}
