export const insightsData = [
  {
    id: 1,
    slug: 'market-entry-saudi-arabia',
    image: "/images/insights/article1.png",
    titleKey: 'insight1Title',
    subtitleKey: 'insight1Subtitle',
    excerptKey: 'insight1Excerpt',
    dateKey: 'insight1Date',
    readTimeKey: 'insight1ReadTime',
    metaTitleKey: 'insight1MetaTitle',
    metaDescriptionKey: 'insight1MetaDescription',
    ctaKey: 'insight1CTA',
    contentKey: 'insight1Content'
  },
  {
    id: 2,
    slug: 'vision-2030-investment',
     image: "/images/insights/article2.png",
    titleKey: 'insight2Title',
    subtitleKey: 'insight2Subtitle',
    excerptKey: 'insight2Excerpt',
    dateKey: 'insight2Date',
    readTimeKey: 'insight2ReadTime',
    metaTitleKey: 'insight2MetaTitle',
    metaDescriptionKey: 'insight2MetaDescription',
    ctaKey: 'insight2CTA',
    contentKey: 'insight2Content'
  },
  {
    id: 3,
    slug: 'government-relations-ppp',
     image: "/images/insights/article3.png",
    titleKey: 'insight3Title',
    subtitleKey: 'insight3Subtitle',
    excerptKey: 'insight3Excerpt',
    dateKey: 'insight3Date',
    readTimeKey: 'insight3ReadTime',
    metaTitleKey: 'insight3MetaTitle',
    metaDescriptionKey: 'insight3MetaDescription',
    ctaKey: 'insight3CTA',
    contentKey: 'insight3Content'
  },
  {
    id: 4,
    slug: 'gcc-expansion-strategy',
    image: "/images/insights/article4.png",
    titleKey: 'insight4Title',
    subtitleKey: 'insight4Subtitle',
    excerptKey: 'insight4Excerpt',
    dateKey: 'insight4Date',
    readTimeKey: 'insight4ReadTime',
    metaTitleKey: 'insight4MetaTitle',
    metaDescriptionKey: 'insight4MetaDescription',
    ctaKey: 'insight4CTA',
    contentKey: 'insight4Content'
  }
];

export function getInsightBySlug(slug: string) {
  return insightsData.find(insight => insight.slug === slug);
}