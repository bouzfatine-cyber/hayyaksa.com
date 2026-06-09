# hayyaksa.com — Fix Package

## What's in this zip

10 files that fix every build error, the contact form failure, and all broken links.
Copy them into your project root and push to Vercel.

## Step 1 — Copy files into your project

Merge this folder structure directly into your project root:

```
tsconfig.json          → project root  (NEW — was missing, caused 15 build errors)
next.config.ts         → project root  (NEW — was missing, needed for next/image)
postcss.config.mjs     → project root  (NEW — was missing, needed for Tailwind v4)
lib/utils.ts           → lib/          (NEW — was missing, caused shadcn/ui failures)
hooks/use-mobile.ts    → hooks/        (NEW — was missing, caused sidebar TS error)
hooks/use-toast.ts     → hooks/        (NEW — was missing, caused toaster TS error)
app/layout.tsx                         (FIXED — metadata indent, font display:swap)
app/api/contact/route.ts               (FIXED — maxDuration 30, Promise.all, timeouts)
components/contact-section.tsx         (FIXED — LinkedIn target=_blank)
components/footer.tsx                  (FIXED — social links target=_blank, newsletter onSubmit, grid fix)
```

## Step 2 — Delete this file from your project

```
components/index.html   ← DELETE IT (stray placeholder, serves nothing)
```

## Step 3 — Add env vars to Vercel dashboard

Go to: Vercel → your project → Settings → Environment Variables

Add ALL of these (they are NOT read from .env.local on Vercel):

| Key                | Value                    |
|--------------------|--------------------------|
| SMTP_HOST          | mail.privateemail.com    |
| SMTP_PORT          | 587                      |
| SMTP_USER          | info@hayyaksa.com        |
| SMTP_PASS          | Solutions2026@           |
| CONTACT_TO_EMAIL   | info@hayyaksa.com        |

Set scope to: Production + Preview

## Step 4 — Push and deploy

```bash
git add -A
git commit -m "fix: build errors, contact form SMTP, broken links"
git push
```

Vercel will auto-deploy. The contact form will work on the deployed URL.

## What was broken and why

| Problem | Root cause |
|---------|-----------|
| 15 "Module not found" build errors | tsconfig.json missing → @/ alias didn't resolve |
| contact form: "Unable to send message" | Two sequential sendMail calls hit Vercel's 10s limit; no maxDuration set |
| shadcn/ui components failing | lib/utils.ts missing |
| Sidebar TS error | hooks/use-mobile.ts missing |
| Toaster TS error | hooks/use-toast.ts missing |
| LinkedIn opens in same tab | Missing target="_blank" on contact section LinkedIn link |
| Footer social links open in same tab | Missing target="_blank" on all footer social anchors |
| Newsletter Subscribe reloads page | No onSubmit handler on footer newsletter form |
| next/image errors on Vercel blob URLs | next.config.ts missing (no remotePatterns) |
| Tailwind CSS not processing | postcss.config.mjs missing |
