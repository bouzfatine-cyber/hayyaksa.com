"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function ManagingDirectorSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const paragraphStyle = "text-white/90 leading-relaxed text-lg"

  return (
    <section
      className="py-24 bg-gradient-to-br from-[#00338D] to-[#002266]"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          {/* Label */}
          <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
            Leadership
          </span>

          {/* Title */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-12 text-balance">
            A Message From The Managing Director
          </h2>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-10"
          >
            <div className="relative max-w-sm mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                <a
                  href="https://www.linkedin.com/in/mostafa-aouich-business-consultant/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mostafa-51xHUepPEIh9M7lBZp1pWErBakoeqX.png"
                    alt="Mostafa Aouich - Managing Director of H&S"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                </a>
              </div>

              {/* Decorative frame */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#4B9FE1]/30 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[#4B9FE1]/20 rounded-2xl -z-10" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="font-serif text-2xl md:text-3xl text-white mb-1">
              Mostafa Aouich
            </div>
            <div className="text-[#4B9FE1] font-medium">
              Managing Director
            </div>
            <div className="text-white/60 text-sm">
              Hayyak & Solutions
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-card-dark bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/10 text-left"
          >
            <p className={`${paragraphStyle} mb-6`}>
              &quot;At H&S, we believe in the transformative power of strategic partnerships. 
              Saudi Arabia stands at an extraordinary moment of opportunity—where Vision 2030 
              is reshaping the economic landscape and creating unprecedented possibilities 
              for international businesses.&quot;
            </p>

            <p className={paragraphStyle}>
              &quot;Our mission is to bridge international opportunity with Saudi Arabia&apos;s 
              transformation economy. We don&apos;t just facilitate market entry; we build 
              lasting partnerships that create mutual value and sustainable growth.&quot;
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}