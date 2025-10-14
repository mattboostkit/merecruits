import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.string().min(1, "Please select an enquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        type: validatedData.type,
        message: validatedData.message,
      },
    })

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to user

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll be in touch soon.",
        submissionId: submission.id,
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

    console.error("Contact form error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    )
  }
}
