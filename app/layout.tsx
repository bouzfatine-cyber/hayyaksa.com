import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'H&S | Hayyak & Solutions — Your Trusted Gateway to Business Success in Saudi Arabia',
  description:
    'Premium consulting services for market entry, government relations, strategic partnerships, and business development across Saudi Arabia and the GCC. Connecting Opportunities. Creating Growth.',
  generator: 'Hayyak & Solutions',
  keywords: [
    'consulting',
    'Saudi Arabia',
    'GCC',
    'market entry',
    'government relations',
    'strategic advisory',
    'business development',
    'Vision 2030',
  ],
  icons: {
  icon: '/icon/favicon.png',
  shortcut: '/icon/favicon.png',
  apple: '/icon/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#00338D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${manrope.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
