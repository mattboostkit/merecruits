import { v } from "convex/values";
import { mutation } from "./_generated/server";
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
