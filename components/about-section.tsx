"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { MapPin, Network, Compass, HeartHandshake } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  const t = useTranslations()
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const pillars = [
    {
      icon: MapPin,
      titleKey: "aboutUs.pillar1Title",
      descKey: "aboutUs.pillar1Desc",
    },
    {
      icon: Network,
      titleKey: "aboutUs.pillar2Title",
      descKey: "aboutUs.pillar2Desc",
    },
    {
      icon: Compass,
      titleKey: "aboutUs.pillar3Title",
      descKey: "aboutUs.pillar3Desc",
    },
    {
      icon: HeartHandshake,
      titleKey: "aboutUs.pillar4Title",
      descKey: "aboutUs.pillar4Desc",
    },
  ]

  return (
    <section id="about" className="py-24 bg-[#F8F9FB]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/meeting%20room%20about%20us-HUImJyyzyYnydqTYazHcC9mdOYC4vf.png"
                alt="H&S Executive Boardroom with Riyadh skyline view"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className={locale === "ar" ? "absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#00338D] to-[#4B9FE1] rounded-2xl -z-10" : "absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#00338D] to-[#4B9FE1] rounded-2xl -z-10"} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: locale === "ar" ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
              {t("aboutUs.sectionLabel")}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
              {t("aboutUs.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("aboutUs.para1")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {t("aboutUs.para2")}
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + 0.1 * index }}
                  className={locale === "ar" ? "flex items-start gap-3 flex-row-reverse" : "flex items-start gap-3"}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#DCEBFA] flex items-center justify-center flex-shrink-0">
                    <pillar.icon className="w-5 h-5 text-[#00338D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t(pillar.titleKey)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(pillar.descKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}