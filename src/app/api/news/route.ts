import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined

    // Build where clause
    const where: Prisma.NewsArticleWhereInput = {
      published: true,
    }

    // Fetch articles
    const articles = await prisma.newsArticle.findMany({
      where,
      orderBy: {
        publishedAt: "desc",
      },
      take: limit,
    })

    return NextResponse.json(
      {
        success: true,
        count: articles.length,
        articles,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("News API error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching news articles.",
      },
      { status: 500 }
    )
  }
}
