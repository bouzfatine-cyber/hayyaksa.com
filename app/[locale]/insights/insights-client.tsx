'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { insightsData } from './data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function InsightsClient() {
  const t = useTranslations('insights');
  const locale = useLocale();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
      {/* Hero Section */}
     <section>
        <div className="container mx-auto px-4 flex flex-col items-center text-center">

  {/* TEXT FIRST */}
  <div className="max-w-3xl mb-10">
    <p className="text-sm font-semibold text-gray-500 uppercase mb-4">
      {t('sectionLabel')}
    </p>

    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
      {t('title')}
    </h1>

    <p className="text-lg text-gray-600">
      {t('subtitle')}
    </p>
  </div>

  {/* IMAGE BELOW */}
  <div className="w-full max-w-5xl">
    <img
      src="/images/insights/perspectives.png"
      alt="Insights"
      className="w-full h-auto rounded-xl object-cover"
    />
  </div>
</div>
      </section>

      {/* Insights Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {insightsData.map((insight) => (
              <Link
                key={insight.id}
                href={`/${locale}/insights/${insight.slug}`}
              >
                <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    </span>
                    <span className="text-sm text-gray-500">
                      {t(insight.readTimeKey)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    {t(insight.titleKey)}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {t(insight.excerptKey)}
                  </p>
                  <div className="flex justify-between items-center">
                    <time className="text-sm text-gray-500">
                      {t(insight.dateKey)}
                    </time>
                    <span
  className="text-blue-600 font-semibold inline-flex items-center gap-1"
  dir="ltr"
>
  {locale === "ar" ? (
    <>
      <span>←</span>
      <span>{t("readArticle")}</span>
    </>
  ) : (
    <>
      <span>{t("readArticle")}</span>
      <span>→</span>
    </>
  )}
</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
