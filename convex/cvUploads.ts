import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";

// Generate upload URL for CV file
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Get file URL from storage
export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Submit a CV upload with file storage
export const submit = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    jobReference: v.optional(v.string()),
    coverLetter: v.optional(v.string()),
    fileName: v.string(),
    storageId: v.id("_storage"), // Convex storage ID for the uploaded file
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

    // Get the file URL from storage
    const fileUrl = await ctx.storage.getUrl(args.storageId);

    const cvUploadId = await ctx.db.insert("cvUploads", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      fileName: args.fileName,
      fileUrl: fileUrl!,
      jobId: jobId,
      message: args.coverLetter,
    });

    // TODO: Schedule email notification after deployment
    // Once deployed, uncomment this to enable automatic email notifications:
    // await ctx.scheduler.runAfter(0, internal.cvUploads.sendNotifications, {
    //   cvUploadId,
    //   applicantEmail: args.email,
    //   applicantName: `${args.firstName} ${args.lastName}`,
    //   jobReference: args.jobReference,
    // });

    return cvUploadId;
  },
});

// Action to send email notifications (uses external API)
export const sendNotifications = action({
  args: {
    cvUploadId: v.id("cvUploads"),
    applicantEmail: v.string(),
    applicantName: v.string(),
    jobReference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || "info@merecruits.com";

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not configured, skipping email notifications");
      return { success: false, reason: "Email not configured" };
    }

    try {
      // Send notification to admin
      const adminEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "ME Recruits <noreply@merecruits.com>",
          to: adminEmail,
          subject: `New CV Submission: ${args.applicantName}`,
          html: `
            <h2>New CV Submission</h2>
            <p><strong>Name:</strong> ${args.applicantName}</p>
            <p><strong>Email:</strong> ${args.applicantEmail}</p>
            ${args.jobReference ? `<p><strong>Job Reference:</strong> ${args.jobReference}</p>` : ""}
            <p><a href="https://dashboard.convex.dev">View in Convex Dashboard</a></p>
          `,
        }),
      });

      // Send confirmation to applicant
      const applicantEmailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "ME Recruits <info@merecruits.com>",
          to: args.applicantEmail,
          subject: "CV Received - ME Recruits",
          html: `
            <h2>Thank You for Your Application</h2>
            <p>Dear ${args.applicantName},</p>
            <p>We have received your CV and will review it shortly. If your profile matches our current opportunities, we will be in touch.</p>
            <p>Best regards,<br/>The ME Recruits Team</p>
          `,
        }),
      });

      return {
        success: true,
        adminEmailSent: adminEmailResponse.ok,
        applicantEmailSent: applicantEmailResponse.ok,
      };
    } catch (error) {
      console.error("Error sending emails:", error);
      return { success: false, error: String(error) };
    }
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
