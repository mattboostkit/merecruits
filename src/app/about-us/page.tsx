import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Users, TrendingUp, MapPin, Heart, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ME Recruits - Sister company to award-winning TN Recruits with over 25 years of recruitment expertise in the ME postcode area. 145+ five-star Google reviews.",
}

export default function AboutUsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About ME Recruits
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Sister company to award-winning TN Recruits, bringing over 25 years of recruitment expertise to the ME postcode area
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                ME Recruits is the sister company to the award-winning TN Recruits, founded and led by Helen Barham. With over 25 years of regional recruitment expertise, we specialise in the ME postcode area including Kings Hill, West Malling, Maidstone, Aylesford, Sittingbourne, Chatham, and Rochester.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Helen&apos;s 20+ years of recruitment experience has shaped our philosophy that great recruitment goes beyond matching skills to job descriptions. We aim to connect people, purpose and potential, providing a 360° recruitment service built on long-term relationships and dedicated account management.
              </p>
              <p className="text-lg leading-relaxed">
                We&apos;re proud to be partners in growth, with 145+ five-star Google reviews reflecting our commitment to supporting both client and candidate success. Our sector expertise spans Financial Services, Accountancy, Legal, Administration, Marketing, Insurance, IT, Sales, and Customer Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">145+</div>
              <div className="text-muted-foreground">Five-Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">360°</div>
              <div className="text-muted-foreground">Recruitment Service</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">REC Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Integrity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We believe in honest, transparent communication and always act in the best interests of our clients and candidates. Trust is the foundation of everything we do.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We&apos;re committed to delivering exceptional service at every stage. From initial contact to successful placement and beyond, we strive for excellence in all we do.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We view every relationship as a partnership. By truly understanding your needs and goals, we can provide tailored solutions that create lasting success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose ME Recruits?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Local Market Expertise</h3>
                  <p className="text-muted-foreground">
                    With over 25 years of regional recruitment experience, we have unparalleled knowledge of the ME postcode area and established relationships with leading employers throughout Kings Hill, Maidstone, and surrounding areas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personalised Approach</h3>
                  <p className="text-muted-foreground">
                    We&apos;re not a faceless agency - we take time to understand your unique requirements and provide personalised support throughout the entire recruitment process.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">REC Registered</h3>
                  <p className="text-muted-foreground">
                    As proud members of the Recruitment & Employment Confederation (REC), we adhere to the highest professional standards and comply with all industry regulations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                  <p className="text-muted-foreground">
                    Our success speaks for itself - with 145+ five-star Google reviews and a reputation built on accuracy and efficiency, we consistently deliver exceptional results for both clients and candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">For Job Seekers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    We help talented professionals find their perfect role, whether you&apos;re seeking:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Permanent career opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Temporary or contract positions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Career advice and guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>CV review and interview preparation</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/need-a-job/job-vacancies">
                      Browse Jobs
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">For Employers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    We help businesses build exceptional teams through:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Permanent recruitment solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Temporary and contract staffing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Executive search services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Tailored recruitment strategies</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full mt-4">
                    <Link href="/need-staff">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Whether you&apos;re looking for your next career move or seeking exceptional talent, we&apos;re here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/meet-the-team">
                  Meet Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white">
                <Link href="/contact">
                  Get In Touch
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
