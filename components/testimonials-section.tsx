"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function TestimonialsSection() {
  const t = useTranslations()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quoteKey: "testimonials.testimonial1",
      authorKey: "testimonials.testimonial1Author",
      titleKey: "testimonials.testimonial1Title",
      companyKey: "testimonials.testimonial1Company",
    },
    {
      quoteKey: "testimonials.testimonial2",
      authorKey: "testimonials.testimonial2Author",
      titleKey: "testimonials.testimonial2Title",
      companyKey: "testimonials.testimonial2Company",
    },
    {
      quoteKey: "testimonials.testimonial3",
      authorKey: "testimonials.testimonial3Author",
      titleKey: "testimonials.testimonial3Title",
      companyKey: "testimonials.testimonial3Company",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
            {t("testimonials.sectionLabel")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 text-balance">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-[#F8F9FB] rounded-3xl p-8 md:p-12 relative">
            {/* Quote icon */}
            <div className="absolute top-8 left-8 w-12 h-12 rounded-full bg-[#DCEBFA] flex items-center justify-center">
              <Quote className="w-6 h-6 text-[#00338D]" />
            </div>

            {/* Content */}
            <div className="pt-8">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="font-serif text-xl md:text-2xl text-[#00338D] leading-relaxed mb-8">
                  "{t(testimonials[currentIndex].quoteKey)}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00338D] to-[#4B9FE1] flex items-center justify-center text-white font-semibold">
                    {t(testimonials[currentIndex].authorKey).charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {t(testimonials[currentIndex].authorKey)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t(testimonials[currentIndex].titleKey)}, {t(testimonials[currentIndex].companyKey)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-[#00338D]" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-[#00338D] w-8" : "bg-[#4B9FE1]/30 w-2"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 hover:bg-white rounded-lg transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-[#00338D]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
