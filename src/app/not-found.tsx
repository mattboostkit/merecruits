import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, Briefcase } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[80vh]">
      <section className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-6">
                <span className="text-6xl font-bold text-primary">404</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Page Not Found
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or deleted.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Home className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Return Home</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Go back to our homepage
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Go Home
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Briefcase className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Browse Jobs</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Explore our current vacancies
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/need-a-job/job-vacancies">
                      <Search className="mr-2 h-4 w-4" />
                      View Jobs
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Quick Links:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/about-us">About Us</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/need-staff">Employers</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/meet-the-team">Meet The Team</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
