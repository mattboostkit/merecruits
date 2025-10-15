"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Briefcase, Search, User } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"

export default function JobVacanciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Fetch jobs from Convex with filters
  const jobs = useQuery(api.jobs.list, {
    search: searchTerm || undefined,
    location: locationFilter !== "all" ? locationFilter : undefined,
    type: typeFilter !== "all" ? typeFilter : undefined,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
  })

  const locations = ["Maidstone", "Medway", "Tunbridge Wells", "Dartford", "West Malling", "Kings Hill"]
  const categories = [
    "Marketing / PR / Events",
    "Legal",
    "Admin / Secretarial / Office Support",
    "Sales & Account Management",
    "Trades & Services",
    "HR & Recruitment",
    "Finance & Accountancy"
  ]

  const filteredJobs = jobs || []

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Job Vacancies
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Browse {filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"} across Kent
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="PERMANENT">Permanent</SelectItem>
                  <SelectItem value="TEMPORARY">Temporary</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(searchTerm || locationFilter !== "all" || typeFilter !== "all" || categoryFilter !== "all") && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchTerm("")}>
                    Search: {searchTerm} ×
                  </Badge>
                )}
                {locationFilter !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setLocationFilter("all")}>
                    Location: {locationFilter} ×
                  </Badge>
                )}
                {typeFilter !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setTypeFilter("all")}>
                    Type: {typeFilter} ×
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setCategoryFilter("all")}>
                    Category: {categoryFilter} ×
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setLocationFilter("all")
                    setTypeFilter("all")
                    setCategoryFilter("all")
                  }}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Listings Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {jobs === undefined ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Loading jobs...</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job._id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                    <CardContent className="p-6">
                      {/* Job Title */}
                      <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>

                      {/* Job Details Grid */}
                      <div className="space-y-3 mb-6">
                        {/* Sector */}
                        <div className="flex items-start gap-2 text-sm">
                          <Briefcase className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="text-muted-foreground font-medium">Sector:</span>
                            <p className="text-foreground">{job.category}</p>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-start gap-2 text-sm">
                          <svg className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="flex-1">
                            <span className="text-muted-foreground font-medium">Location:</span>
                            <p className="text-foreground">{job.location}</p>
                          </div>
                        </div>

                        {/* Salary */}
                        <div className="flex items-start gap-2 text-sm">
                          <svg className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="flex-1">
                            <span className="text-muted-foreground font-medium">
                              {job.salaryType === "HOURLY" ? "Hourly Rate:" : "Salary:"}
                            </span>
                            <p className="text-foreground font-semibold">
                              {job.salaryType === "HOURLY"
                                ? job.hourlyRateMin && job.hourlyRateMax
                                  ? job.hourlyRateMin === job.hourlyRateMax
                                    ? `£${job.hourlyRateMin.toFixed(2)}/hour`
                                    : `£${job.hourlyRateMin.toFixed(2)} - £${job.hourlyRateMax.toFixed(2)}/hour`
                                  : job.salary || "Competitive"
                                : job.salaryMin && job.salaryMax
                                  ? job.salaryMin === job.salaryMax
                                    ? `£${job.salaryMin.toLocaleString()}`
                                    : `£${job.salaryMin.toLocaleString()} - £${job.salaryMax.toLocaleString()}`
                                  : job.salary || "Competitive"
                              }
                            </p>
                          </div>
                        </div>

                        {/* Consultant */}
                        {job.consultant && (
                          <div className="flex items-start gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="text-muted-foreground font-medium">Consultant:</span>
                              <p className="text-foreground">{job.consultant}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Read More Button */}
                      <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Link href={`/need-a-job/job-vacancies/${job.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border-2 border-dashed">
                <Briefcase className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setLocationFilter("all")
                    setTypeFilter("all")
                    setCategoryFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0 shadow-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-xl mb-6 text-primary-foreground/90">
                Upload your CV and we&apos;ll match you with suitable opportunities as they arise
              </p>
              <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link href="/upload-cv">
                  Upload Your CV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
