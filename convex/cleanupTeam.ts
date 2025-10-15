import { mutation } from "./_generated/server";

// Remove duplicate team members
export const removeDuplicates = mutation({
  args: {},
  handler: async (ctx) => {
    const teamMembers = await ctx.db.query("teamMembers").collect();

    // Find duplicates of Helen Barham
    const helenRecords = teamMembers.filter(m => m.name === "Helen Barham");

    // Keep only the first one, delete the rest
    if (helenRecords.length > 1) {
      for (let i = 1; i < helenRecords.length; i++) {
        await ctx.db.delete(helenRecords[i]._id);
      }
    }

    return {
      success: true,
      message: `Removed ${helenRecords.length - 1} duplicate Helen Barham records`,
      totalTeamMembers: teamMembers.length - (helenRecords.length - 1),
    };
  },
});
