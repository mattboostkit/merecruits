import { headers } from "next/headers";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface TenantBranding {
  logo: string;
  primary: string;
  secondary: string;
  accent?: string;
  primaryForeground?: string;
  secondaryForeground?: string;
  heroImage?: string;
  seoImage?: string;
  favicon?: string;
  tagline?: string;
  poweredByLink?: string;
  poweredByText?: string;
}

interface TenantContact {
  email: string;
  phone: string;
  address?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedInUrl?: string;
  instagramUrl?: string;
}

interface TenantInfo {
  tenantId: Id<"tenants">;
  subdomain: string;
  customDomain?: string;
  name: string;
  branding: TenantBranding;
  contact: TenantContact;
  meta: {
    title?: string;
    description?: string;
  };
  aboutUs?: string;
  settings: {
    maxActiveJobs: number;
    maxCvAnalysesPerMonth: number;
    maxUsers: number;
    allowCustomDomain: boolean;
    allowApiAccess: boolean;
    showPoweredBy: boolean;
    aiCvAnalysisEnabled: boolean;
    cvAnalysesUsedThisMonth: number;
    usageResetDate: number;
  };
}

export async function getTenant(): Promise<TenantInfo | null> {
  const headersList = await headers();
  const subdomainHeader = headersList.get("x-tenant-subdomain");
  const customDomain = headersList.get("x-tenant-custom-domain");

  // Default to ME Recruits for development if no headers are present
  const fallbackSubdomain = "merecruits";

  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

    const tenant = customDomain
      ? await fetchQuery(
          api.tenants.getByDomain,
          { domain: customDomain },
          { url: convexUrl }
        )
      : await fetchQuery(
          api.tenants.getBySubdomain,
          { subdomain: subdomainHeader || fallbackSubdomain },
          { url: convexUrl }
        );

    if (!tenant) {
      const attempted = customDomain || subdomainHeader || fallbackSubdomain;
      console.warn(`Tenant not found for identifier: ${attempted}`);
      return null;
    }

    return {
      tenantId: tenant._id,
      subdomain: tenant.subdomain,
      customDomain: tenant.customDomain ?? undefined,
      name: tenant.name,
      branding: {
        logo: tenant.logo,
        primary: tenant.primaryColor,
        secondary: tenant.secondaryColor,
        accent: tenant.accentColor ?? undefined,
        primaryForeground: tenant.primaryForegroundColor ?? undefined,
        secondaryForeground: tenant.secondaryForegroundColor ?? undefined,
        heroImage: tenant.heroImage ?? undefined,
        seoImage: tenant.seoImage ?? undefined,
        favicon: tenant.favicon ?? undefined,
        tagline: tenant.tagline ?? undefined,
        poweredByLink: tenant.poweredByLink ?? undefined,
        poweredByText: tenant.poweredByText ?? undefined,
      },
      contact: {
        email: tenant.companyEmail,
        phone: tenant.companyPhone,
        address: tenant.companyAddress ?? undefined,
        facebookUrl: tenant.facebookUrl ?? undefined,
        twitterUrl: tenant.twitterUrl ?? undefined,
        linkedInUrl: tenant.linkedInUrl ?? undefined,
        instagramUrl: tenant.instagramUrl ?? undefined,
      },
      meta: {
        title: tenant.metaTitle ?? undefined,
        description: tenant.metaDescription ?? undefined,
      },
      aboutUs: tenant.aboutUs ?? undefined,
      settings: tenant.settings,
    };
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
}

export type { TenantInfo, TenantBranding };
