"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { MapPin, Network, Lightbulb, Compass, Users } from "lucide-react"

const benefitIcons = [MapPin, Network, Lightbulb, Compass, Users]

function AnimatedCounter({ value, suffix, isText }: { value: number; suffix: string; isText?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !isText) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isInView, value, isText])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#00338D]">
      {isText ? suffix : `${count}${suffix}`}
    </span>
  )
}

export function WhyHSSection() {
  const t = useTranslations()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: 100, suffix: "+", label: t("whyHS.stat1Label"), isText: false },
    { value: 50, suffix: "+", label: t("whyHS.stat2Label"), isText: false },
    { value: 10, suffix: "+", label: t("whyHS.stat3Label"), isText: false },
    { value: 0, suffix: "GCC", label: t("whyHS.stat4Label"), isText: true },
  ]

  const benefits = [
    {
      icon: benefitIcons[0],
      titleKey: "whyHS.benefit1Title",
      descKey: "whyHS.benefit1Desc",
    },
    {
      icon: benefitIcons[1],
      titleKey: "whyHS.benefit2Title",
      descKey: "whyHS.benefit2Desc",
    },
    {
      icon: benefitIcons[2],
      titleKey: "whyHS.benefit3Title",
      descKey: "whyHS.benefit3Desc",
    },
    {
      icon: benefitIcons[3],
      titleKey: "whyHS.benefit4Title",
      descKey: "whyHS.benefit4Desc",
    },
    {
      icon: benefitIcons[4],
      titleKey: "whyHS.benefit5Title",
      descKey: "whyHS.benefit5Desc",
    },
  ]

  return (
    <section id="why-hs" className="py-24 bg-[#F8F9FB]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
            {t("whyHS.sectionLabel")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            {t("whyHS.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("whyHS.subtitle")}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isText={stat.isText} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.titleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
              className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#DCEBFA] flex items-center justify-center mb-4 group-hover:bg-[#00338D] transition-colors">
                <benefit.icon className="w-6 h-6 text-[#00338D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{t(benefit.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(benefit.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
