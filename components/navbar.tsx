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
      return
    }

    let pathWithoutLocale = pathname
    if (pathname.startsWith(`/${locale}/`)) {
      pathWithoutLocale = pathname.slice(`/${locale}`.length)
    } else if (pathname === `/${locale}`) {
      pathWithoutLocale = "/"
    }

    if (!pathWithoutLocale.startsWith("/")) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

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

  // Language selector component
  const LanguageSelector = () => (
    <div
      className={`flex items-center gap-3 ${
        locale === "ar"
          ? "border-r border-gray-300 pr-6"
          : "border-l border-gray-300 pl-6"
      }`}
    >
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
  )

  // CTA Button component
  const CTAButton = () => (
    <Button
      asChild
      className="bg-[#00338D] hover:bg-[#002266] text-white font-mono font-semibold px-6"
    >
      <Link href={`/${locale}/#contact`}>{t("navbar.getStarted")}</Link>
    </Button>
  )

  // Navigation Links component
  const NavLinks = () => (
    <div className="flex items-center gap-8 rtl:flex-row-reverse">
      {(locale === "ar"
  ? [...getNavLinks()].reverse()
  : getNavLinks()
).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium transition-colors hover:text-[#00338D]"
        >
          {t(link.key)}
        </Link>
      ))}
    </div>
  )

  // Logo component
  const Logo = () => (
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
  )

  // Mobile Menu Button component
  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="lg:hidden flex items-center justify-center"
      aria-label="Toggle mobile menu"
    >
      {isMobileMenuOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  )

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
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Desktop: CSS Grid layout | Mobile: Flex layout */}
          <div
            className="h-20 flex lg:grid items-center"
            style={{
              gridTemplateColumns: "auto 1fr auto",
              gridAutoFlow: "column",
            }}
            dir={locale === "ar" ? "rtl" : undefined}
          >
            {/* Column 1: Logo (auto width) */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Column 2: Navigation (1fr - fills space, centered) */}
            <div className="hidden lg:flex justify-center">
              <NavLinks />
            </div>

            {/* Column 3: Language Selector + CTA Button (auto width) */}
            <div className="hidden lg:flex items-center gap-6">
              <LanguageSelector />
              <CTAButton />
            </div>

            {/* Mobile Menu Button (visible only on mobile) */}
            <div className={`lg:hidden ${locale === "ar" ? "mr-auto" : "ml-auto"}`}>
              <MobileMenuButton />
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: locale === "ar" ? "-100%" : "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: locale === "ar" ? "-100%" : "100%",
            }}
            transition={{ duration: 0.3 }}
            className={`fixed top-[80px] h-[calc(100vh-80px)] w-80 bg-white shadow-xl z-40 ${
              locale === "ar" ? "left-0" : "right-0"
            }`}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <div className="flex flex-col gap-4 p-6">
              {/* Mobile Language Selector - TOP */}
              <div className="border-b border-border py-4 mb-6">
                <div className="flex items-center gap-3 justify-center">
                  {[
                    { code: "en", flagClass: "fi fi-gb" },
                    { code: "ar", flagClass: "fi fi-sa" },
                    { code: "fr", flagClass: "fi fi-fr" },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`inline-flex items-center justify-center transition-all duration-300 hover:opacity-70 ${
                        locale === lang.code ? "opacity-100" : "opacity-80"
                      }`}
                      title={lang.code.toUpperCase()}
                    >
                      <span className={`${lang.flagClass} text-2xl`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              {getNavLinks().map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
