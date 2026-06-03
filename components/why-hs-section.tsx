"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { MapPin, Network, Lightbulb, Compass, Users } from "lucide-react"

const stats = [
  { value: 100, suffix: "+", label: "Strategic Connections" },
  { value: 50, suffix: "+", label: "Business Partnerships" },
  { value: 10, suffix: "+", label: "Industries Served" },
  { value: 0, suffix: "GCC", label: "Wide Network", isText: true },
]

const benefits = [
  {
    icon: MapPin,
    title: "Deep Local Knowledge",
    description: "Unmatched understanding of Saudi market dynamics and regulations",
  },
  {
    icon: Network,
    title: "Executive-Level Network",
    description: "Direct access to decision-makers across government and private sectors",
  },
  {
    icon: Lightbulb,
    title: "Tailored Solutions",
    description: "Custom strategies designed for your unique business objectives",
  },
  {
    icon: Compass,
    title: "Strategic Guidance",
    description: "Expert navigation through complex market entry processes",
  },
  {
    icon: Users,
    title: "Long-Term Partnerships",
    description: "Building sustainable relationships that drive ongoing success",
  },
]

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Your Strategic Partner in the Kingdom
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            With deep roots in Saudi Arabia and extensive GCC connections, we deliver 
            results-driven consulting services that accelerate your business success.
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
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + 0.1 * index }}
              className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#DCEBFA] flex items-center justify-center mb-4 group-hover:bg-[#00338D] transition-colors">
                <benefit.icon className="w-6 h-6 text-[#00338D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
