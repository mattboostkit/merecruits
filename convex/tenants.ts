import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get tenant by subdomain (for routing)
export const getBySubdomain = query({
  args: { subdomain: v.string() },
  handler: async (ctx, args) => {
    const tenant = await ctx.db
      .query("tenants")
      .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
      .first();

    return tenant;
  },
});

// Get tenant by custom domain
export const getByDomain = query({
  args: { domain: v.string() },
  handler: async (ctx, args) => {
    const tenant = await ctx.db
      .query("tenants")
      .withIndex("by_customDomain", (q) => q.eq("customDomain", args.domain))
      .first();

    return tenant;
  },
});

// Get tenant by ID
export const getById = query({
  args: { id: v.id("tenants") },
  handler: async (ctx, args) => {
    const tenant = await ctx.db.get(args.id);
    return tenant;
  },
});

// List all tenants (for super admin)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const tenants = await ctx.db.query("tenants").collect();
    return tenants.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// List active tenants
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const tenants = await ctx.db
      .query("tenants")
      .withIndex("by_active", (q) => q.eq("active", true))
      .collect();
    return tenants.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Create a new tenant
export const create = mutation({
  args: {
    name: v.string(),
    subdomain: v.string(),
    customDomain: v.optional(v.string()),
    logo: v.string(),
    primaryColor: v.string(),
    secondaryColor: v.string(),
    companyEmail: v.string(),
    companyPhone: v.string(),
    companyAddress: v.optional(v.string()),
    facebookUrl: v.optional(v.string()),
    twitterUrl: v.optional(v.string()),
    linkedInUrl: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),
    plan: v.union(v.literal("TRIAL"), v.literal("STARTER"), v.literal("PROFESSIONAL"), v.literal("ENTERPRISE")),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    aboutUs: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Check if subdomain already exists
    const existingTenant = await ctx.db
      .query("tenants")
      .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
      .first();

    if (existingTenant) {
      throw new Error("Subdomain already taken");
    }

    // Set plan-based settings
    let settings;
    switch (args.plan) {
      case "TRIAL":
      case "STARTER":
        settings = {
          maxActiveJobs: 10,
          maxCvAnalysesPerMonth: 50,
          maxUsers: 1,
          allowCustomDomain: false,
          allowApiAccess: false,
          showPoweredBy: true,
          aiCvAnalysisEnabled: true,
          cvAnalysesUsedThisMonth: 0,
          usageResetDate: now + 30 * 24 * 60 * 60 * 1000, // 30 days
        };
        break;
      case "PROFESSIONAL":
        settings = {
          maxActiveJobs: -1, // unlimited
          maxCvAnalysesPerMonth: -1,
          maxUsers: 5,
          allowCustomDomain: true,
          allowApiAccess: false,
          showPoweredBy: false,
          aiCvAnalysisEnabled: true,
          cvAnalysesUsedThisMonth: 0,
          usageResetDate: now + 30 * 24 * 60 * 60 * 1000,
        };
        break;
      case "ENTERPRISE":
        settings = {
          maxActiveJobs: -1,
          maxCvAnalysesPerMonth: -1,
          maxUsers: -1,
          allowCustomDomain: true,
          allowApiAccess: true,
          showPoweredBy: false,
          aiCvAnalysisEnabled: true,
          cvAnalysesUsedThisMonth: 0,
          usageResetDate: now + 30 * 24 * 60 * 60 * 1000,
        };
        break;
    }

    const tenantId = await ctx.db.insert("tenants", {
      name: args.name,
      subdomain: args.subdomain,
      customDomain: args.customDomain,
      logo: args.logo,
      primaryColor: args.primaryColor,
      secondaryColor: args.secondaryColor,
      companyEmail: args.companyEmail,
      companyPhone: args.companyPhone,
      companyAddress: args.companyAddress,
      facebookUrl: args.facebookUrl,
      twitterUrl: args.twitterUrl,
      linkedInUrl: args.linkedInUrl,
      instagramUrl: args.instagramUrl,
      plan: args.plan,
      subscriptionStatus: args.plan === "TRIAL" ? "TRIAL" : "ACTIVE",
      trialEndsAt: args.plan === "TRIAL" ? now + 14 * 24 * 60 * 60 * 1000 : undefined, // 14 days
      settings,
      metaTitle: args.metaTitle,
      metaDescription: args.metaDescription,
      aboutUs: args.aboutUs,
      active: true,
      createdAt: now,
      updatedAt: now,
    });

    return tenantId;
  },
});

// Update tenant
export const update = mutation({
  args: {
    id: v.id("tenants"),
    name: v.optional(v.string()),
    customDomain: v.optional(v.string()),
    logo: v.optional(v.string()),
    primaryColor: v.optional(v.string()),
    secondaryColor: v.optional(v.string()),
    companyEmail: v.optional(v.string()),
    companyPhone: v.optional(v.string()),
    companyAddress: v.optional(v.string()),
    facebookUrl: v.optional(v.string()),
    twitterUrl: v.optional(v.string()),
    linkedInUrl: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    aboutUs: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Update tenant plan
export const updatePlan = mutation({
  args: {
    id: v.id("tenants"),
    plan: v.union(v.literal("STARTER"), v.literal("PROFESSIONAL"), v.literal("ENTERPRISE")),
  },
  handler: async (ctx, args) => {
    const tenant = await ctx.db.get(args.id);
    if (!tenant) {
      throw new Error("Tenant not found");
    }

    const now = Date.now();
    let settings;

    switch (args.plan) {
      case "STARTER":
        settings = {
          ...tenant.settings,
          maxActiveJobs: 10,
          maxCvAnalysesPerMonth: 50,
          maxUsers: 1,
          allowCustomDomain: false,
          allowApiAccess: false,
          showPoweredBy: true,
        };
        break;
      case "PROFESSIONAL":
        settings = {
          ...tenant.settings,
          maxActiveJobs: -1,
          maxCvAnalysesPerMonth: -1,
          maxUsers: 5,
          allowCustomDomain: true,
          allowApiAccess: false,
          showPoweredBy: false,
        };
        break;
      case "ENTERPRISE":
        settings = {
          ...tenant.settings,
          maxActiveJobs: -1,
          maxCvAnalysesPerMonth: -1,
          maxUsers: -1,
          allowCustomDomain: true,
          allowApiAccess: true,
          showPoweredBy: false,
        };
        break;
    }

    await ctx.db.patch(args.id, {
      plan: args.plan,
      settings,
      updatedAt: now,
    });

    return args.id;
  },
});

// Increment CV analysis usage
export const incrementCvUsage = mutation({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const tenant = await ctx.db.get(args.tenantId);
    if (!tenant) {
      throw new Error("Tenant not found");
    }

    const now = Date.now();

    // Check if we need to reset monthly usage
    if (now > tenant.settings.usageResetDate) {
      await ctx.db.patch(args.tenantId, {
        settings: {
          ...tenant.settings,
          cvAnalysesUsedThisMonth: 1,
          usageResetDate: now + 30 * 24 * 60 * 60 * 1000,
        },
        updatedAt: now,
      });
    } else {
      // Increment usage
      await ctx.db.patch(args.tenantId, {
        settings: {
          ...tenant.settings,
          cvAnalysesUsedThisMonth: tenant.settings.cvAnalysesUsedThisMonth + 1,
        },
        updatedAt: now,
      });
    }

    return { success: true };
  },
});

// Check if tenant can use CV analysis (within limits)
export const canUseCvAnalysis = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const tenant = await ctx.db.get(args.tenantId);
    if (!tenant) {
      return false;
    }

    // Unlimited for Pro/Enterprise
    if (tenant.settings.maxCvAnalysesPerMonth === -1) {
      return true;
    }

    // Check if within limit
    return tenant.settings.cvAnalysesUsedThisMonth < tenant.settings.maxCvAnalysesPerMonth;
  },
});

// Suspend tenant (for failed payments)
export const suspend = mutation({
  args: { id: v.id("tenants") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      subscriptionStatus: "SUSPENDED",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// Reactivate tenant
export const reactivate = mutation({
  args: { id: v.id("tenants") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      subscriptionStatus: "ACTIVE",
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});
