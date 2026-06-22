"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

export function Navbar() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const locale = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle language switching
  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      return // Same language, don't navigate
    }

    // IMPORTANT: Safety check to prevent nested locales (e.g., /ar/en, /fr/ar)
    // Even though usePathname() should return path without locale prefix,
    // we explicitly strip it in case of edge cases or race conditions
    
    // If pathname starts with current locale, remove it
    let pathWithoutLocale = pathname
    if (pathname.startsWith(`/${locale}/`)) {
      // Remove /en, /ar, /fr etc. from beginning
      pathWithoutLocale = pathname.slice(`/${locale}`.length)
    } else if (pathname === `/${locale}`) {
      // Handle root locale path
      pathWithoutLocale = '/'
    }
    
    // Ensure path starts with / for proper routing
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }
    
    // Create new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  // Get navbar links with correct section IDs
  const getNavLinks = () => [
    { href: `/${locale}/#about`, key: "navbar.aboutUs" },
    { href: `/${locale}/#why-hs`, key: "navbar.whyChooseUs" },
    { href: `/${locale}/#services`, key: "navbar.services" },
    { href: `/${locale}/#industries`, key: "navbar.industries" },
    { href: `/${locale}/insights`, key: "navbar.insights" },
    { href: `/${locale}/#contact`, key: "navbar.contact" },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
        dir={locale === "ar" ? "rtl" : undefined}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
                 {/* Logo */}
            <Link href={`/${locale}/`} className="flex items-center">
             <Image
  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-rmj25DNHKbxaX098OEXcFYJgEV3ayM.png"
  alt="H&S - Hayyak & Solutions"
  width={200}
  height={80}
  className="h-16 w-auto"
  priority={true}
/>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {getNavLinks().map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#00338D] ${
                    isScrolled ? "text-foreground" : "text-foreground"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Language Selector & CTA Button */}
            <div className="hidden lg:flex items-center gap-6">
              <div className={`flex items-center gap-3 ${locale === "ar" ? "border-r border-gray-300 pr-6" : "border-l border-gray-300 pl-6"}`}>
                {[
                  { code: "en", flagClass: "fi fi-gb" },
                  { code: "ar", flagClass: "fi fi-sa" },
                  { code: "fr", flagClass: "fi fi-fr" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`inline-flex items-center justify-center transition-all duration-300 hover:opacity-70 ${
                      locale === lang.code ? "opacity-100" : "opacity-80"
                    }`}
                    title={lang.code.toUpperCase()}
                    aria-label={`Switch to ${lang.code}`}
                  >
                    <span className={`${lang.flagClass} text-2xl`} />
                  </button>
                ))}
              </div>
              <Button
                asChild
                className="bg-[#00338D] hover:bg-[#002266] text-white font-mono font-semibold px-6"
              >
                <Link href={`/${locale}/#contact`}>{t("navbar.getStarted")}</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`absolute top-0 h-full w-80 bg-white shadow-xl ${locale === "ar" ? "left-0" : "right-0"}`}
              dir={locale === "ar" ? "rtl" : undefined}
            >
              <div className="p-6 pt-24">
                <div className={`flex flex-col gap-4 ${locale === "ar" ? "text-right" : ""}`}>
                  {getNavLinks().map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-[#00338D] transition-colors py-2"
                    >
                      {t(link.key)}
                    </Link>
                  ))}
                  <Button
                    asChild
                    className="bg-[#00338D] hover:bg-[#002266] text-white font-mono font-semibold mt-4"
                  >
                    <Link href={`/${locale}/#contact`} onClick={() => setIsMobileMenuOpen(false)}>
                      {t("navbar.getStarted")}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
