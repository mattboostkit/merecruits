"use client"

import { useState } from "react"
import Link from "next/link"
import { useQuery, useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import { useTenant } from "@/lib/tenant-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreVertical, Plus, Search, Eye, Edit, Trash, XCircle, CheckCircle } from "lucide-react"
import { Id } from "convex/_generated/dataModel"

export default function AdminJobsPage() {
  const { tenantId } = useTenant()
  const [searchTerm, setSearchTerm] = useState("")
  const jobs = useQuery(api.jobs.listAll, { tenantId })
  const closeJob = useMutation(api.jobs.close)
  const reopenJob = useMutation(api.jobs.reopen)
  const deleteJob = useMutation(api.jobs.remove)

  const filteredJobs = jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCloseJob = async (jobId: Id<"jobs">) => {
    if (confirm("Are you sure you want to close this job?")) {
      await closeJob({ id: jobId })
    }
  }

  const handleReopenJob = async (jobId: Id<"jobs">) => {
    await reopenJob({ id: jobId })
  }

  const handleDeleteJob = async (jobId: Id<"jobs">) => {
    if (confirm("Are you sure you want to permanently delete this job? This action cannot be undone.")) {
      await deleteJob({ id: jobId })
    }
  }

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
              <h1 className="text-2xl font-display font-bold">Job Management</h1>
            </div>
            <Button asChild>
              <Link href="/admin/jobs/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Job
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Jobs</CardTitle>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!jobs ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading jobs...</p>
                </div>
              ) : filteredJobs && filteredJobs.length > 0 ? (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Consultant</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job._id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{job.type}</Badge>
                          </TableCell>
                          <TableCell>
                            {job.status === "ACTIVE" && (
                              <Badge className="bg-green-500">Active</Badge>
                            )}
                            {job.status === "CLOSED" && (
                              <Badge className="bg-red-500">Closed</Badge>
                            )}
                            {job.status === "DRAFT" && (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>{job.consultant || "-"}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/need-a-job/job-vacancies/${job.slug}`} target="_blank">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View on Site
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/jobs/edit/${job._id}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                {job.status === "ACTIVE" && (
                                  <DropdownMenuItem onClick={() => handleCloseJob(job._id)}>
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Close Job
                                  </DropdownMenuItem>
                                )}
                                {job.status === "CLOSED" && (
                                  <DropdownMenuItem onClick={() => handleReopenJob(job._id)}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Reopen Job
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => handleDeleteJob(job._id)}
                                  className="text-destructive"
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No jobs found</p>
                  <Button asChild>
                    <Link href="/admin/jobs/new">Create Your First Job</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
