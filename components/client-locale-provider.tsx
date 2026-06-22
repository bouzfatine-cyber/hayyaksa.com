"use client"

import { useLocale } from "next-intl"
import { useEffect } from "react"

/**
 * ClientLocaleProvider
 * 
 * This component sets the locale and direction attributes on the html element
 * dynamically based on the current locale. This ensures that:
 * 1. The html lang attribute matches the current locale
 * 2. The html dir attribute is set correctly:
 *    - Arabic (ar): RTL (Right-to-Left)
 *    - English (en): LTR (Left-to-Right)
 *    - French (fr): LTR (Left-to-Right)
 * 3. Direction updates immediately when locale changes
 * 
 * Note: This runs on the client side because Next.js App Router sets the html tag
 * in the root layout which doesn't have access to the locale parameter from [locale]/layout.tsx
 */
export function ClientLocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale()

  useEffect(() => {
    // Get the root html element
    const htmlElement = document.documentElement

    // Update lang attribute to match current locale
    htmlElement.lang = locale

    // Update dir attribute based on locale
    // Arabic uses RTL (Right-to-Left), English and French use LTR (Left-to-Right)
    htmlElement.dir = locale === "ar" ? "rtl" : "ltr"

  }, [locale])

  return children
}
