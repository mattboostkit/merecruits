import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

interface NewsArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.newsArticle.findUnique({
    where: { slug },
  })

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString() || new Date().toISOString(),
      authors: [article.author],
    },
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = await prisma.newsArticle.findUnique({
    where: { slug },
  })

  if (!article || !article.published) {
    notFound()
  }

  // Get related articles
  const relatedArticles = await prisma.newsArticle.findMany({
    where: {
      published: true,
      id: {
        not: article.id,
      },
    },
    take: 3,
    orderBy: {
      publishedAt: "desc",
    },
  })

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="bg-slate-50 py-4 border-b">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/news">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Link>
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">News</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{format(article.publishedAt ? new Date(article.publishedAt) : new Date(), "dd MMMM yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>5 min read</span>
              </div>
              <div>
                <span className="font-medium">By {article.author}</span>
              </div>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
              <div className="w-full h-96 flex items-center justify-center bg-primary/20">
                <p className="text-muted-foreground">Article Featured Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Share this article</h3>
                  <p className="text-sm text-muted-foreground">
                    Help others discover this valuable insight
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-12 bg-slate-50">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {article.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{article.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      Recruitment specialist at ME Recruits with extensive experience in the Kent employment market.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 flex items-center justify-center">
                      <div className="w-full h-40 bg-primary/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">Article Image</p>
                      </div>
                    </div>
                    <CardContent className="flex-1 pt-6">
                      <Badge variant="outline" className="mb-2">News</Badge>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      <Button asChild variant="ghost" size="sm" className="w-full">
                        <Link href={`/news/${relatedArticle.slug}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Looking for Your Next Opportunity?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Explore our current vacancies or get in touch to discuss your career goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/need-a-job/job-vacancies">
                  View All Jobs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
