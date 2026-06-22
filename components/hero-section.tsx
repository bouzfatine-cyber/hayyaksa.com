"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Globe, Handshake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations, useLocale } from "next-intl"

export function HeroSection() {
  const t = useTranslations()
  const locale = useLocale()
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 animate-slow-zoom origin-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Riyadh-BmDjGP11qgHFdpxz965iCh9yiqNErq.png"
            alt="Riyadh Skyline at dusk featuring Kingdom Centre"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-white/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={locale === "ar" ? "text-right" : "text-left"}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DCEBFA] border border-[#4B9FE1]/20 mb-8"
            >
              <span className="text-sm font-medium text-[#00338D]">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline - MULTILINGUAL WITH GRADIENT */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hero-title mb-6"
            >
              {t("hero.titleBefore")}
              <span className="gradient-text">{t("hero.titleGradient")}</span>
              {t("hero.titleAfter")}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <div className={locale === "ar" ? "flex flex-col sm:flex-row-reverse gap-4" : "flex flex-col sm:flex-row gap-4"}>
              <Button
                asChild
                size="lg"
                className="bg-[#00338D] hover:bg-[#002266] text-white font-mono font-semibold px-8 py-6 text-base"
              >
                <Link href="#contact">
                  {t("hero.cta1")}
                  <ArrowRight className={locale === "ar" ? "mr-2 h-5 w-5" : "ml-2 h-5 w-5"} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#00338D] hover:bg-[#002266] text-white font-mono font-semibold px-8 py-6 text-base"
              >
                <Link href="#services">{t("hero.cta2")}</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-border/50"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-[#00338D]" />
                <span>{t("hero.trustSignal1")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-5 h-5 text-[#00338D]" />
                <span>{t("hero.trustSignal2")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Handshake className="w-5 h-5 text-[#00338D]" />
                <span>{t("hero.trustSignal3")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Glass Card Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-2xl p-8 shadow-xl">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                {t("hero.glassCardTitle")}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-[#F8F9FB] rounded-xl">
                  <div className="text-3xl font-bold text-[#00338D] mb-1">100+</div>
                  <div className="text-sm text-muted-foreground">{t("hero.stat1Label")}</div>
                </div>
                <div className="text-center p-4 bg-[#F8F9FB] rounded-xl">
                  <div className="text-3xl font-bold text-[#00338D] mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">{t("hero.stat2Label")}</div>
                </div>
                <div className="text-center p-4 bg-[#F8F9FB] rounded-xl">
                  <div className="text-3xl font-bold text-[#00338D] mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">{t("hero.stat3Label")}</div>
                </div>
                <div className="text-center p-4 bg-[#F8F9FB] rounded-xl">
                  <div className="text-3xl font-bold text-[#00338D] mb-1">GCC</div>
                  <div className="text-sm text-muted-foreground">{t("hero.stat4Label")}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#00338D]/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-[#00338D] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
