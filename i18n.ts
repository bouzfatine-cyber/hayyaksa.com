import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'ar', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
  fr: 'ltr'
}

export const localeLabels: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇬🇧' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  fr: { name: 'Français', flag: '🇫🇷' }
}

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // Use explicit locale override if provided, otherwise use requestLocale from URL segment
  const resolvedLocale = locale ?? (await requestLocale) ?? defaultLocale

  let messages

  switch (resolvedLocale) {
    case 'ar':
      messages = (await import('./locales/ar.json')).default
      break
    case 'fr':
      messages = (await import('./locales/fr.json')).default
      break
    default:
      messages = (await import('./locales/en.json')).default
  }

  return {
  locale: resolvedLocale,
  messages,
  timeZone: "UTC"
  }
})
