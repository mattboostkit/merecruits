"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, FileText, Users, Mail, Newspaper } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { useTenant } from "@/lib/tenant-context"

export default function AdminDashboard() {
  const { tenantId } = useTenant()

  // Fetch real data from Convex
  const allJobs = useQuery(api.jobs.listAll, { tenantId })
  const cvSubmissions = useQuery(api.cvUploads.listAll, { tenantId })
  const teamMembers = useQuery(api.team.list, { tenantId })
  const contactSubmissions = useQuery(api.contact.listAll, { tenantId })

  // Calculate stats
  const activeJobsCount = allJobs?.filter(job => job.status === "ACTIVE").length ?? 0
  const cvCount = cvSubmissions?.length ?? 0
  const teamCount = teamMembers?.filter(member => member.active).length ?? 0
  const contactCount = contactSubmissions?.length ?? 0
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold">ME Recruits Admin</h1>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link href="/">View Website</Link>
              </Button>
              <Button
                variant="ghost"
                onClick={async () => {
                  await fetch("/api/admin/auth", { method: "DELETE" })
                  window.location.href = "/admin/login"
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeJobsCount}</div>
                <p className="text-xs text-muted-foreground">Currently live</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CV Submissions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cvCount}</div>
                <p className="text-xs text-muted-foreground">Total submissions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teamCount}</div>
                <p className="text-xs text-muted-foreground">Active consultants</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contactCount}</div>
                <p className="text-xs text-muted-foreground">Total received</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="jobs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="cvs">CV Submissions</TabsTrigger>
              <TabsTrigger value="news">News & Insights</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Job Management</CardTitle>
                      <CardDescription>Manage your job postings</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/admin/jobs/new">Add New Job</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Manage all your job postings in one place
                    </p>
                    <Button asChild>
                      <Link href="/admin/jobs">View All Jobs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cvs">
              <Card>
                <CardHeader>
                  <CardTitle>CV Submissions</CardTitle>
                  <CardDescription>Review and manage CV submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Review all CV submissions and applications
                    </p>
                    <Button asChild>
                      <Link href="/admin/cvs">View All CVs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>News & Insights</CardTitle>
                      <CardDescription>Manage blog articles and news posts</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/admin/news/new">Add New Article</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Create and manage blog posts and news articles
                    </p>
                    <Button asChild>
                      <Link href="/admin/news">View All Articles</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Team Management</CardTitle>
                      <CardDescription>Manage team members and consultants</CardDescription>
                    </div>
                    <Button asChild>
                      <Link href="/admin/team/new">Add Team Member</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Manage your team members and consultants
                    </p>
                    <Button asChild>
                      <Link href="/admin/team">View Team</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Requests</CardTitle>
                  <CardDescription>View and respond to contact form submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Review all contact form submissions
                    </p>
                    <Button asChild>
                      <Link href="/admin/contacts">View Contacts</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
