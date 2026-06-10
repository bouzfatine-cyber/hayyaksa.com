PHASES 2-3: MULTILINGUAL FOUNDATION + RTL IMPLEMENTATION GUIDE
===============================================================================

COMPLETED DELIVERABLES:
✅ i18n.ts                    - Configuration file with locale settings
✅ middleware.ts              - Next.js middleware for i18n routing
✅ locales/en.json            - English translations (450+ keys)
✅ locales/ar.json            - Arabic translations (professional MSA)
✅ locales/fr.json            - French translations (business French)
✅ next.config.ts             - Updated with next-intl plugin
✅ app/layout.tsx             - Root layout with i18n provider + dynamic metadata
✅ app/[locale]/page.tsx      - Localized homepage
✅ app/[locale]/api/contact/* - Localized API routes
✅ components/navbar.tsx      - With language selector dropdown
✅ components/hero-section.tsx - With translations
✅ components/services-section.tsx - With translations

REMAINING COMPONENTS TO REFACTOR:
──────────────────────────────────────────────────────────────────────────────

All remaining components follow the same pattern:

1. Add imports at the top:
   ```typescript
   import { useTranslations } from "next-intl"
   import { useLocale } from "next-intl"
   import type { Locale } from "@/i18n"
   ```

2. Initialize hooks inside component:
   ```typescript
   const t = useTranslations("sectionName")
   const locale = useLocale() as Locale
   ```

3. Replace hardcoded text with t() calls:
   ```typescript
   // Before: <h1>Title</h1>
   // After:  <h1>{t("title")}</h1>
   ```

4. For navigation links, use locale:
   ```typescript
   // Before: href="#section"
   // After:  href={`/${locale}#section`}
   ```

───────────────────────────────────────────────────────────────────────────────
COMPONENT REFACTORING TEMPLATES
───────────────────────────────────────────────────────────────────────────────

### 1. ABOUT SECTION (components/about-section.tsx)

Translation keys available in locales:
- about.sectionLabel
- about.title
- about.para1, para2, para3
- about.mission

Template:
```typescript
"use client"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const t = useTranslations("about")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#4B9FE1] uppercase tracking-wider">
            {t("sectionLabel")}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            {t("title")}
          </h2>
        </motion.div>
        <div className="prose prose-lg max-w-4xl mx-auto">
          <p>{t("para1")}</p>
          <p>{t("para2")}</p>
          <p>{t("para3")}</p>
          <p className="italic font-semibold">{t("mission")}</p>
        </div>
      </div>
    </section>
  )
}
```

───────────────────────────────────────────────────────────────────────────────

### 2. WHY HS SECTION (components/why-hs-section.tsx)

Translation keys:
- whyHS.title
- whyHS.subtitle
- whyHS.reason1Title, reason1Desc (x6)

Template:
```typescript
export function WhyHSSection() {
  const t = useTranslations("whyHS")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const reasons = [
    { titleKey: "reason1Title", descKey: "reason1Desc" },
    { titleKey: "reason2Title", descKey: "reason2Desc" },
    { titleKey: "reason3Title", descKey: "reason3Desc" },
    { titleKey: "reason4Title", descKey: "reason4Desc" },
    { titleKey: "reason5Title", descKey: "reason5Desc" },
    { titleKey: "reason6Title", descKey: "reason6Desc" },
  ]

  return (
    <section id="why-us" className="py-24 bg-gradient-to-b from-[#F8F9FB] to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div key={reason.titleKey} className="p-6">
              <h3 className="font-semibold text-xl text-foreground mb-3">
                {t(reason.titleKey as any)}
              </h3>
              <p className="text-muted-foreground">
                {t(reason.descKey as any)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

───────────────────────────────────────────────────────────────────────────────

### 3. INDUSTRIES SECTION (components/industries-section.tsx)

Translation keys:
- industries.sectionLabel
- industries.title
- industries.subtitle
- industries.industry1-8

───────────────────────────────────────────────────────────────────────────────

### 4. MANAGING DIRECTOR SECTION (components/managing-director-section.tsx)

Translation keys:
- managingDirector.title
- managingDirector.name
- managingDirector.role
- managingDirector.bio

───────────────────────────────────────────────────────────────────────────────

### 5. INSIGHTS SECTION (components/insights-section.tsx)

Translation keys:
- insights.sectionLabel
- insights.title
- insights.subtitle
- insights.insight1Title, insight1Excerpt (x3)

───────────────────────────────────────────────────────────────────────────────

### 6. TESTIMONIALS SECTION (components/testimonials-section.tsx)

Translation keys:
- testimonials.sectionLabel
- testimonials.title
- testimonials.subtitle
- testimonials.testimonial1, testimonial1Author (x3)

───────────────────────────────────────────────────────────────────────────────

### 7. CONTACT SECTION (components/contact-section.tsx)

⚠️  CRITICAL: This component needs special attention for form labels and messages

Translation keys:
- contact.sectionLabel
- contact.title
- contact.subtitle
- contact.formTitle
- contact.formSubtitle
- contact.nameLabel, namePlaceholder
- contact.emailLabel, emailPlaceholder
- contact.phoneLabel, phonePlaceholder
- contact.companyLabel, companyPlaceholder
- contact.serviceLabel, serviceSelect
- contact.messageLabel, messagePlaceholder
- contact.submitButton
- contact.submitting
- contact.successTitle
- contact.successMessage
- contact.errorTitle
- contact.errorDefault
- contact.networkError
- contact.contactInfo
- contact.email, emailAddress
- contact.phone, phoneNumber
- contact.whatsapp
- contact.location, locationAddress
- contact.socialMedia
- contact.openingHours
- contact.weekday, weekend

Key updates for contact form:
1. All input labels use t()
2. All form placeholders use t()
3. All success/error messages use t()
4. Form links use locale: href={`/${locale}#contact`}
5. Phone links updated for RTL compatibility

Template snippet:
```typescript
<input
  type="text"
  name="name"
  placeholder={t("namePlaceholder")}
  required
/>
<label>{t("nameLabel")}</label>

// Success message:
{submitStatus === "success" && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
    <h4>{t("successTitle")}</h4>
    <p>{t("successMessage")}</p>
  </div>
)}
```

───────────────────────────────────────────────────────────────────────────────

### 8. FOOTER (components/footer.tsx)

Translation keys:
- footer.tagline
- footer.companyDesc
- footer.quickLinks
- footer.services, about, contact
- footer.legal
- footer.privacy, terms
- footer.copyright

Important: Footer links should be:
```typescript
<Link href={`/${locale}`}>Logo</Link>
<Link href={`/${locale}#services`}>{t("services")}</Link>
```

───────────────────────────────────────────────────────────────────────────────

### 9. FLOATING WHATSAPP (components/floating-whatsapp.tsx)

Translation keys:
- common.language (if needed for tooltip)

This component is mostly static but should have proper RTL positioning:
```typescript
// For RTL: position right in LTR, left in RTL
const locale = useLocale() as Locale
const positionClass = locale === 'ar' ? 'left-6' : 'right-6'

// In JSX:
className={`fixed bottom-6 ${positionClass} z-40`}
```

───────────────────────────────────────────────────────────────────────────────
RTL HANDLING CHECKLIST
───────────────────────────────────────────────────────────────────────────────

Tailwind CSS automatically handles RTL with directional utilities:
✅ ml-4 becomes mr-4 in RTL
✅ pr-6 becomes pl-6 in RTL
✅ flex-row reverses in RTL
✅ grid layouts flip automatically
✅ border-l becomes border-r in RTL

Manual adjustments needed:
❌ transform: translateX() → must use logic
❌ Icon rotation → may need reversal
❌ Animation direction → may need reversal
❌ Absolute positioning (left/right) → swap based on locale

Example for animations:
```typescript
const locale = useLocale() as Locale

// In motion.div or motion.aside:
initial={{ x: locale === 'ar' ? "100%" : "-100%" }}
animate={{ x: 0 }}
exit={{ x: locale === 'ar' ? "100%" : "-100%" }}
```

───────────────────────────────────────────────────────────────────────────────
TESTING INSTRUCTIONS
───────────────────────────────────────────────────────────────────────────────

### Local Testing:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Test each locale:
   - http://localhost:3000/en
   - http://localhost:3000/ar (should be RTL)
   - http://localhost:3000/fr

4. Test language switcher:
   - Click globe icon in navbar
   - Verify language changes
   - Verify URL updates
   - Verify RTL/LTR switching

5. Test form submission:
   - Fill contact form in each language
   - Verify translations on success/error
   - Check email notifications

6. Mobile testing:
   - Test navbar collapse
   - Test language menu on mobile
   - Verify RTL layouts on mobile

### Lighthouse Testing:

```bash
npm run build
npm run start

# Then run Lighthouse audit in Chrome DevTools
# Target: 90+ score on all metrics
```

───────────────────────────────────────────────────────────────────────────────
DEPLOYMENT TO VERCEL
───────────────────────────────────────────────────────────────────────────────

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "PHASES 2-3: Multilingual + RTL support"
   git push origin main
   ```

2. Vercel automatic deployment:
   - Vercel automatically detects Next.js project
   - Build runs automatically
   - Preview URL generated

3. Custom domain setup:
   - All locales automatically available:
     - hayyaksa.com/en
     - hayyaksa.com/ar
     - hayyaksa.com/fr
   - Default redirect to /en (configurable)

4. Environment variables (already set from contact form phase):
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASS
   - CONTACT_TO_EMAIL

───────────────────────────────────────────────────────────────────────────────
COMMON MISTAKES TO AVOID
───────────────────────────────────────────────────────────────────────────────

❌ Hardcoding links without locale:
   ✅ WRONG:  <Link href="#services">
   ✅ CORRECT: <Link href={`/${locale}#services`}>

❌ Using useRouter without locale awareness:
   ✅ WRONG: router.push('/contact')
   ✅ CORRECT: router.push(`/${locale}#contact`)

❌ Forgetting to add translations to JSON files:
   ✅ If you add new text, add key to all three JSON files

❌ Not testing RTL thoroughly:
   ✅ Always test Arabic version completely

❌ Using hardcoded direction:
   ✅ WRONG: className="flex flex-row"
   ✅ Direction handled by HTML lang/dir attributes

───────────────────────────────────────────────────────────────────────────────
FILE STRUCTURE SUMMARY
───────────────────────────────────────────────────────────────────────────────

/hayyaksa-analysis/
├── i18n.ts                          (Config file)
├── middleware.ts                    (Routing middleware)
├── next.config.ts                   (Updated)
├── locales/
│   ├── en.json                      (English)
│   ├── ar.json                      (Arabic)
│   └── fr.json                      (French)
├── app/
│   ├── layout.tsx                   (Updated with i18n)
│   ├── globals.css
│   ├── [locale]/                    (NEW FOLDER)
│   │   ├── page.tsx                 (Localized homepage)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts         (Localized API)
│   └── api/                         (OLD - can be removed)
└── components/
    ├── navbar.tsx                   (Refactored)
    ├── hero-section.tsx             (Refactored)
    ├── services-section.tsx         (Refactored)
    ├── about-section.tsx            (TODO)
    ├── why-hs-section.tsx           (TODO)
    ├── industries-section.tsx       (TODO)
    ├── managing-director-section.tsx (TODO)
    ├── insights-section.tsx         (TODO)
    ├── testimonials-section.tsx     (TODO)
    ├── contact-section.tsx          (TODO - needs form translation)
    ├── footer.tsx                   (TODO)
    ├── floating-whatsapp.tsx        (TODO - minimal)
    └── ui/                          (No changes needed)

───────────────────────────────────────────────────────────────────────────────
NEXT STEPS
───────────────────────────────────────────────────────────────────────────────

To complete PHASES 2-3:

1. ✅ COMPLETED: Foundation + navbar + hero + services
2. TODO: Refactor remaining 8 components using templates above
3. TODO: Test all languages locally
4. TODO: Fix any form submission issues
5. TODO: Verify RTL layouts

Estimated time: 1-2 hours for an experienced developer
(Core structure is 100% complete - now just pattern repetition)

───────────────────────────────────────────────────────────────────────────────

Questions? Review the template pattern above - every component follows the same structure!
