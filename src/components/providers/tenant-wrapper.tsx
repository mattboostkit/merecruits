"use client";

import { ReactNode } from "react";
import { TenantProvider } from "@/lib/tenant-context";
import { Id } from "../../../convex/_generated/dataModel";

interface TenantWrapperProps {
  children: ReactNode;
  tenant: {
    tenantId: Id<"tenants">;
    subdomain: string;
    name: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  } | null;
}

export function TenantWrapper({ children, tenant }: TenantWrapperProps) {
  // If no tenant found, show an error message
  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tenant Not Found</h1>
          <p className="text-gray-600">
            This subdomain is not configured. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return <TenantProvider tenant={tenant}>{children}</TenantProvider>;
}
