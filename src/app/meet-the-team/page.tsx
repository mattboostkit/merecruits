"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail, Linkedin } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "convex/_generated/api"

export default function MeetTheTeamPage() {
  const teamMembers = useQuery(api.team.list)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet The Team
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Get to know the experienced professionals dedicated to connecting talent with opportunity across Kent
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Expert Recruiters Who Care
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our team of experienced recruitment consultants brings together over 50 years of combined expertise in the Kent employment market. We&apos;re not just recruiters – we&apos;re career advisers, business partners, and local experts who genuinely care about finding the right fit.
            </p>
            <p className="text-lg text-muted-foreground">
              Each member of our team specialises in specific sectors and brings unique insights to help you succeed, whether you&apos;re looking for your next role or building your perfect team.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {teamMembers === undefined ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading team members...</p>
              </div>
            ) : teamMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                  <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8 h-64">
                      <div className="w-40 h-40 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-5xl font-bold text-primary">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="flex-shrink-0">
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <p className="text-primary font-semibold text-sm">{member.role}</p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                        {member.bio}
                      </p>
                    </CardContent>
                    <CardContent className="pt-0 flex-shrink-0">
                      <div className="flex gap-2 w-full">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a href={`mailto:${member.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </a>
                        </Button>
                        {member.linkedInUrl && (
                          <Button asChild variant="ghost" size="sm" className="flex-1">
                            <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground">
                              <Linkedin className="h-4 w-4 mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No team members found. Please contact us directly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team Values</h2>
            <p className="text-lg text-muted-foreground mb-12">
              What drives us every day
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Partnership</h3>
                <p className="text-muted-foreground">
                  We build lasting relationships based on trust, transparency, and mutual success.
                </p>
              </div>

              <div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                <p className="text-muted-foreground">
                  Deep market knowledge and sector specialisation ensure the best matches.
                </p>
              </div>

              <div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Dedication</h3>
                <p className="text-muted-foreground">
                  We&apos;re genuinely committed to your success and go the extra mile to deliver.
                </p>
              </div>
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
              Whether you&apos;re looking for your next career move or seeking exceptional talent, our team is here to help
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
