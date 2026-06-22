"use client"

import { useEffect } from "react"

export function LocaleHtmlWrapper({
  children,
  lang,
  dir,
}: {
  children: React.ReactNode
  lang: string
  dir: string
}) {
  useEffect(() => {
    // Set HTML attributes for the current locale
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.documentElement.className = dir === "rtl" ? "rtl" : "ltr"
  }, [lang, dir])

  return <>{children}</>
}
