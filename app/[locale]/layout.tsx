import { getMessages } from "next-intl/server"
import { LocaleProviderWrapper } from "@/components/locale-provider-wrapper"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <LocaleProviderWrapper locale={locale} messages={messages}>
      {children}
    </LocaleProviderWrapper>
  )
}