"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { useTenant } from "@/lib/tenant-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Download, Mail, Phone, ExternalLink } from "lucide-react"
import { format } from "date-fns"

export default function AdminCVsPage() {
  const { tenantId } = useTenant()
  const [searchTerm, setSearchTerm] = useState("")
  const cvSubmissions = useQuery(api.cvUploads.listAll, { tenantId })

  const filteredCVs = cvSubmissions?.filter((cv) =>
    `${cv.firstName} ${cv.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon">
                <Link href="/admin">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-display font-bold">CV Submissions</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All CV Submissions</CardTitle>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search CVs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!cvSubmissions ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading CV submissions...</p>
                </div>
              ) : filteredCVs && filteredCVs.length > 0 ? (
                <div className="space-y-4">
                  {filteredCVs.map((cv) => (
                    <Card key={cv._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {/* Candidate Info */}
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {cv.firstName} {cv.lastName}
                            </h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Mail className="h-3 w-3" />
                                <a href={`mailto:${cv.email}`} className="hover:text-primary">
                                  {cv.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                <a href={`tel:${cv.phone}`} className="hover:text-primary">
                                  {cv.phone}
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Job Applied For */}
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Applied For</p>
                            {"jobTitle" in cv && cv.jobTitle ? (
                              <div>
                                <p className="font-medium">{cv.jobTitle}</p>
                                {"jobSlug" in cv && cv.jobSlug && (
                                  <Link
                                    href={`/need-a-job/job-vacancies/${cv.jobSlug}`}
                                    target="_blank"
                                    className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                                  >
                                    View Job <ExternalLink className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            ) : (
                              <Badge variant="secondary">General Application</Badge>
                            )}
                          </div>

                          {/* Submission Date */}
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-2">Submitted</p>
                            <p className="text-sm">
                              {format(new Date(cv._creationTime), "MMM d, yyyy")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(cv._creationTime), "h:mm a")}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Button asChild size="sm" className="w-full">
                              <a href={cv.fileUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4 mr-2" />
                                Download CV
                              </a>
                            </Button>
                            <Button asChild size="sm" variant="outline" className="w-full">
                              <a href={`mailto:${cv.email}`}>
                                <Mail className="h-4 w-4 mr-2" />
                                Email Candidate
                              </a>
                            </Button>
                          </div>
                        </div>

                        {/* AI Parsed Data */}
                        {cv.aiParsed && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium text-muted-foreground mb-3">AI Analysis</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">Summary</p>
                                <p className="text-sm">{cv.aiParsed.summary}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Experience: {cv.aiParsed.yearsOfExperience} years
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {cv.aiParsed.skills.slice(0, 6).map((skill, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {cv.aiParsed.skills.length > 6 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{cv.aiParsed.skills.length - 6} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Cover Letter */}
                        {cv.message && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm font-medium text-muted-foreground mb-2">Cover Letter</p>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {cv.message}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No CV submissions yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
