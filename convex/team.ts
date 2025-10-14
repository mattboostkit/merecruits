import { query } from "./_generated/server";

// Get all active team members
export const list = query({
  args: {},
  handler: async (ctx) => {
    const members = await ctx.db
      .query("teamMembers")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();
    
    return members.sort((a, b) => a.order - b.order);
  },
});
