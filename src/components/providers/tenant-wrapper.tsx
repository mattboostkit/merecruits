"use client";

import { ReactNode, useEffect } from "react";
import { TenantProvider } from "@/lib/tenant-context";
import type { TenantInfo } from "@/lib/get-tenant";

interface TenantWrapperProps {
  children: ReactNode;
  tenant: TenantInfo | null;
}

export function TenantWrapper({ children, tenant }: TenantWrapperProps) {
  useEffect(() => {
    if (!tenant) return;

    const root = document.documentElement;

    const colorMap: Array<[string, string | undefined]> = [
      ["--primary", tenant.branding.primary],
      ["--secondary", tenant.branding.secondary],
      ["--primary-foreground", tenant.branding.primaryForeground],
      ["--secondary-foreground", tenant.branding.secondaryForeground],
      ["--ring", tenant.branding.primary],
    ];

    colorMap.forEach(([token, value]) => {
      if (!value) return;
      root.style.setProperty(token, value);
    });

    if (tenant.branding.accent) {
      root.style.setProperty("--accent", tenant.branding.accent);
    }

    return () => {
      // Clean-up only for tokens we touched.
      colorMap.forEach(([token, value]) => {
        if (!value) return;
        root.style.removeProperty(token);
      });
      if (tenant.branding.accent) {
        root.style.removeProperty("--accent");
      }
    };
  }, [tenant]);

  useEffect(() => {
    if (!tenant?.branding.heroImage) {
      document.body.style.removeProperty("--tenant-hero-image");
      return;
    }
    document.body.style.setProperty(
      "--tenant-hero-image",
      `url('${tenant.branding.heroImage}')`
    );
    return () => {
      document.body.style.removeProperty("--tenant-hero-image");
    };
  }, [tenant]);

  // If no tenant found, show an error message
  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Tenant Not Found</h1>
          <p className="text-gray-600 max-w-md">
            This subdomain is not configured yet. Please contact the HireKit team
            to finish onboarding.
          </p>
        </div>
      </div>
    );
  }

  return <TenantProvider tenant={tenant}>{children}</TenantProvider>;
}
