import { v } from "convex/values";
import { query } from "./_generated/server";

// Get all active team members
export const list = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_tenant_active", (q) => q.eq("tenantId", args.tenantId).eq("active", true))
      .collect();

    return members.sort((a, b) => a.order - b.order);
  },
});
