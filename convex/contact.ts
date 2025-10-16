import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to list all contact submissions - for admin use
export const listAll = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("contactSubmissions")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .collect();
    return submissions.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Submit a contact form
export const submit = mutation({
  args: {
    tenantId: v.id("tenants"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    type: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("contactSubmissions", {
      tenantId: args.tenantId,
      name: args.name,
      email: args.email,
      phone: args.phone,
      company: args.company,
      type: args.type,
      message: args.message,
    });

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to user

    return submissionId;
  },
});
