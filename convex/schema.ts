import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Job models
  jobs: defineTable({
    title: v.string(),
    slug: v.string(),
    location: v.string(),
    description: v.string(),
    salary: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
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
    .index("by_consultant", ["consultant"]),

  // CV Upload model
  cvUploads: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    fileUrl: v.string(),
    fileName: v.string(),
    jobId: v.optional(v.id("jobs")),
    message: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_job", ["jobId"]),

  // News/Blog model
  newsArticles: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    author: v.string(),
    published: v.boolean(),
    publishedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"]),

  // Team member model
  teamMembers: defineTable({
    name: v.string(),
    role: v.string(),
    bio: v.string(),
    imageUrl: v.string(),
    email: v.string(),
    order: v.number(),
    active: v.boolean(),
  })
    .index("by_order", ["order"])
    .index("by_active", ["active"]),

  // Contact form submissions
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    message: v.string(),
    type: v.string(),
  })
    .index("by_email", ["email"]),
});
