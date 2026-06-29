import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Hayyak & Solutions",
  description: "Business consulting and corporate services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}