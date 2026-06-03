"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  Target, 
  TrendingUp, 
  Building2, 
  Handshake, 
  BarChart3, 
  Users, 
  LineChart, 
  Globe 
} from "lucide-react"

const services = [
  {
    icon: Target,
    title: "Market Entry Strategy",
    description: "Comprehensive market analysis and entry planning for seamless expansion into Saudi Arabia",
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    description: "Identifying and pursuing growth opportunities that align with your strategic objectives",
  },
  {
    icon: Building2,
    title: "Government Relations",
    description: "Navigate regulatory frameworks and build relationships with key government entities",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    description: "Connect with the right local partners to accelerate market presence and growth",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Data-driven insights on market trends, competitors, and emerging opportunities",
  },
  {
    icon: Users,
    title: "Corporate Representation",
    description: "Act as your trusted local presence with full representation services",
  },
  {
    icon: LineChart,
    title: "Investor Facilitation",
    description: "Connect international investors with high-potential Saudi opportunities",
  },
  {
    icon: Globe,
    title: "Expansion Advisory",
    description: "Strategic guidance for scaling operations across the GCC region",
  },
]

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Comprehensive Consulting Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            End-to-end advisory services designed to navigate the complexities of 
            Saudi Arabia&apos;s dynamic business landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative p-6 bg-white rounded-2xl border border-border hover:border-[#4B9FE1]/30 transition-all duration-300 hover:shadow-lg overflow-hidden"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00338D]/5 to-[#4B9FE1]/5" />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-[#DCEBFA] flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#00338D] group-hover:to-[#4B9FE1] transition-all duration-300">
                  <service.icon className="w-7 h-7 text-[#00338D] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
