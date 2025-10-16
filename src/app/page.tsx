"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Users, TrendingUp, Award, MapPin, Clock, Calendar, Star, CheckCircle2, Heart, Target, Sparkles, FileText } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"
import { useTenant } from "@/lib/tenant-context"

export default function HomePage() {
  const tenant = useTenant()
  const { tenantId, branding, name } = tenant
  const featuredJobs = useQuery(api.jobs.getFeatured, { tenantId })
  const latestNews = useQuery(api.news.list, { tenantId })
  const consultants = useQuery(api.team.list, { tenantId })
  const heroImage =
    branding.heroImage ??
    "https://ik.imagekit.io/boostkit/ME%20Recruits/home-hero.webp?updatedAt=1760513529464"
  const heroBadge = branding.tagline ?? "145+ Five-Star Google Reviews"
  const heroDescription =
    branding.tagline ??
    "Over 25 years of expert recruitment across Kent's ME postcode area. We're not just recruiters — we're your partners in growth."

  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern with Image */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground py-24 md:py-32 overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={`${name} hero`}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/80 to-accent/85" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {heroBadge}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Building Remarkable Teams with{" "}
              <span className="text-secondary">{name}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              {heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button
                asChild
                size="lg"
                className="text-lg shadow-lg hover:shadow-xl transition-all bg-white text-primary hover:bg-white/90"
              >
                <Link href="/need-a-job/job-vacancies">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Browse Live Vacancies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg bg-secondary/80 hover:bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/upload-cv">
                  <FileText className="mr-2 h-5 w-5" />
                  Upload Your CV
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg bg-white/10 hover:bg-white/20 border-white/40 text-white backdrop-blur-sm"
              >
                <Link href="/need-staff">
                  <Users className="mr-2 h-5 w-5" />
                  Find Exceptional Talent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-4 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <Award className="h-10 w-10" />
              </div>
              <div className="text-4xl font-display font-bold text-foreground mb-2">25+</div>
              <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent/10 text-accent mb-4 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <Star className="h-10 w-10 fill-current" />
              </div>
              <div className="text-4xl font-display font-bold text-foreground mb-2">145+</div>
              <div className="text-sm text-muted-foreground font-medium">Five-Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-4 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <TrendingUp className="h-10 w-10" />
              </div>
              <div className="text-4xl font-display font-bold text-foreground mb-2">360°</div>
              <div className="text-sm text-muted-foreground font-medium">Recruitment Service</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-accent/10 text-accent mb-4 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="text-4xl font-display font-bold text-foreground mb-2">100%</div>
              <div className="text-sm text-muted-foreground font-medium">REC Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultant Spotlight */}
      {consultants && consultants.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                <div>
                  <Badge variant="outline" className="mb-3">
                    Meet the team
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    Trusted consultants connecting people &amp; purpose
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-2xl">
                    Our specialist consultants live and breathe Kent’s ME postcode market.
                    Get to know the experts who will champion your next hire or career move.
                  </p>
                </div>
                <Button asChild variant="outline" className="self-start md:self-auto">
                  <Link href="/meet-the-team">
                    View full team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.slice(0, 3).map((consultant) => (
                  <Card key={consultant._id} className="group border border-border/60 hover:border-primary/40 transition-colors duration-300 shadow-sm hover:shadow-lg">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="relative w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold uppercase">
                        {consultant.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{consultant.name}</CardTitle>
                        <CardDescription className="text-sm font-medium text-muted-foreground/90">
                          {consultant.role}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                        {consultant.bio}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-primary/30 px-3 py-1">
                          <Sparkles className="h-3 w-3 text-primary" />
                          Specialist
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-primary/30 px-3 py-1">
                          <MapPin className="h-3 w-3 text-primary" />
                          Kent &amp; ME Postcode
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <Button asChild variant="ghost" size="sm" className="text-primary font-semibold">
                        <Link href={`/meet-the-team#${consultant._id}`}>
                          Contact {consultant.name.split(" ")[0]}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        className="bg-secondary/90 hover:bg-secondary text-secondary-foreground"
                      >
                        <Link href="/upload-cv">
                          Share your CV
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI CV Analyzer CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-primary-foreground/20 bg-white/95 backdrop-blur-sm shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
                    How Strong is Your CV?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Get your CV scored out of 10 by our AI-powered analyser. Powered by GPT-5 and 25+ years of recruitment expertise.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Instant CV score out of 10</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Identify your CV&apos;s strengths</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Get quick wins to boost your score</p>
                    </div>
                  </div>
                  <Button asChild size="lg" className="shadow-lg w-full sm:w-auto">
                    <Link href="/cv-analysis">
                      <FileText className="mr-2 h-5 w-5" />
                      Score My CV Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
                      <div className="text-center">
                        <div className="text-7xl font-display font-bold text-white mb-2">?</div>
                        <div className="text-2xl font-bold text-white/90">/10</div>
                      </div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-secondary flex items-center justify-center shadow-xl animate-bounce">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Introduction with Image */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1">
              <Badge variant="outline" className="mb-4">About ME Recruits</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Kent&apos;s Trusted <span className="text-primary">Recruitment Specialists</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sister company to award-winning TN Recruits, we bring over 25 years of regional recruitment expertise to the ME postcode area. Founded and led by <strong>Helen Barham</strong>, we believe great recruitment goes beyond matching skills to job descriptions.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We connect people, purpose and potential — providing a 360° recruitment service built on long-term relationships and dedicated account management. With 145+ five-star Google reviews, we&apos;re proud partners in growth for businesses and professionals across Kings Hill, West Malling, Maidstone, and beyond.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Personal Touch</div>
                    <div className="text-sm text-muted-foreground">Individual approach to every client</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Local Experts</div>
                    <div className="text-sm text-muted-foreground">Deep ME postcode knowledge</div>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/about-us">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
                  alt="Professional recruitment team collaborating"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <Badge variant="outline" className="mb-3">Current Opportunities</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">Latest Job Vacancies</h2>
              <p className="text-lg text-muted-foreground">
                Explore our handpicked opportunities across Kent
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="mt-6 md:mt-0 shadow-sm">
              <Link href="/need-a-job/job-vacancies">
                View All Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {featuredJobs === undefined ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Loading exciting opportunities...</p>
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <Card key={job._id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant={job.type === "PERMANENT" ? "default" : "secondary"} className="shadow-sm">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{job.category}</Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      {job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                      {job.description.substring(0, 150)}...
                    </p>
                    {job.salary && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Briefcase className="h-4 w-4" />
                        {job.salary}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="w-full group">
                      <Link href={`/need-a-job/job-vacancies/${job.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border-2 border-dashed">
              <Briefcase className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">New Opportunities Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re currently updating our listings. Upload your CV to be first in line!
              </p>
              <Button asChild variant="outline" size="lg">
                <Link href="/upload-cv">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Upload Your CV
                </Link>
              </Button>
            </Card>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3">Why ME Recruits</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Your Success is Our Priority</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combining local expertise with personal service to deliver exceptional recruitment solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Local Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Over 25 years of ME postcode area knowledge with established relationships across Kings Hill, West Malling, Maidstone, Aylesford, Sittingbourne, Chatham, and Rochester.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-accent" />
                </div>
                <CardTitle>Personalised Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We take time to understand your unique needs, whether you&apos;re looking for your next role or seeking the perfect candidate.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Fast &amp; Efficient</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Streamlined processes ensure quick turnaround times without compromising on quality or attention to detail.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <CardTitle>REC Registered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  As proud members of the Recruitment &amp; Employment Confederation, we adhere to the highest industry standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Sector Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Expertise across Financial Services, Accountancy, Legal, Administration, Marketing, Insurance, IT, Sales, Customer Service, and Graphic Design.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <Star className="h-7 w-7 text-accent fill-current" />
                </div>
                <CardTitle>Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  145+ five-star Google reviews and 25+ years of successful placements demonstrate our commitment to excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3">Client Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-primary fill-current" />
              ))}
              <span className="ml-2 text-lg font-semibold">5.0 on Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  &quot;Helen and her team are exceptional. Their personal approach and understanding of our business needs resulted in finding the perfect candidate within days.&quot;
                </p>
                <div className="font-semibold">Sarah Mitchell</div>
                <div className="text-sm text-muted-foreground">Finance Director, Maidstone</div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  &quot;ME Recruits helped me find my dream job. Their support throughout the process was fantastic, and they truly cared about finding the right fit for me.&quot;
                </p>
                <div className="font-semibold">James Thompson</div>
                <div className="text-sm text-muted-foreground">Marketing Manager, Kings Hill</div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 text-primary fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  &quot;Professional, efficient, and genuinely invested in our success. We&apos;ve been working with ME Recruits for years and wouldn&apos;t go anywhere else.&quot;
                </p>
                <div className="font-semibold">Emma Roberts</div>
                <div className="text-sm text-muted-foreground">HR Director, West Malling</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      {latestNews && latestNews.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <Badge variant="outline" className="mb-3">News &amp; Insights</Badge>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-3">Latest From Our Blog</h2>
                <p className="text-lg text-muted-foreground">
                  Stay updated with recruitment trends and career advice
                </p>
              </div>
              <Button asChild variant="outline" size="lg" className="mt-6 md:mt-0 shadow-sm">
                <Link href="/news">
                  View All Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestNews.slice(0, 4).map((article) => (
                <Card key={article._id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10">
                    <Image
                      src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80"
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : ""}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="w-full group">
                      <Link href={`/news/${article.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80')] bg-cover bg-center opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl mb-10 text-primary-foreground/90 leading-relaxed">
              Whether you&apos;re seeking your dream job or looking to build your perfect team, we&apos;re here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg shadow-xl">
                <Link href="/upload-cv">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Upload Your CV
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm">
                <Link href="/contact">
                  Contact Us Today
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
