import { headers } from "next/headers";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface TenantInfo {
  tenantId: Id<"tenants">;
  subdomain: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export async function getTenant(): Promise<TenantInfo | null> {
  const headersList = await headers();
  const subdomain = headersList.get("x-tenant-subdomain");
  const customDomain = headersList.get("x-tenant-custom-domain");

  // For now, default to ME Recruits for development
  // In production, this will look up the tenant from the database
  const defaultSubdomain = subdomain || "merecruits";

  try {
    // Fetch tenant from Convex using server-side fetchQuery
    const tenant = await fetchQuery(
      api.tenants.getBySubdomain,
      { subdomain: defaultSubdomain },
      { url: process.env.NEXT_PUBLIC_CONVEX_URL! }
    );

    if (!tenant) {
      // If no tenant found, return null
      // In production, this might redirect to a 404 or signup page
      console.warn(`Tenant not found for subdomain: ${defaultSubdomain}`);
      return null;
    }

    return {
      tenantId: tenant._id,
      subdomain: tenant.subdomain,
      name: tenant.name,
      logo: tenant.logo,
      primaryColor: tenant.primaryColor,
      secondaryColor: tenant.secondaryColor,
    };
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return null;
  }
}
