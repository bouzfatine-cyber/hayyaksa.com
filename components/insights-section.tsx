"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const insights = [
  {
    category: "Market Entry",
    title: "Navigating Saudi Arabia's Business Landscape in 2024",
    excerpt: "Key considerations for international companies looking to establish presence in the Kingdom's rapidly evolving market.",
    date: "March 15, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Riyadh-BmDjGP11qgHFdpxz965iCh9yiqNErq.png",
    featured: true,
  },
  {
    category: "Vision 2030",
    title: "Investment Opportunities in Saudi Giga-Projects",
    excerpt: "Exploring the trillion-dollar development projects reshaping Saudi Arabia's economic future.",
    date: "March 8, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/meeting%20room%20about%20us-HUImJyyzyYnydqTYazHcC9mdOYC4vf.png",
    featured: false,
  },
  {
    category: "Government Relations",
    title: "Building Effective Public-Private Partnerships",
    excerpt: "Best practices for engaging with Saudi government entities and regulatory bodies.",
    date: "February 28, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Riyadh-BmDjGP11qgHFdpxz965iCh9yiqNErq.png",
    featured: false,
  },
  {
    category: "Strategic Advisory",
    title: "GCC Expansion: Beyond Saudi Arabia",
    excerpt: "Leveraging Saudi success to scale across the Gulf Cooperation Council region.",
    date: "February 20, 2024",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/meeting%20room%20about%20us-HUImJyyzyYnydqTYazHcC9mdOYC4vf.png",
    featured: false,
  },
]

export function InsightsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredArticle = insights.find((i) => i.featured)
  const otherArticles = insights.filter((i) => !i.featured)

  return (
    <section id="insights" className="py-24 bg-[#F8F9FB]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
              Insights
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 text-balance">
              Latest Perspectives
            </h2>
          </div>
          <Link
            href="#"
            className="group inline-flex items-center gap-2 text-[#00338D] font-semibold mt-4 md:mt-0 hover:gap-3 transition-all"
          >
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {featuredArticle && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group lg:row-span-2"
            >
              <Link href="#" className="block h-full">
                <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#00338D] text-white text-xs font-semibold rounded-full">
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {featuredArticle.date}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-[#00338D] transition-colors">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Other Articles */}
          <div className="space-y-6">
            {otherArticles.map((article, index) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
                className="group"
              >
                <Link href="#" className="block">
                  <div className="flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-[#4B9FE1] uppercase">
                        {article.category}
                      </span>
                      <h3 className="font-semibold text-foreground mt-1 mb-1 group-hover:text-[#00338D] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
