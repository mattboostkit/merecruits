import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get("search") || undefined
    const location = searchParams.get("location") || undefined
    const type = searchParams.get("type") || undefined
    const category = searchParams.get("category") || undefined
    const featured = searchParams.get("featured") === "true"
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined

    // Build where clause
    const where: Prisma.JobWhereInput = {
      status: "ACTIVE",
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    if (location) {
      where.location = location
    }

    if (type) {
      where.type = type as "PERMANENT" | "TEMPORARY" | "CONTRACT"
    }

    if (category) {
      where.category = category
    }

    if (featured) {
      where.featured = true
    }

    // Fetch jobs
    const jobs = await prisma.job.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    })

    return NextResponse.json(
      {
        success: true,
        count: jobs.length,
        jobs,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Jobs API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching jobs.",
      },
      { status: 500 }
    )
  }
}
