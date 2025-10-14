import { v } from "convex/values";
import { query } from "./_generated/server";

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
