import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: '--font-manrope'
})

export const metadata: Metadata = {
  title: 'H&S | Hayyak & Solutions - Your Trusted Gateway to Business Success in Saudi Arabia',
  description: 'Premium consulting services for market entry, government relations, strategic partnerships, and business development across Saudi Arabia and the GCC. Connecting Opportunities. Creating Growth.',
  generator: 'v0.app',
  keywords: ['consulting', 'Saudi Arabia', 'GCC', 'market entry', 'government relations', 'strategic advisory', 'business development', 'Vision 2030'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
