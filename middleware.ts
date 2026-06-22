import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

export const config = {
  matcher: [
    // Match all pathnames except:
    // - API routes (api/*)
    // - Static files (_next/*)
    // - Images and assets (*.png, *.jpg, *.svg, etc.)
    // - Public assets (/public/*)
    '/((?!api|_next|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|ttf|woff|woff2)$|images|public|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}