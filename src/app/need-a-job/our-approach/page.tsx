import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle2, Search, Users, FileText, Briefcase, Upload } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Approach",
  description: "Discover how ME Recruits helps job seekers find their perfect role with personalised support and expert guidance throughout the recruitment process.",
}

export default function OurApproachPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Approach to Helping You
            </h1>
            <p className="text-xl text-primary-foreground/90">
              At ME Recruits, we&apos;re committed to understanding your career aspirations and connecting you with opportunities that truly match your skills and goals
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              More Than Just Job Matching
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              We believe that recruitment is about more than just matching CVs to job descriptions. It&apos;s about understanding people, building relationships, and creating opportunities that lead to long-term success.
            </p>
            <p className="text-lg text-muted-foreground">
              With over 15 years of experience in the Kent market, we&apos;ve developed a proven approach that puts you at the centre of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How We Work With You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="relative">
                <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <CardHeader className="pt-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">Initial Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    We start with a conversation to understand your career goals, skills, experience, and what you&apos;re looking for in your next role.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <CardHeader className="pt-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">Opportunity Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    We match you with relevant opportunities from our extensive network of clients across Kent, considering both your requirements and career aspirations.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <CardHeader className="pt-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">Application Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    We provide expert guidance on your application, CV optimisation, and comprehensive interview preparation to maximise your chances of success.
                  </p>
                </CardContent>
              </Card>

              <Card className="relative">
                <div className="absolute -top-4 left-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <CardHeader className="pt-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-center">Ongoing Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Our support doesn&apos;t end when you secure the role. We stay in touch to ensure your successful transition and long-term satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalised Career Advice</h3>
                  <p className="text-muted-foreground">
                    Benefit from expert guidance tailored to your unique situation, whether you&apos;re looking for your first role or planning your next career move.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">CV Review &amp; Optimisation</h3>
                  <p className="text-muted-foreground">
                    We&apos;ll review your CV and provide professional feedback to ensure it showcases your skills and experience in the best possible light.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Interview Preparation</h3>
                  <p className="text-muted-foreground">
                    Get comprehensive interview preparation, including insights into the company culture, typical interview questions, and tips for success.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Exclusive Opportunities</h3>
                  <p className="text-muted-foreground">
                    Access opportunities that aren&apos;t advertised elsewhere, thanks to our strong relationships with leading employers across Kent.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
                  <p className="text-muted-foreground">
                    Stay informed about salary trends, in-demand skills, and market conditions in your industry and location.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Long-term Partnership</h3>
                  <p className="text-muted-foreground">
                    We&apos;re invested in your long-term career success, providing support and opportunities throughout your professional journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl text-center">Our Commitment to You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-muted-foreground text-center">
                  When you work with ME Recruits, you can expect:
                </p>
                <ul className="space-y-3 max-w-2xl mx-auto">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Honest, transparent communication at every stage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Respect for your confidentiality and career aspirations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Prompt responses and regular updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Expert advice based on current market conditions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Support throughout your job search and beyond</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Job Search?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Take the first step towards your next career opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/need-a-job/job-vacancies">
                  Browse Current Vacancies
                  <ArrowRight className="ml-2 h-5 w-5" />
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
    </div>
  )
}
