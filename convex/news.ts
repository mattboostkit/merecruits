import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all published news articles
export const list = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db
      .query("newsArticles")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();
    
    return articles.sort((a, b) => {
      const aTime = a.publishedAt ?? a._creationTime;
      const bTime = b.publishedAt ?? b._creationTime;
      return bTime - aTime;
    });
  },
});

// Get a single article by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const article = await ctx.db
      .query("newsArticles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    return article;
  },
});

// Get recent articles (excluding one)
export const getRelated = query({
  args: { excludeId: v.id("newsArticles"), limit: v.number() },
  handler: async (ctx, args) => {
    const articles = await ctx.db
      .query("newsArticles")
      .withIndex("by_published", (q) => q.eq("published", true))
      .collect();

    return articles
      .filter((article) => article._id !== args.excludeId)
      .sort((a, b) => {
        const aTime = a.publishedAt ?? a._creationTime;
        const bTime = b.publishedAt ?? b._creationTime;
        return bTime - aTime;
      })
      .slice(0, args.limit);
  },
});

// Get ALL articles (including drafts) - for admin use
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const articles = await ctx.db.query("newsArticles").collect();
    return articles.sort((a, b) => {
      const aTime = a.publishedAt ?? a._creationTime;
      const bTime = b.publishedAt ?? b._creationTime;
      return bTime - aTime;
    });
  },
});

// Get a single article by ID (for editing)
export const getById = query({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.id);
    return article;
  },
});

// Mutation to create a new article
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    author: v.string(),
    authorId: v.optional(v.id("teamMembers")),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const articleId = await ctx.db.insert("newsArticles", {
      ...args,
      publishedAt: args.published ? Date.now() : undefined,
    });
    return articleId;
  },
});

// Mutation to update an existing article
export const update = mutation({
  args: {
    id: v.id("newsArticles"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    author: v.optional(v.string()),
    authorId: v.optional(v.id("teamMembers")),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const patchData: any = { ...updates };

    // If publishing for the first time, set publishedAt
    if (updates.published) {
      const existing = await ctx.db.get(id);
      if (existing && !existing.published) {
        patchData.publishedAt = Date.now();
      }
    }

    await ctx.db.patch(id, patchData);
    return id;
  },
});

// Mutation to delete an article
export const remove = mutation({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
