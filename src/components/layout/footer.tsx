"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTenant } from "@/lib/tenant-context"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const tenant = useTenant()
  const {
    name,
    branding,
    contact,
    settings,
  } = tenant

  const socials = [
    { icon: Facebook, url: contact.facebookUrl, label: "Facebook" },
    { icon: Twitter, url: contact.twitterUrl, label: "Twitter" },
    { icon: Linkedin, url: contact.linkedInUrl, label: "LinkedIn" },
    { icon: Instagram, url: contact.instagramUrl, label: "Instagram" },
  ].filter((item) => item.url)

  return (
    <footer className="bg-slate-50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">{name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {branding.tagline ?? "Connecting people, purpose and potential across every hire."}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/need-a-job/job-vacancies" className="text-muted-foreground hover:text-primary transition-colors">
                  Job Vacancies
                </Link>
              </li>
              <li>
                <Link href="/need-staff" className="text-muted-foreground hover:text-primary transition-colors">
                  Employers
                </Link>
              </li>
              <li>
                <Link href="/meet-the-team" className="text-muted-foreground hover:text-primary transition-colors">
                  Meet The Team
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  News & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h4 className="font-semibold mb-4">Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/need-a-job/our-approach" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/upload-cv" className="text-muted-foreground hover:text-primary transition-colors">
                  Upload Your CV
                </Link>
              </li>
              <li>
                <Link href="/need-a-job/job-vacancies" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground whitespace-pre-line">
                  {contact.address ?? "United Kingdom"}
                </span>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="flex gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="flex gap-2 text-muted-foreground hover:text-primary transition-colors break-all">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{contact.email}</span>
                </a>
              </li>
            </ul>
            <Button asChild className="mt-4 w-full" size="sm">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <p>&copy; {currentYear} {name}. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>

        {settings.showPoweredBy && (
          <div className="mt-6 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-primary">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">
                {branding.poweredByText ?? "Powered by HireKit"}
              </span>
            </div>
            <a
              href={branding.poweredByLink ?? "https://hirekit.app"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold underline-offset-4 hover:underline"
            >
              hirekit.app
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}
