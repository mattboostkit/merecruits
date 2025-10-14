import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const cvUploadSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  jobReference: z.string().optional(),
  coverLetter: z.string().optional(),
  fileName: z.string(),
  fileSize: z.number(),
  fileType: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = cvUploadSchema.parse(body)

    // Find job if reference provided
    let job = null
    if (validatedData.jobReference) {
      job = await prisma.job.findUnique({
        where: { slug: validatedData.jobReference },
      })
    }

    // Save to database
    const cvUpload = await prisma.cVUpload.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.coverLetter || null,
        fileName: validatedData.fileName,
        fileUrl: `/uploads/cvs/${validatedData.fileName}`, // TODO: Implement actual file storage
        jobId: job?.id || null,
      },
    })

    // TODO: Upload file to storage (S3, Azure Blob, etc.)
    // TODO: Send notification email to admin
    // TODO: Send confirmation email to applicant

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your application! We've received your CV and will review it shortly.",
        uploadId: cvUpload.id,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      )
    }

    console.error("CV upload error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your application. Please try again later.",
      },
      { status: 500 }
    )
  }
}
