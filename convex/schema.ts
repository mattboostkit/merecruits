import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Tenants (Agencies) - Multi-tenancy support
  tenants: defineTable({
    // Basic Info
    name: v.string(), // "ME Recruits", "Acme Recruitment"
    subdomain: v.string(), // "merecruits", "acme-recruitment"
    customDomain: v.optional(v.string()), // "www.merecruits.com"

    // Branding
    logo: v.string(), // URL to logo image
    primaryColor: v.string(), // "#7e2634"
    secondaryColor: v.string(), // "#f5f5f5"
    accentColor: v.optional(v.string()), // Additional accent highlight
    primaryForegroundColor: v.optional(v.string()), // Text color over primary backgrounds
    secondaryForegroundColor: v.optional(v.string()), // Text color over secondary backgrounds
    heroImage: v.optional(v.string()), // Landing page hero background
    seoImage: v.optional(v.string()), // Default social share image
    favicon: v.optional(v.string()), // Favicon URL
    tagline: v.optional(v.string()), // Short strapline for SEO/hero
    poweredByLink: v.optional(v.string()), // Custom "Powered by" link
    poweredByText: v.optional(v.string()), // Custom attribution copy

    // Contact Information
    companyEmail: v.string(),
    companyPhone: v.string(),
    companyAddress: v.optional(v.string()),

    // Social Media
    facebookUrl: v.optional(v.string()),
    twitterUrl: v.optional(v.string()),
    linkedInUrl: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),

    // Subscription & Billing
    plan: v.union(v.literal("TRIAL"), v.literal("STARTER"), v.literal("PROFESSIONAL"), v.literal("ENTERPRISE")),
    subscriptionStatus: v.union(v.literal("ACTIVE"), v.literal("TRIAL"), v.literal("SUSPENDED"), v.literal("CANCELLED")),
    trialEndsAt: v.optional(v.number()),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),

    // Feature Flags & Limits (based on plan)
    settings: v.object({
      // Limits
      maxActiveJobs: v.number(), // 10 for Starter, -1 for unlimited
      maxCvAnalysesPerMonth: v.number(), // 50 for Starter, -1 for unlimited
      maxUsers: v.number(), // 1 for Starter, 5 for Pro, -1 for unlimited

      // Features
      allowCustomDomain: v.boolean(),
      allowApiAccess: v.boolean(),
      showPoweredBy: v.boolean(), // "Powered by HireKit"
      aiCvAnalysisEnabled: v.boolean(),

      // Usage tracking (reset monthly)
      cvAnalysesUsedThisMonth: v.number(),
      usageResetDate: v.number(), // Timestamp of when to reset usage
    }),

    // SEO & Content
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    aboutUs: v.optional(v.string()), // Markdown content for about page

    // Status
    active: v.boolean(), // Can be disabled by super admin
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_subdomain", ["subdomain"])
    .index("by_customDomain", ["customDomain"])
    .index("by_status", ["subscriptionStatus"])
    .index("by_plan", ["plan"])
    .index("by_active", ["active"]),

  // Job models
  jobs: defineTable({
    tenantId: v.optional(v.id("tenants")), // ← Multi-tenancy (optional during migration)
    title: v.string(),
    slug: v.string(),
    location: v.string(),
    description: v.string(),
    salary: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    // New fields for hourly rates
    salaryType: v.optional(v.union(v.literal("ANNUAL"), v.literal("HOURLY"))), // Default to ANNUAL if not specified
    hourlyRateMin: v.optional(v.number()),
    hourlyRateMax: v.optional(v.number()),
    type: v.union(v.literal("PERMANENT"), v.literal("TEMPORARY"), v.literal("CONTRACT")),
    category: v.string(), // This is the "Sector" field
    consultant: v.optional(v.string()), // Consultant name (e.g., "Helen Barham", "Melissa Staveley")
    status: v.union(v.literal("ACTIVE"), v.literal("DRAFT"), v.literal("CLOSED")),
    featured: v.boolean(),
    expiresAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"])
    .index("by_consultant", ["consultant"])
    .index("by_tenant", ["tenantId"])
    .index("by_tenant_status", ["tenantId", "status"])
    .index("by_tenant_slug", ["tenantId", "slug"]),

  // CV Upload model
  cvUploads: defineTable({
    tenantId: v.optional(v.id("tenants")), // ← Multi-tenancy (optional during migration)
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    fileUrl: v.string(),
    fileName: v.string(),
    jobId: v.optional(v.id("jobs")),
    message: v.optional(v.string()),
    // AI-parsed data (populated after CV is processed)
    aiParsed: v.optional(v.object({
      fullName: v.string(),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
      summary: v.string(),
      skills: v.array(v.string()),
      experience: v.array(v.object({
        jobTitle: v.string(),
        company: v.string(),
        duration: v.string(),
        description: v.optional(v.string()),
      })),
      education: v.array(v.object({
        degree: v.string(),
        institution: v.string(),
        year: v.optional(v.string()),
      })),
      yearsOfExperience: v.number(),
    })),
  })
    .index("by_email", ["email"])
    .index("by_job", ["jobId"])
    .index("by_tenant", ["tenantId"])
    .index("by_tenant_email", ["tenantId", "email"]),

  // News/Blog model
  newsArticles: defineTable({
    tenantId: v.optional(v.id("tenants")), // ← Multi-tenancy (optional during migration)
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    author: v.string(), // Author name (for backward compatibility)
    authorId: v.optional(v.id("teamMembers")), // Link to team member for photo/bio
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_author", ["authorId"])
    .index("by_tenant", ["tenantId"])
    .index("by_tenant_published", ["tenantId", "published"])
    .index("by_tenant_slug", ["tenantId", "slug"]),

  // Team member model
  teamMembers: defineTable({
    tenantId: v.optional(v.id("tenants")), // ← Multi-tenancy (optional during migration)
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    linkedInUrl: v.optional(v.string()),
    order: v.number(),
    active: v.boolean(),
  })
    .index("by_order", ["order"])
    .index("by_active", ["active"])
    .index("by_tenant", ["tenantId"])
    .index("by_tenant_active", ["tenantId", "active"]),

  // Contact form submissions
  contactSubmissions: defineTable({
    tenantId: v.optional(v.id("tenants")), // ← Multi-tenancy (optional during migration)
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    message: v.string(),
    type: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_tenant", ["tenantId"]),
});
