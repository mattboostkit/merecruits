import { v } from "convex/values";
import { query } from "./_generated/server";

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
