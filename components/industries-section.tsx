"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
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

const industries = [
  { icon: Zap, name: "Energy", description: "Oil, gas, and renewable energy sectors" },
  { icon: Cpu, name: "Technology", description: "Digital transformation and IT solutions" },
  { icon: Heart, name: "Healthcare", description: "Medical services and pharmaceuticals" },
  { icon: Factory, name: "Manufacturing", description: "Industrial production and automation" },
  { icon: HardHat, name: "Construction", description: "Infrastructure and real estate development" },
  { icon: Palmtree, name: "Tourism", description: "Hospitality and entertainment ventures" },
  { icon: Truck, name: "Logistics", description: "Supply chain and transportation" },
  { icon: Landmark, name: "Financial Services", description: "Banking, fintech, and investment" },
]

export function IndustriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="industries" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
            Industries
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Sector Expertise Across the Kingdom
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our consultants bring specialized knowledge across Saudi Arabia&apos;s 
            key economic sectors, aligned with Vision 2030 priorities.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group p-6 bg-[#F8F9FB] rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white group-hover:bg-gradient-to-br group-hover:from-[#00338D] group-hover:to-[#4B9FE1] flex items-center justify-center mb-4 transition-all duration-300 shadow-sm">
                <industry.icon className="w-8 h-8 text-[#00338D] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{industry.name}</h3>
              <p className="text-sm text-muted-foreground">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
