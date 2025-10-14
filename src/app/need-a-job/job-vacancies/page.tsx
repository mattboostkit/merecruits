"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Briefcase, MapPin, Search } from "lucide-react"

// This will be replaced with actual API call
const mockJobs = [
  {
    id: "1",
    title: "Marketing Manager",
    slug: "marketing-manager-maidstone",
    location: "Maidstone",
    description: "Leading marketing agency seeks experienced Marketing Manager to oversee campaigns, manage team and drive growth. Excellent opportunity for career progression.",
    salary: "£35,000 - £45,000",
    type: "PERMANENT",
    category: "Marketing",
    status: "ACTIVE",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Legal Secretary",
    slug: "legal-secretary-tunbridge-wells",
    location: "Tunbridge Wells",
    description: "Well-established law firm requires experienced Legal Secretary to support busy litigation department. Competitive salary and benefits package.",
    salary: "£26,000 - £32,000",
    type: "PERMANENT",
    category: "Legal",
    status: "ACTIVE",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Office Administrator",
    slug: "office-administrator-medway",
    location: "Medway",
    description: "Growing SME seeks organised Office Administrator to manage daily operations, coordinate meetings and provide administrative support.",
    salary: "£24,000 - £28,000",
    type: "PERMANENT",
    category: "Admin",
    status: "ACTIVE",
    featured: false,
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Temporary Receptionist",
    slug: "temporary-receptionist-maidstone",
    location: "Maidstone",
    description: "Immediate temporary receptionist role for 3 months to cover maternity leave. Professional office environment with potential for extension.",
    salary: "£12 - £14 per hour",
    type: "TEMPORARY",
    category: "Admin",
    status: "ACTIVE",
    featured: false,
    createdAt: new Date(),
  },
]

export default function JobVacanciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)

  useEffect(() => {
    let filtered = mockJobs

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((job) => job.location === locationFilter)
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((job) => job.type === typeFilter)
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((job) => job.category === categoryFilter)
    }

    setFilteredJobs(filtered)
  }, [searchTerm, locationFilter, typeFilter, categoryFilter])

  const locations = ["Maidstone", "Medway", "Tunbridge Wells", "Dartford", "West Malling"]
  const categories = ["Marketing", "Legal", "Admin", "Operations", "Finance", "IT", "HR"]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Job Vacancies
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Browse {filteredJobs.length} {filteredJobs.length === 1 ? "opportunity" : "opportunities"} across Kent
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-slate-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
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
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
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

      {/* Job Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={job.type === "PERMANENT" ? "default" : "secondary"}>
                          {job.type}
                        </Badge>
                        <Badge variant="outline">{job.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {job.description}
                      </p>
                      {job.salary && (
                        <p className="text-sm font-semibold text-primary mt-3">
                          {job.salary}
                        </p>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link href={`/need-a-job/job-vacancies/${job.slug}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
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
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-xl mb-6 text-primary-foreground/90">
                Upload your CV and we&apos;ll match you with suitable opportunities as they arise
              </p>
              <Button asChild size="lg" variant="secondary">
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
