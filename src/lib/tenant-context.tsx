"use client";

import { createContext, useContext, ReactNode } from "react";
import type { TenantInfo } from "./get-tenant";

const TenantContext = createContext<TenantInfo | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
  tenant: TenantInfo;
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
