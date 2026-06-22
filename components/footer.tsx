"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Linkedin, Mail, Phone, MessageCircle } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const t = useTranslations()

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/hayyak-solutions",
      label: "LinkedIn",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/966511047242",
      label: "WhatsApp",
    },
    {
      icon: Mail,
      href: "mailto:info@hayyaksa.com",
      label: "Email",
    },
    {
      icon: Phone,
      href: "tel:+966511047242",
      label: "Phone",
    },
  ]

  return (
    <footer className="bg-[#00338D] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 md:py-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
          {/* Brand — spans 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-2">
               <div className="h-6 w-fit">
  <Image
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-rmj25DNHKbxaX098OEXcFYJgEV3ayM.png"
    alt="H&S - Hayyak & Solutions"
    width={200}
    height={80}
    className="h-8 w-auto brightness-0 invert"
  />
</div>
            </Link>
            <p className="text-white/70 text-xs leading-tight mb-2 max-w-xs">
              {t("footer.companyDesc")}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-3 h-3" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links - NEW ORDER */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-2">{t("footer.navigation") || "Navigation"}</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="#about"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("navbar.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#why-hs"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("navbar.whyChooseUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("navbar.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="#industries"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("navbar.industries")}
                </Link>
              </li>
              <li>
                <Link
                  href="#insights"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("navbar.insights")}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("navbar.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-2">{t("footer.contactTitle")}</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="#contact"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("footer.contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("footer.riyadhOffice")}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("footer.scheduleCall")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-2">{t("footer.legal")}</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  href="#"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-white/70 hover:text-white transition-colors"
                >
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-2 text-center">
          <p className="text-xs text-white/70">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
