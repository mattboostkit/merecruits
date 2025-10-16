"use client";

import { createContext, useContext, ReactNode } from "react";
import { Id } from "../../convex/_generated/dataModel";

interface TenantContextType {
  tenantId: Id<"tenants">;
  subdomain: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
  tenant: TenantContextType;
}

export function TenantProvider({ children, tenant }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
