"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Briefcase, MapPin, Clock, Calendar, Share2, Upload } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { use, useState } from "react"

type Props = {
  params: Promise<{ slug: string }>
}

export default function JobDetailPage({ params }: Props) {
  const { slug } = use(params)
  const job = useQuery(api.jobs.getBySlug, { slug })
  const relatedJobs = useQuery(
    api.jobs.list,
    job ? { category: job.category } : "skip"
  )
  const [shareTooltip, setShareTooltip] = useState("Share this job")

  if (job === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading job details...</p>
      </div>
    )
  }

  if (!job) {
    notFound()
  }

  // Filter related jobs (excluding current job, limit to 3)
  const filteredRelatedJobs = relatedJobs
    ?.filter((j) => j._id !== job._id)
    .slice(0, 3) || []

  // Format salary display based on type
  const formatSalary = () => {
    if (job.salaryType === "HOURLY") {
      if (job.hourlyRateMin && job.hourlyRateMax) {
        return job.hourlyRateMin === job.hourlyRateMax
          ? `£${job.hourlyRateMin.toFixed(2)}/hour`
          : `£${job.hourlyRateMin.toFixed(2)} - £${job.hourlyRateMax.toFixed(2)}/hour`
      }
      if (job.hourlyRateMin) return `£${job.hourlyRateMin.toFixed(2)}/hour`
      if (job.salary) return job.salary
      return "Competitive"
    } else {
      // Annual salary (default)
      if (job.salaryMin && job.salaryMax) {
        return job.salaryMin === job.salaryMax
          ? `£${job.salaryMin.toLocaleString()}`
          : `£${job.salaryMin.toLocaleString()} - £${job.salaryMax.toLocaleString()}`
      }
      if (job.salary) return job.salary
      return "Competitive"
    }
  }

  // Share functionality using Web Share API with fallback to clipboard
  const handleShare = async () => {
    const shareData = {
      title: `${job.title} at ME Recruits`,
      text: `Check out this job opportunity: ${job.title} in ${job.location}`,
      url: window.location.href,
    }

    try {
      // Try Web Share API first (mobile devices)
      if (navigator.share) {
        await navigator.share(shareData)
        setShareTooltip("Shared!")
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setShareTooltip("Link copied!")
      }

      // Reset tooltip after 2 seconds
      setTimeout(() => setShareTooltip("Share this job"), 2000)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error)
        setShareTooltip("Unable to share")
        setTimeout(() => setShareTooltip("Share this job"), 2000)
      }
    }
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/need-a-job/job-vacancies"
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Job Vacancies
            </Link>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {job.type}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {job.category}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-primary-foreground/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="font-semibold">{formatSalary()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  Posted {new Date(job._creationTime).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Job Description */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Job Description</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">About This Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Job Type</p>
                      <p className="font-semibold">{job.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
                      <p className="font-semibold">{job.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-semibold">{job.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {job.salaryType === "HOURLY" ? "Hourly Rate" : "Salary"}
                      </p>
                      <p className="font-semibold text-primary">{formatSalary()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Interested in this role?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Apply now by uploading your CV or get in touch with our team to discuss this opportunity.
                  </p>
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/upload-cv?job_ref=${job.slug}`}>
                      Apply Now
                      <Upload className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{shareTooltip}</span>
                    <Button variant="ghost" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Why ME Recruits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose ME Recruits?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Fast Response</p>
                      <p className="text-muted-foreground">
                        We review all applications within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Expert Guidance</p>
                      <p className="text-muted-foreground">
                        15+ years of recruitment expertise in Kent
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      {filteredRelatedJobs.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Similar Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRelatedJobs.map((relatedJob) => (
                  <Card key={relatedJob._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={relatedJob.type === "PERMANENT" ? "default" : "secondary"}>
                          {relatedJob.type}
                        </Badge>
                        <Badge variant="outline">{relatedJob.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{relatedJob.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {relatedJob.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {relatedJob.description.substring(0, 100)}...
                      </p>
                      <p className="text-sm font-semibold text-primary mb-4">
                        {relatedJob.salaryType === "HOURLY"
                          ? relatedJob.hourlyRateMin && relatedJob.hourlyRateMax
                            ? relatedJob.hourlyRateMin === relatedJob.hourlyRateMax
                              ? `£${relatedJob.hourlyRateMin.toFixed(2)}/hour`
                              : `£${relatedJob.hourlyRateMin.toFixed(2)} - £${relatedJob.hourlyRateMax.toFixed(2)}/hour`
                            : relatedJob.salary || "Competitive"
                          : relatedJob.salaryMin && relatedJob.salaryMax
                            ? relatedJob.salaryMin === relatedJob.salaryMax
                              ? `£${relatedJob.salaryMin.toLocaleString()}`
                              : `£${relatedJob.salaryMin.toLocaleString()} - £${relatedJob.salaryMax.toLocaleString()}`
                            : relatedJob.salary || "Competitive"
                        }
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/need-a-job/job-vacancies/${relatedJob.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Apply?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Take the next step in your career journey with ME Recruits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href={`/upload-cv?job_ref=${job.slug}`}>
                  Apply for This Job
                  <Upload className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                <Link href="/need-a-job/job-vacancies">
                  Browse More Jobs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
