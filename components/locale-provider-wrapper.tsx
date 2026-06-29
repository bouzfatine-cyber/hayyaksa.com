"use client"

import { NextIntlClientProvider } from "next-intl"
import { ClientLocaleProvider } from "./client-locale-provider"

interface LocaleProviderWrapperProps {
  children: React.ReactNode
  locale: string
  messages: Record<string, any>
}

/**
 * LocaleProviderWrapper
 * 
 * This client component wraps the application with both:
 * 1. NextIntlClientProvider - provides i18n context for useTranslations() and useLocale()
 * 2. ClientLocaleProvider - sets HTML attributes (lang, dir) based on locale
 * 
 * It receives messages from the server-side layout and passes them to NextIntlClientProvider.
 * This ensures all client components have access to translations and locale info.
 */
export function LocaleProviderWrapper({
  children,
  locale,
  messages,
}: LocaleProviderWrapperProps) {
  return (
    <NextIntlClientProvider locale={locale}  messages={messages} timeZone="UTC">
      <ClientLocaleProvider>
        {children}
      </ClientLocaleProvider>
    </NextIntlClientProvider>
  )
}
