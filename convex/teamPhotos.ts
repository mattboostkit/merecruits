import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Update a team member's photo URL
export const updatePhoto = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("teamMembers")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (!member) {
      throw new Error(`Team member ${args.name} not found`);
    }

    await ctx.db.patch(member._id, {
      imageUrl: args.imageUrl,
    });

    return {
      success: true,
      name: args.name,
      imageUrl: args.imageUrl,
    };
  },
});

// Update all team member photos with public folder URLs
export const updateAllPhotos = mutation({
  args: {},
  handler: async (ctx) => {
    const photoMappings = [
      { name: "Neil Simmons", filename: "neil-simmons.jpg" },
      { name: "Ellie Waterman", filename: "ellie-waterman.jpg" },
      { name: "Helen Barham", filename: "helen-barham.jpg" },
      { name: "Kate Byrom", filename: "kate-byrom.jpg" },
      { name: "Sarah Bysouth", filename: "sarah-bysouth.jpg" },
      { name: "Melissa Staveley", filename: "melissa-staveley.jpg" },
      { name: "Jo Marsden-Strong", filename: "jo-marsden-strong.jpg" },
      { name: "Rachel Fisher", filename: "rachel-fisher.jpg" },
      { name: "Emma Moss", filename: "emma-moss.jpg" },
      { name: "Isobel Colman", filename: "izzy-colman.jpg", newName: "Izzy Colman" },
    ];

    let updatedCount = 0;

    for (const mapping of photoMappings) {
      const member = await ctx.db
        .query("teamMembers")
        .filter((q) => q.eq(q.field("name"), mapping.name))
        .first();

      if (member) {
        const updates: any = {
          imageUrl: `/team/${mapping.filename}`,
        };

        // Update name if newName is provided
        if (mapping.newName) {
          updates.name = mapping.newName;
        }

        await ctx.db.patch(member._id, updates);
        updatedCount++;
      }
    }

    return {
      success: true,
      message: `Updated ${updatedCount} team member photos and names`,
      updatedCount,
    };
  },
});
