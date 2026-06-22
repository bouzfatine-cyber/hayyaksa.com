"use client"

import { motion } from "framer-motion"
import { useTranslations, useLocale } from "next-intl"
import {
  Building2,
  Users,
  LayoutGrid,
  PieChart,
  Globe,
  Handshake,
  TrendingUp,
  Network,
} from "lucide-react"

// Services configuration with icons
const servicesConfig = [
  {
    id: "service1",
    icon: Building2,
    titleKey: "services.service1Title",
    descKey: "services.service1Desc",
  },
  {
    id: "service2",
    icon: Users,
    titleKey: "services.service2Title",
    descKey: "services.service2Desc",
  },
  {
    id: "service3",
    icon: LayoutGrid,
    titleKey: "services.service3Title",
    descKey: "services.service3Desc",
  },
  {
    id: "service4",
    icon: PieChart,
    titleKey: "services.service4Title",
    descKey: "services.service4Desc",
  },
  {
    id: "service5",
    icon: Globe,
    titleKey: "services.service5Title",
    descKey: "services.service5Desc",
  },
  {
    id: "service6",
    icon: Handshake,
    titleKey: "services.service6Title",
    descKey: "services.service6Desc",
  },
  {
    id: "service7",
    icon: TrendingUp,
    titleKey: "services.service7Title",
    descKey: "services.service7Desc",
  },
  {
    id: "service8",
    icon: Network,
    titleKey: "services.service8Title",
    descKey: "services.service8Desc",
  },
]

export function ServicesSection() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider ${isRTL ? "" : "block text-center"}`}>
            {t("services.sectionLabel")}
          </span>
          <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance ${isRTL ? "" : "text-center"}`}>
            {t("services.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesConfig.map((service, index) => {
            const IconComponent = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 51, 141, 0.1)" }}
                className="group relative bg-white rounded-xl p-8 border border-gray-200 hover:border-[#00338D]/30 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="mb-6 inline-block">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <IconComponent
                      className="w-8 h-8 text-[#00338D] group-hover:text-[#002266] transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(service.descKey)}
                </p>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00338D] to-[#4B9FE1] rounded-full w-0 group-hover:w-full transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
