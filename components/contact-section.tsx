"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useMemo, type ChangeEvent, type FormEvent } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, MessageCircle, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { getCountries, getCountryCallingCode } from "react-phone-number-input"
import ReactCountryFlag from "react-country-flag"


interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

const EMPTY_FORM: ContactFormData = {
  name: "",
  company: "",
  service: "",
  email: "",
  phone: "",
  message: "",
}

export function ContactSection() {
  const t = useTranslations()
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM)
 const [selectedCountry, setSelectedCountry] = useState("SA")
  const [showCountryList, setShowCountryList] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const countries = useMemo(() => getCountries() as string[], [])
  
  const displayNames = useMemo(
    () => new Intl.DisplayNames([locale], { type: "region" }),
    [locale]
  )
  
  const filteredCountries = useMemo(() => {
    return countrySearch
      ? countries.filter((country) => {
          const name = displayNames.of(country)
          const code = getCountryCallingCode(country as any)
          return (
            name?.toLowerCase().includes(countrySearch.toLowerCase()) ||
            code?.includes(countrySearch.toLowerCase())
          )
        })
      : countries
  }, [countries, countrySearch, displayNames])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    const countryCode = getCountryCallingCode(selectedCountry as any)
    const fullPhoneNumber = `+${countryCode}${formData.phone.replace(/\D/g, "")}`

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        setFormData(EMPTY_FORM)
        setSelectedCountry("SA")
      } else {
        setSubmitStatus("error")
        setErrorMessage(
          result.error || t("contact.errorDefault")
        )
      }
    } catch {
      setSubmitStatus("error")
      setErrorMessage(t("contact.networkError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (submitStatus !== "idle") setSubmitStatus("idle")
  }

  return (
    <section id="contact" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
              {t("contact.sectionLabel")}
            </span>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance ${ locale === "ar" ? "text-right" : "text-left" }`} >
                {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t("contact.subtitle")}
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#DCEBFA] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00338D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.email")}</h3>
                  <a href="mailto:info@hayyaksa.com" className="text-[#4B9FE1] hover:text-[#00338D]" dir="ltr">
                    {t("contact.emailAddress")}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#DCEBFA] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#00338D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.phone")}</h3>
                  <a href="tel:+966511047242" className="text-[#4B9FE1] hover:text-[#00338D]" dir="ltr">
                    {t("contact.phoneNumber")}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#DCEBFA] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#00338D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.whatsapp")}</h3>
                  <a href="https://wa.me/966511047242" target="_blank" rel="noopener noreferrer" className="text-[#4B9FE1] hover:text-[#00338D]" dir="ltr">
                    {t("contact.phoneNumber")}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#DCEBFA] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#00338D]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t("contact.location")}</h3>
                  <p className="text-muted-foreground">{t("contact.locationAddress")}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">{t("contact.socialMedia")}</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/hayyak-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#00338D] text-white flex items-center justify-center hover:bg-[#002266] transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/966511047242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#00338D] text-white flex items-center justify-center hover:bg-[#002266] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="mailto:info@hayyaksa.com"
                  className="w-10 h-10 rounded-lg bg-[#00338D] text-white flex items-center justify-center hover:bg-[#002266] transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-[#F8F9FB] rounded-2xl p-8 md:p-10">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                {t("contact.formTitle")}
              </h3>
              <p className="text-muted-foreground mb-8">{t("contact.formSubtitle")}</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.nameLabel")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("contact.namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.emailLabel")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                {/* Phone with Country Selector */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.phoneLabel")}
                  </label>
                  <div
  className="flex gap-3 items-stretch"
  style={{
  flexDirection: locale === "ar" ? "row" : "row",
}}
>
                    {/* Country Selector Button */}
                    <div className="relative
                    ">
                      <button
                        type="button"
                        onClick={() => setShowCountryList(!showCountryList)}
                        className="h-9 px-3 rounded-md border border-border bg-white flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                      >
                        <ReactCountryFlag
                          countryCode={selectedCountry}
                          svg={true}
                          style={{ width: "1.5rem", height: "1.5rem" }}
                        />
                      </button>

                      {/* Country Dropdown List */}
                      {showCountryList && (
                        <div className="absolute top-full left-0 mt-1 z-50 w-64 max-h-64 overflow-y-auto rounded-md border border-border bg-white shadow-lg">
                          <input
                            type="text"
                            placeholder={t("contact.countrySearch")}
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="sticky top-0 w-full px-3 py-2 border-b border-border text-sm focus:outline-none"
                          />
                          <div>
                            {filteredCountries.map((country) => (
                              <button
                                key={country}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country)
                                  setShowCountryList(false)
                                  setCountrySearch("")
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted transition-colors text-left text-sm"
                              >
                                <ReactCountryFlag
                                  countryCode={country}
                                  svg={true}
                                  style={{ width: "1.5rem", height: "1.5rem" }}
                                />
                                <span className="flex-1">{displayNames.of(country)}</span>
                                <span className="text-xs text-muted-foreground">+{getCountryCallingCode(country as any)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Input */}
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t("contact.phonePlaceholder")}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      dir="ltr"
                       className="flex-1"
  style={{
    direction: "ltr",
    textAlign: locale === "ar" ? "right" : "left",
    unicodeBidi: "plaintext",
  }}
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.companyLabel")}
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={t("contact.companyPlaceholder")}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.serviceLabel")}
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={(e) => handleChange(e as any)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#00338D]"
                  >
                    <option value="">{t("contact.serviceSelect")}</option>
                    <option value="market-entry">{t("services.service1Title")}</option>
                    <option value="business-dev">{t("services.service2Title")}</option>
                    <option value="gov-relations">{t("services.service3Title")}</option>
                    <option value="partnerships">{t("services.service4Title")}</option>
                    <option value="intelligence">{t("services.service5Title")}</option>
                    <option value="representation">{t("services.service6Title")}</option>
                    <option value="investor">{t("services.service7Title")}</option>
                    <option value="expansion">{t("services.service8Title")}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-[#00338D] resize-none"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">{t("contact.successTitle")}</h4>
                      <p className="text-sm text-green-800">{t("contact.successMessage")}</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-900">{t("contact.errorTitle")}</h4>
                      <p className="text-sm text-red-800">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-[#00338D] hover:bg-[#002266] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
>
  {isSubmitting ? (
    <>
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      {t("contact.submitting")}
    </>
  ) : (
    <>
      {t("contact.submitButton")}
      <Send
        className="w-4 h-4"
        style={
          locale === "ar"
            ? { transform: "scaleX(-1)" }
            : undefined
        }
      />
    </>
  )}
</Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
