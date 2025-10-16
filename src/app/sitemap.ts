import { MetadataRoute } from 'next'
import { ConvexHttpClient } from "convex/browser"
import { api } from "convex/_generated/api"

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

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

  try {
    // Initialize Convex client for server-side usage
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

    // Get ME Recruits tenant
    const tenant = await convex.query(api.tenants.getBySubdomain, { subdomain: "merecruits" })
    if (!tenant) {
      throw new Error("ME Recruits tenant not found")
    }

    // Dynamic job pages
    const jobs = await convex.query(api.jobs.list, { tenantId: tenant._id })

    const jobPages = jobs.map((job) => ({
      url: `${baseUrl}/need-a-job/job-vacancies/${job.slug}`,
      lastModified: new Date(job._creationTime),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))

    // Dynamic news pages
    const articles = await convex.query(api.news.list, { tenantId: tenant._id })

    const newsPages = articles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article._creationTime),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...jobPages, ...newsPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if database is not available
    return staticPages
  }
}
