"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { 
  Zap, 
  Cpu, 
  Heart, 
  Factory, 
  HardHat, 
  Palmtree, 
  Truck, 
  Landmark 
} from "lucide-react"

const industryIcons = [Zap, Cpu, Heart, Factory, HardHat, Palmtree, Truck, Landmark]

export function IndustriesSection() {
  const t = useTranslations()
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const industries = [
    { icon: industryIcons[0], nameKey: "industries.industry1", descKey: "industries.industry1Desc" },
    { icon: industryIcons[1], nameKey: "industries.industry2", descKey: "industries.industry2Desc" },
    { icon: industryIcons[2], nameKey: "industries.industry3", descKey: "industries.industry3Desc" },
    { icon: industryIcons[3], nameKey: "industries.industry4", descKey: "industries.industry4Desc" },
    { icon: industryIcons[4], nameKey: "industries.industry5", descKey: "industries.industry5Desc" },
    { icon: industryIcons[5], nameKey: "industries.industry6", descKey: "industries.industry6Desc" },
    { icon: industryIcons[6], nameKey: "industries.industry7", descKey: "industries.industry7Desc" },
    { icon: industryIcons[7], nameKey: "industries.industry8", descKey: "industries.industry8Desc" },
  ]

  return (
    <section id="industries" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span 
            className={`text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider block ${locale === "ar" ? "" : "text-center"}`}
            style={locale === "ar" ? { textAlign: "center" } : {}}
          >
            {t("industries.sectionLabel")}
          </span>
          <h2 
            className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance ${locale === "ar" ? "" : "text-center"}`}
            style={locale === "ar" ? { textAlign: "center" } : {}}
          >
            {t("industries.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("industries.subtitle")}
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.nameKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group p-6 bg-[#F8F9FB] rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#00338D] group-hover:to-[#4B9FE1] flex items-center justify-center mb-4 transition-all duration-300 shadow-sm">
                <industry.icon className="w-8 h-8 text-[#00338D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t(industry.nameKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(industry.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
