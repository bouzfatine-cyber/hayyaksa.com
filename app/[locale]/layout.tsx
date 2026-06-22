import { getMessages } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import { ClientLocaleProvider } from "@/components/client-locale-provider"
import { notFound } from "next/navigation"

const locales = ["en", "ar", "fr"]
const localeDirection: Record<string, string> = {
  en: "ltr",
  ar: "rtl",
  fr: "ltr",
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ClientLocaleProvider>
        {children}
      </ClientLocaleProvider>
    </NextIntlClientProvider>
  )
}