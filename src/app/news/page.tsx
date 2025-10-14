"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"
import { format } from "date-fns"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"

export default function NewsPage() {
  const articles = useQuery(api.news.list)

  const featuredArticle = articles?.[0]
  const regularArticles = articles?.slice(1) || []

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Insights
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Stay informed with the latest recruitment trends, career advice, and industry insights
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Badge className="mb-4" variant="secondary">Featured Article</Badge>
              <Card className="overflow-hidden border-2 border-primary/20 hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-12">
                    <div className="w-full h-64 bg-primary/20 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Featured Image</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex gap-2 mb-3">
                        <Badge>News</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {format(featuredArticle.publishedAt ? new Date(featuredArticle.publishedAt) : new Date(), "dd MMM yyyy")}
                        </div>
                      </div>
                      <CardTitle className="text-3xl mb-2">{featuredArticle.title}</CardTitle>
                      <CardDescription className="text-base">
                        {featuredArticle.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button asChild size="lg">
                        <Link href={`/news/${featuredArticle.slug}`}>
                          Read Full Article
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              {featuredArticle ? "Latest Articles" : "All Articles"}
            </h2>

            {articles === undefined ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : regularArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.map((article) => (
                  <Card key={article._id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex items-center justify-center">
                      <div className="w-full h-48 bg-primary/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">Article Image</p>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline">News</Badge>
                      </div>
                      <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(article.publishedAt ? new Date(article.publishedAt) : new Date(), "dd MMM yyyy")}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="ghost" className="w-full">
                        <Link href={`/news/${article.slug}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No articles available at the moment.</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Whether you&apos;re looking for your next role or seeking exceptional talent, we&apos;re here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/need-a-job/job-vacancies">
                  Browse Jobs
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
