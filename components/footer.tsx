"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Linkedin, Mail, Phone, MessageCircle } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, type FormEvent } from "react"

const footerLinks = {
  services: [
    { label: "Market Entry Strategy", href: "#services" },
    { label: "Business Development", href: "#services" },
    { label: "Government Relations", href: "#services" },
    { label: "Strategic Partnerships", href: "#services" },
    { label: "Investor Facilitation", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Industries", href: "#industries" },
    { label: "Insights", href: "#insights" },
  ],
  contact: [
    { label: "Contact Us", href: "#contact" },
    { label: "Riyadh Office", href: "#contact" },
    { label: "Schedule a Call", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/hayyak-solutions",
    label: "LinkedIn",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/966511047242",
    label: "WhatsApp",
  },
  {
    icon: Mail,
    href: "mailto:info@hayyaksa.com",
    label: "Email",
  },
  {
    icon: Phone,
    href: "tel:+966511047242",
    label: "Phone",
  },
]

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success">("idle")

  // Newsletter is cosmetic for now — prevents default and shows confirmation
  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterStatus("success")
    setNewsletterEmail("")
    setTimeout(() => setNewsletterStatus("idle"), 4000)
  }

  return (
    <footer className="bg-[#00338D] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Fixed: grid-cols-2 md:grid-cols-5 matches the 5 actual column groups */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand — spans 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-rmj25DNHKbxaX098OEXcFYJgEV3ayM.png"
                alt="H&S - Hayyak & Solutions"
                width={120}
                height={48}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              Connecting Opportunities. Creating Growth. Your trusted gateway to
              business success in Saudi Arabia and the GCC.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-b border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Subscribe to Our Newsletter</h4>
              {newsletterStatus === "success" ? (
                <p className="text-sm text-green-300">
                  ✓ Thank you! You&apos;ve been added to our list.
                </p>
              ) : (
                <p className="text-sm text-white/70">
                  Stay updated on Saudi market insights and opportunities.
                </p>
              )}
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#4B9FE1] md:w-64"
              />
              <Button
                type="submit"
                className="bg-[#4B9FE1] hover:bg-[#4B9FE1]/90 flex-shrink-0 px-6"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Hayyak &amp; Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
