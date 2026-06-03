import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WhyHSSection } from "@/components/why-hs-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { IndustriesSection } from "@/components/industries-section"
import { ManagingDirectorSection } from "@/components/managing-director-section"
import { InsightsSection } from "@/components/insights-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

export default function HSLandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyHSSection />
      <ServicesSection />
      <AboutSection />
      <IndustriesSection />
      <ManagingDirectorSection />
      <InsightsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  )
}
