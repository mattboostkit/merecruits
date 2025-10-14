import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Search, Upload, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Need A Job",
  description: "Looking for your next career opportunity? ME Recruits connects talented professionals with exceptional employers across Kent.",
}

export default function NeedAJobPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Job
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Discover exciting opportunities with leading employers across Kent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/need-a-job/job-vacancies">
                  Browse Jobs
                  <Search className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                <Link href="/upload-cv">
                  Upload Your CV
                  <Upload className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center text-2xl">Browse Job Vacancies</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Search through our current opportunities and find your perfect role across Kent
                </p>
                <Button asChild className="w-full">
                  <Link href="/need-a-job/job-vacancies">
                    View Jobs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center text-2xl">Our Approach</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Learn about how we work with candidates to find the perfect career match
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/need-a-job/our-approach">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-center text-2xl">Upload Your CV</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Submit your CV and we&apos;ll match you with relevant opportunities
                </p>
                <Button asChild className="w-full">
                  <Link href="/upload-cv">
                    Upload Now
                    <Upload className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
