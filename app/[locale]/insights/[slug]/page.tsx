'use client';

import { use } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { insightsData, getInsightBySlug } from '../data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations('insights');
  const locale = useLocale();
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  // Get content object
  const contentData = t.raw(insight.contentKey) as any;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Link href={`/${locale}/insights`} className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
              ← Back to Insights
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
              </span>
              <span className="text-gray-600">{t(insight.readTimeKey)}</span>
              <span className="text-gray-600">{t(insight.dateKey)}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              {t(insight.titleKey)}
            </h1>
            <p className="text-xl text-gray-700">
              {t(insight.subtitleKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <Image
          src={insight.image}
          alt={t(insight.titleKey)}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Executive Summary */}
          {contentData?.executiveSummary && (
            <section className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Executive Summary</h2>
              <p className="text-gray-700 leading-relaxed">
                {contentData.executiveSummary}
              </p>
            </section>
          )}

          {/* Key Insights */}
          {contentData?.keyInsights && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Key Strategic Insights</h2>
              <ul className="space-y-4">
                {contentData.keyInsights.map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-4">
                    <span className="text-blue-600 font-bold">•</span>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Sections */}
          {[1, 2, 3].map((num) => {
            const titleKey = `section${num}Title`;
            const contentKey = `section${num}Content`;
            if (contentData?.[titleKey]) {
              return (
                <section key={num} className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">{contentData[titleKey]}</h2>
                  <p className="text-gray-700 leading-relaxed">{contentData[contentKey]}</p>
                </section>
              );
            }
            return null;
          })}

          {/* Saudi/GCC Relevance */}
          {contentData?.saudiRelevanceTitle && (
            <section className="mb-12 p-6 bg-green-50 rounded-lg border border-green-200">
              <h2 className="text-2xl font-bold mb-4">{contentData.saudiRelevanceTitle}</h2>
              <p className="text-gray-700 leading-relaxed">{contentData.saudiRelevanceContent}</p>
            </section>
          )}

          {/* How We Help */}
          {contentData?.howWeHelpTitle && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">{contentData.howWeHelpTitle}</h2>
              <p className="text-gray-700 leading-relaxed">{contentData.howWeHelpContent}</p>
            </section>
          )}

          {/* Recommendations */}
          {contentData?.recommendations && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Actionable Recommendations</h2>
              <ol className="space-y-4">
                {contentData.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex gap-4">
                    <span className="text-blue-600 font-bold">{idx + 1}.</span>
                    <p className="text-gray-700 leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Conclusion */}
          {contentData?.conclusion && (
            <section className="mb-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
              <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed">{contentData.conclusion}</p>
            </section>
          )}

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-lg text-blue-100 mb-8">{t(insight.ctaKey)}</p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50"
            >
              Schedule a Consultation
            </Link>
          </section>

          {/* Related */}
          <section className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold mb-8">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {insightsData
                .filter((i) => i.id !== insight.id)
                .slice(0, 3)
                .map((rel) => (
                  <Link key={rel.id} href={`/${locale}/insights/${rel.slug}`}>
                    <div className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded mb-3">
                      </span>
                      <h3 className="font-bold hover:text-blue-600 mb-2">
                        {t(rel.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-500">{t(rel.readTimeKey)}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </article>
    </main>
    <Footer />
    </>
  );
}
