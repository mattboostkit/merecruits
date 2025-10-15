import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all active jobs with optional filters
export const list = query({
  args: {
    search: v.optional(v.string()),
    location: v.optional(v.string()),
    type: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let jobs = await ctx.db
      .query("jobs")
      .withIndex("by_status", (q) => q.eq("status", "ACTIVE"))
      .collect();

    // Apply filters
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      );
    }

    if (args.location) {
      jobs = jobs.filter((job) => job.location === args.location);
    }

    if (args.type) {
      jobs = jobs.filter((job) => job.type === args.type);
    }

    if (args.category) {
      jobs = jobs.filter((job) => job.category === args.category);
    }

    // Sort by creation time (most recent first)
    return jobs.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Get a single job by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const job = await ctx.db
      .query("jobs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    return job;
  },
});

// Get a single job by ID (for admin editing)
export const getById = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.id);
    return job;
  },
});

// Get featured jobs
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const jobs = await ctx.db
      .query("jobs")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();

    return jobs
      .filter((job) => job.status === "ACTIVE")
      .sort((a, b) => b._creationTime - a._creationTime)
      .slice(0, 6);
  },
});

// Get ALL jobs (including drafts and closed) - for admin use
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const jobs = await ctx.db.query("jobs").collect();
    return jobs.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Mutation to create a new job
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    location: v.string(),
    description: v.string(),
    salary: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    type: v.union(v.literal("PERMANENT"), v.literal("TEMPORARY"), v.literal("CONTRACT")),
    category: v.string(),
    consultant: v.optional(v.string()),
    status: v.union(v.literal("ACTIVE"), v.literal("DRAFT"), v.literal("CLOSED")),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const jobId = await ctx.db.insert("jobs", args);
    return jobId;
  },
});

// Mutation to update an existing job
export const update = mutation({
  args: {
    id: v.id("jobs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    salary: v.optional(v.string()),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    type: v.optional(v.union(v.literal("PERMANENT"), v.literal("TEMPORARY"), v.literal("CONTRACT"))),
    category: v.optional(v.string()),
    consultant: v.optional(v.string()),
    status: v.optional(v.union(v.literal("ACTIVE"), v.literal("DRAFT"), v.literal("CLOSED"))),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Mutation to delete a job permanently
export const remove = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Mutation to close a job (mark as CLOSED instead of deleting)
export const close = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "CLOSED" });
    return { success: true };
  },
});

// Mutation to reopen a closed job
export const reopen = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "ACTIVE" });
    return { success: true };
  },
});
