import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.merecruits.com'

  // Static pages
  const staticPages = [
    '',
    '/about-us',
    '/contact',
    '/need-a-job',
    '/need-a-job/job-vacancies',
    '/need-a-job/our-approach',
    '/need-staff',
    '/meet-the-team',
    '/upload-cv',
    '/news',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic job pages
  const jobs = await prisma.job.findMany({
    where: { status: 'ACTIVE' },
    select: { slug: true, updatedAt: true },
  })

  const jobPages = jobs.map((job) => ({
    url: `${baseUrl}/need-a-job/job-vacancies/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Dynamic news pages
  const articles = await prisma.newsArticle.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const newsPages = articles.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: article.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...jobPages, ...newsPages]
}
