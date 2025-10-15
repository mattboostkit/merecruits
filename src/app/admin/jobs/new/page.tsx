"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"

export default function NewJobPage() {
  const router = useRouter()
  const createJob = useMutation(api.jobs.create)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    salaryMin: "",
    salaryMax: "",
    type: "PERMANENT" as "PERMANENT" | "TEMPORARY" | "CONTRACT",
    category: "",
    consultant: "",
    status: "ACTIVE" as "ACTIVE" | "DRAFT" | "CLOSED",
    featured: false,
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
  const consultants = ["Helen Barham", "Isobel Colman", "Melissa Staveley", "Ellie Waterman"]

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const slug = generateSlug(`${formData.title}-${formData.location}`)

      await createJob({
        title: formData.title,
        slug: slug,
        location: formData.location,
        description: formData.description,
        salary: formData.salary || undefined,
        salaryMin: formData.salaryMin ? Number(formData.salaryMin) : undefined,
        salaryMax: formData.salaryMax ? Number(formData.salaryMax) : undefined,
        type: formData.type,
        category: formData.category,
        consultant: formData.consultant || undefined,
        status: formData.status,
        featured: formData.featured,
      })

      router.push("/admin/jobs")
    } catch (error) {
      console.error("Error creating job:", error)
      alert("Failed to create job. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link href="/admin/jobs">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-display font-bold">Add New Job</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Marketing Manager"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Full job description..."
                    rows={6}
                    required
                  />
                </div>

                {/* Salary Options */}
                <div className="space-y-4">
                  <Label>Salary Information</Label>

                  {/* Salary Text */}
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-sm text-muted-foreground">
                      Salary Text (e.g., £35,000 - £45,000 or Competitive)
                    </Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="£35,000 - £45,000"
                    />
                  </div>

                  {/* OR Salary Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin" className="text-sm text-muted-foreground">
                        Min Salary (£)
                      </Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        value={formData.salaryMin}
                        onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                        placeholder="35000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryMax" className="text-sm text-muted-foreground">
                        Max Salary (£)
                      </Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        value={formData.salaryMax}
                        onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                        placeholder="45000"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select value={formData.type} onValueChange={(value: "PERMANENT" | "TEMPORARY" | "CONTRACT") => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERMANENT">Permanent</SelectItem>
                      <SelectItem value="TEMPORARY">Temporary</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category/Sector */}
                <div className="space-y-2">
                  <Label htmlFor="category">Sector *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Consultant */}
                <div className="space-y-2">
                  <Label htmlFor="consultant">Consultant</Label>
                  <Select value={formData.consultant} onValueChange={(value) => setFormData({ ...formData, consultant: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultant (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultants.map((consultant) => (
                        <SelectItem key={consultant} value={consultant}>
                          {consultant}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value: "ACTIVE" | "DRAFT" | "CLOSED") => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active (Visible on website)</SelectItem>
                      <SelectItem value="DRAFT">Draft (Hidden)</SelectItem>
                      <SelectItem value="CLOSED">Closed (Filled)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-input cursor-pointer"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured job (appears at top of listings)
                  </Label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? (
                      "Creating..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Job
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/admin/jobs">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
