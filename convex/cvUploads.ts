import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Submit a CV upload
export const submit = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    jobReference: v.optional(v.string()),
    coverLetter: v.optional(v.string()),
    fileName: v.string(),
  },
  handler: async (ctx, args) => {
    // Find job by slug if reference provided
    let jobId: Id<"jobs"> | undefined = undefined;
    if (args.jobReference) {
      const job = await ctx.db
        .query("jobs")
        .withIndex("by_slug", (q) => q.eq("slug", args.jobReference!))
        .first();
      jobId = job?._id;
    }

    const cvUploadId = await ctx.db.insert("cvUploads", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      fileName: args.fileName,
      fileUrl: `/uploads/cvs/${args.fileName}`, // TODO: Implement actual file storage
      jobId: jobId,
      message: args.coverLetter,
    });

    // TODO: Upload file to storage (Convex file storage or S3)
    // TODO: Send notification email to admin
    // TODO: Send confirmation email to applicant

    return cvUploadId;
  },
});

// Query to list all CV uploads - for admin use
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const cvUploads = await ctx.db.query("cvUploads").collect();

    // Enrich with job details if jobId exists
    const enrichedUploads = await Promise.all(
      cvUploads.map(async (upload) => {
        if (upload.jobId) {
          const job = await ctx.db.get(upload.jobId);
          return {
            ...upload,
            jobTitle: job?.title,
            jobSlug: job?.slug,
          };
        }
        return upload;
      })
    );

    return enrichedUploads.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Query to get CV uploads by email
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const cvUploads = await ctx.db
      .query("cvUploads")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
    return cvUploads.sort((a, b) => b._creationTime - a._creationTime);
  },
});

// Query to get CV uploads for a specific job
export const getByJob = query({
  args: { jobId: v.id("jobs") },
  handler: async (ctx, args) => {
    const cvUploads = await ctx.db
      .query("cvUploads")
      .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
      .collect();
    return cvUploads.sort((a, b) => b._creationTime - a._creationTime);
  },
});
