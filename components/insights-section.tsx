"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function InsightsSection() {
  const t = useTranslations()
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const insights = [
    {
      slug: "market-entry-saudi-arabia",
      titleKey: "insights.insight1Title",
      excerptKey: "insights.insight1Excerpt",
      dateKey: "insights.insight1Date",
      image: "/images/insights/article1.png",
      featured: true,
    },
    {
      slug: "vision-2030-investment",
      titleKey: "insights.insight2Title",
      excerptKey: "insights.insight2Excerpt",
      dateKey: "insights.insight2Date",
      image: "/images/insights/article2.png",
      featured: false,
    },
    {
      slug: "government-relations-ppp",
      titleKey: "insights.insight3Title",
      excerptKey: "insights.insight3Excerpt",
      dateKey: "insights.insight3Date",
      image: "/images/insights/article3.png",
      featured: false,
    },
    {
      slug: "gcc-expansion-strategy",
      titleKey: "insights.insight4Title",
      excerptKey: "insights.insight4Excerpt",
      dateKey: "insights.insight4Date",
      image: "/images/insights/article4.png",
      featured: false,
    },
  ]

  const featuredArticle = insights.find((i) => i.featured)
  const otherArticles = insights.filter((i) => !i.featured)

  return (
    <section id="insights" className="py-24 bg-[#F8F9FB]" ref={ref} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16"
        >
          {locale === "ar" ? (
            <>
              {/* Arabic: CTA First */}
              <Link
                href={`/${locale}/insights`}
                className="group inline-flex items-center gap-2 text-[#00338D] font-semibold mt-6 lg:mt-0 lg:order-2 hover:gap-3 transition-all whitespace-nowrap"
              >
                {t("insights.viewAll")}
                <ArrowLeft className="w-5 h-5" />
              </Link>
              {/* Arabic: Title Block Second */}
              <div className="lg:order-1">
                <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
                  {t("insights.sectionLabel")}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2">
                  {t("insights.title")}
                </h2>
              </div>
            </>
          ) : (
            <>
              {/* English/French: Title Block First */}
              <div>
                <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
                  {t("insights.sectionLabel")}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2">
                  {t("insights.title")}
                </h2>
              </div>
              {/* English/French: CTA Second */}
              <Link
                href={`/${locale}/insights`}
                className="group inline-flex items-center gap-2 text-[#00338D] font-semibold mt-6 lg:mt-0 hover:gap-3 transition-all whitespace-nowrap"
              >
                {t("insights.viewAll")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </>
          )}
        </motion.div>

        {/* Main Grid: Featured Left + 3 Cards Right */}
        {locale === "ar" ? (
          <div
            className={`flex flex-col lg:gap-8 gap-8 ${
              locale === "ar"
                ? "lg:flex-row-reverse"
                : "lg:flex-row"
            }`}
          >
            {/* Arabic: 3 Smaller Cards First (Right Side) */}
            <div className="lg:w-2/3 flex flex-col gap-6 order-2 lg:order-none">
              {otherArticles.map((article, index) => (
                <motion.article
                  key={article.titleKey}
                  initial={{ opacity: 1, y: 0 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + 0.1 * (index + 1) }}
                >
                  <Link
                    href={`/${locale}/insights/${article.slug}`}
                    className="block h-full"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-row-reverse items-start gap-4 p-4 md:p-5">
                      {/* Small Image on Left */}
                      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={article.image}
                          alt={t(article.titleKey)}
                          fill
                          sizes="(max-width: 768px) 100px, 112px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>

                      {/* Content on Right */}
                      <div className="flex-grow flex flex-col justify-between">
                        {/* Title */}
                        <h3 className="font-serif text-sm md:text-base text-foreground mb-3 group-hover:text-[#00338D] transition-colors leading-snug">
                          {t(article.titleKey)}
                        </h3>
                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {t(article.dateKey)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Arabic: Featured Article Second (Left Side) */}
            {featuredArticle && (
              <motion.article
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-1/3 lg:flex-shrink-0 order-1 lg:order-none"
              >
                <Link
                  href={`/${locale}/insights/${featuredArticle.slug}`}
                  className="block h-full"
                >
                  <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-col">
                    {/* Featured Image - Large */}
                    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden flex-shrink-0">
                      <Image
                        src={featuredArticle.image}
                        alt={t(featuredArticle.titleKey)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />

                    </div>
                    {/* Featured Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground mb-4 group-hover:text-[#00338D] transition-colors leading-tight">
                        {t(featuredArticle.titleKey)}
                      </h3>
                      <div
                        className={`flex items-center gap-2 text-xs text-muted-foreground mt-auto ${
                          locale === "ar" ? "flex-row-reverse justify-end" : ""
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        {t(featuredArticle.dateKey)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-8">
            {/* English/French: Featured Article First (Left Side) */}
            {featuredArticle && (
              <motion.article
                initial={{ opacity: 1, y: 0 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-1/3 lg:flex-shrink-0"
              >
                <Link
                  href={`/${locale}/insights/${featuredArticle.slug}`}
                  className="block h-full"
                >
                  <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-col">
                    {/* Featured Image - Large */}
                    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden flex-shrink-0">
                      <Image
                        src={featuredArticle.image}
                        alt={t(featuredArticle.titleKey)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />

                    </div>
                    {/* Featured Content */}
                    <div
                      className={`p-6 md:p-8 flex flex-col flex-grow ${
                        locale === "ar" ? "text-right" : ""
                      }`}
                    >
                      <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground mb-4 group-hover:text-[#00338D] transition-colors leading-tight">
                        {t(featuredArticle.titleKey)}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
                        <Calendar className="w-4 h-4" />
                        {t(featuredArticle.dateKey)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )}

            {/* English/French: 3 Smaller Cards Second (Right Side) */}
            <div className="lg:w-2/3 flex flex-col gap-6">
              {otherArticles.map((article, index) => (
                <motion.article
                  key={article.titleKey}
                  initial={{ opacity: 1, y: 0 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + 0.1 * (index + 1) }}
                >
                  <Link
                    href={`/${locale}/insights/${article.slug}`}
                    className="block h-full"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex items-start gap-4 p-4 md:p-5">
                      {/* Small Image on Left */}
                      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={article.image}
                          alt={t(article.titleKey)}
                          fill
                          sizes="(max-width: 768px) 100px, 112px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>

                      {/* Content on Right */}
                      <div className="flex-grow flex flex-col justify-between">
                        {/* Title */}
                        <h3 className="font-serif text-sm md:text-base text-foreground mb-3 group-hover:text-[#00338D] transition-colors leading-snug">
                          {t(article.titleKey)}
                        </h3>
                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {t(article.dateKey)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
