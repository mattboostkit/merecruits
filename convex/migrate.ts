import { mutation } from "./_generated/server";

// DELETE ALL DATA - Use with caution!
// This clears the database so we can seed with multi-tenant data
export const clearAllData = mutation({
  args: {},
  handler: async (ctx) => {
    console.log("WARNING: Deleting all data from database...");

    // Delete all jobs
    const jobs = await ctx.db.query("jobs").collect();
    for (const job of jobs) {
      await ctx.db.delete(job._id);
    }
    console.log(`Deleted ${jobs.length} jobs`);

    // Delete all CV uploads
    const cvUploads = await ctx.db.query("cvUploads").collect();
    for (const cv of cvUploads) {
      await ctx.db.delete(cv._id);
    }
    console.log(`Deleted ${cvUploads.length} CV uploads`);

    // Delete all news articles
    const articles = await ctx.db.query("newsArticles").collect();
    for (const article of articles) {
      await ctx.db.delete(article._id);
    }
    console.log(`Deleted ${articles.length} news articles`);

    // Delete all team members
    const teamMembers = await ctx.db.query("teamMembers").collect();
    for (const member of teamMembers) {
      await ctx.db.delete(member._id);
    }
    console.log(`Deleted ${teamMembers.length} team members`);

    // Delete all contact submissions
    const contacts = await ctx.db.query("contactSubmissions").collect();
    for (const contact of contacts) {
      await ctx.db.delete(contact._id);
    }
    console.log(`Deleted ${contacts.length} contact submissions`);

    // Delete all tenants (if any exist)
    const tenants = await ctx.db.query("tenants").collect();
    for (const tenant of tenants) {
      await ctx.db.delete(tenant._id);
    }
    console.log(`Deleted ${tenants.length} tenants`);

    return {
      success: true,
      message: "All data cleared successfully. Database is now empty.",
      deleted: {
        jobs: jobs.length,
        cvUploads: cvUploads.length,
        articles: articles.length,
        teamMembers: teamMembers.length,
        contacts: contacts.length,
        tenants: tenants.length,
      },
    };
  },
});
