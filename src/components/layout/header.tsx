"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import { useTenant } from "@/lib/tenant-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const tenant = useTenant()
  const { branding, contact, name } = tenant
  const defaultLogo = "https://ik.imagekit.io/boostkit/ME%20Recruits/logo-white-bg.webp?updatedAt=1760513596543"
  const logoSrc = branding.logo || defaultLogo

  const navigation = [
    { name: "About Us", href: "/about-us" },
    {
      name: "Need A Job",
      href: "/need-a-job",
      submenu: [
        { name: "Our Approach", href: "/need-a-job/our-approach" },
        { name: "Job Vacancies", href: "/need-a-job/job-vacancies" },
        { name: "Upload CV", href: "/upload-cv" },
        { name: "AI CV Analysis", href: "/cv-analysis" },
      ],
    },
    { name: "Need Staff", href: "/need-staff" },
    { name: "Meet The Team", href: "/meet-the-team" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="h-4 w-4" />
                <span>{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="h-4 w-4" />
                <span>{contact.email}</span>
              </a>
            </div>
            <div className="text-xs">
              <span>{branding.tagline ?? `Trusted recruitment partners for ambitious teams.`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt={`${name} logo`}
              width={240}
              height={80}
              className="h-16 w-auto"
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                    <div className="bg-white border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm hover:bg-accent transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Button asChild size="lg">
              <Link href="/upload-cv">Upload CV</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-foreground hover:text-primary transition-colors font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button asChild className="mt-4">
                <Link href="/upload-cv" onClick={() => setMobileMenuOpen(false)}>
                  Upload CV
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
