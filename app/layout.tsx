import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KRYLONTECH — AI No-Code Development & Digital Products',
  description: 'KRYLONTECH turns ideas into scalable digital products — from landing pages and MVPs to SaaS platforms and web apps.',
  metadataBase: new URL('https://krylontech-portfolio.vercel.app'),
  openGraph: { title: 'KRYLONTECH', description: 'AI No-Code Development & Digital Products', url: 'https://krylontech-portfolio.vercel.app', siteName: 'KRYLONTECH', type: 'website' }
}

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>
}
