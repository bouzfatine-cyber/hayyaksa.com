"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Network, Compass, HeartHandshake } from "lucide-react"
import Image from "next/image"

const pillars = [
  {
    icon: MapPin,
    title: "Saudi Expertise",
    description: "Deep understanding of local market dynamics, culture, and business practices",
  },
  {
    icon: Network,
    title: "GCC Network",
    description: "Established relationships across the Gulf Cooperation Council region",
  },
  {
    icon: Compass,
    title: "Strategic Advisory",
    description: "Executive-level guidance aligned with Vision 2030 objectives",
  },
  {
    icon: HeartHandshake,
    title: "Trusted Relationships",
    description: "Long-term partnerships built on integrity and mutual success",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-[#F8F9FB]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
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
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#00338D] to-[#4B9FE1] rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
              About H&S
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
              Connecting Vision with Opportunity
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Hayyak & Solutions bridges international ambition with Saudi opportunity. 
              We combine deep local expertise with global business acumen to help organizations 
              navigate, enter, and thrive in one of the world&apos;s most dynamic markets.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Our team brings decades of combined experience across government relations, 
              corporate strategy, and market development. We don&apos;t just advise—we partner 
              with our clients to deliver tangible results.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#DCEBFA] flex items-center justify-center flex-shrink-0">
                    <pillar.icon className="w-5 h-5 text-[#00338D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
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
