"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle2, AlertCircle, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"
import { useTenant } from "@/lib/tenant-context"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

const cvUploadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  jobReference: z.string().optional(),
  coverLetter: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy"
  })
})

type CVUploadFormData = z.infer<typeof cvUploadSchema>

function UploadCVContent() {
  const searchParams = useSearchParams()
  const jobRef = searchParams.get("job_ref")
  const { tenantId } = useTenant()
  const submitCV = useMutation(api.cvUploads.submit)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CVUploadFormData>({
    resolver: zodResolver(cvUploadSchema),
    defaultValues: {
      jobReference: jobRef || "",
    }
  })

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "Please upload a PDF or Word document (DOC, DOCX)"
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB"
    }
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const error = validateFile(selectedFile)
      if (error) {
        setFileError(error)
        setFile(null)
      } else {
        setFileError(null)
        setFile(selectedFile)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const error = validateFile(droppedFile)
      if (error) {
        setFileError(error)
        setFile(null)
      } else {
        setFileError(null)
        setFile(droppedFile)
      }
    }
  }

  const removeFile = () => {
    setFile(null)
    setFileError(null)
  }

  const onSubmit = async (data: CVUploadFormData) => {
    if (!file) {
      setFileError("Please upload your CV")
      return
    }

    setIsSubmitting(true)

    try {
      // Step 1: Get upload URL from Convex
      const uploadUrl = await fetch("/api/generate-upload-url", {
        method: "POST",
      })
      const { url } = await uploadUrl.json()

      // Step 2: Upload file to Convex storage
      const uploadResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error("File upload failed")
      }

      const { storageId } = await uploadResponse.json()

      // Step 3: Submit CV data with storage ID
      await submitCV({
        tenantId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        jobReference: data.jobReference,
        coverLetter: data.coverLetter,
        fileName: file.name,
        storageId: storageId,
      })

      setSubmitSuccess(true)
      reset()
      setFile(null)

      // Reset success message after 7 seconds
      setTimeout(() => setSubmitSuccess(false), 7000)
    } catch (error) {
      console.error("CV upload error:", error)
      setFileError("Failed to upload CV. Please try again or email us directly at info@merecruits.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Upload Your CV
            </h1>
            <p className="text-xl text-primary-foreground/90">
              {jobRef
                ? "Apply for this position by submitting your CV and details below"
                : "Submit your CV and we'll match you with suitable opportunities"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Upload Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Details</CardTitle>
                <CardDescription>
                  Complete the form below and upload your CV. We&apos;ll review your application and be in touch soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-medium">
                        Thank you for your application!
                      </p>
                      <p className="text-green-700 text-sm mt-1">
                        We&apos;ve received your CV and will review it shortly. We&apos;ll be in touch if your profile matches our current opportunities.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* File Upload */}
                  <div className="space-y-2">
                    <Label>
                      Upload CV <span className="text-destructive">*</span>
                    </Label>

                    {!file ? (
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : fileError
                            ? "border-destructive bg-destructive/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Upload className={`h-12 w-12 mx-auto mb-4 ${
                          isDragging ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <p className="text-lg font-medium mb-2">
                          {isDragging ? "Drop your CV here" : "Drag and drop your CV here"}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          or click to browse your files
                        </p>
                        <input
                          type="file"
                          id="cv-upload"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("cv-upload")?.click()}
                        >
                          Choose File
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    ) : (
                      <div className="border border-border rounded-lg p-4 flex items-center justify-between bg-slate-50">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {fileError && (
                      <div className="flex items-start gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{fileError}</p>
                      </div>
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        placeholder="John"
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        placeholder="Smith"
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="01234 567890"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Job Reference */}
                  {jobRef && (
                    <div className="space-y-2">
                      <Label htmlFor="jobReference">Job Reference</Label>
                      <Input
                        id="jobReference"
                        {...register("jobReference")}
                        value={jobRef}
                        disabled
                        className="bg-slate-50"
                      />
                      <p className="text-sm text-muted-foreground">
                        You&apos;re applying for a specific position
                      </p>
                    </div>
                  )}

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                    <Textarea
                      id="coverLetter"
                      {...register("coverLetter")}
                      placeholder="Tell us a bit about yourself and why you&apos;re interested in working with us..."
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      A brief cover letter can help us understand your motivations and career goals
                    </p>
                  </div>

                  {/* GDPR Consent */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/30">
                      <input
                        type="checkbox"
                        id="gdprConsent"
                        {...register("gdprConsent")}
                        className="mt-1 h-5 w-5 rounded border-input flex-shrink-0 cursor-pointer"
                      />
                      <div className="flex-1">
                        <Label htmlFor="gdprConsent" className="text-sm cursor-pointer leading-relaxed block">
                          <span className="text-destructive font-semibold">* Required: </span>
                          I agree to the processing of my personal data in accordance with the{" "}
                          <a href="/privacy-policy" className="text-primary hover:underline font-semibold underline-offset-2">
                            Privacy Policy
                          </a>
                          . I understand that my CV and personal information will be stored and used to match me with suitable job opportunities.
                        </Label>
                      </div>
                    </div>
                    {errors.gdprConsent && (
                      <p className="text-sm text-destructive pl-4">{errors.gdprConsent.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Uploading...</>
                    ) : (
                      <>
                        Submit Application
                        <Upload className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quick Review</h3>
                  <p className="text-sm text-muted-foreground">
                    We review all CVs within 48 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Confidential</h3>
                  <p className="text-sm text-muted-foreground">
                    Your information is kept strictly confidential
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Keep Updated</h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll notify you of matching opportunities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function UploadCVPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UploadCVContent />
    </Suspense>
  )
}
