import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Extract subdomain from hostname
  // Example: merecruits.localhost:3000 -> merecruits
  // Example: merecruits.hirekit.app -> merecruits
  // Example: www.merecruits.com -> custom domain (handled separately)

  let subdomain = "";

  // Check if this is a custom domain (no subdomain, not localhost)
  const isCustomDomain = !hostname.includes("localhost") &&
                         !hostname.includes("hirekit.app") &&
                         !hostname.startsWith("www.");

  if (isCustomDomain) {
    // For custom domains, we'll need to look up the tenant in the database
    // For now, store the full hostname to look up later
    url.searchParams.set("customDomain", hostname);
  } else {
    // Extract subdomain from hostname
    const parts = hostname.split(".");

    // localhost:3000 -> no subdomain (development)
    // subdomain.localhost:3000 -> subdomain
    // subdomain.hirekit.app -> subdomain
    // www.hirekit.app -> no subdomain (main site)

    if (hostname.includes("localhost")) {
      // Development: subdomain.localhost:3000
      const localParts = hostname.split(".");
      if (localParts.length > 1 && localParts[0] !== "www") {
        subdomain = localParts[0].split(":")[0]; // Remove port if present
      }
    } else if (hostname.includes("hirekit.app")) {
      // Production: subdomain.hirekit.app
      if (parts.length >= 3 && parts[0] !== "www") {
        subdomain = parts[0];
      }
    }

    // Store subdomain in URL params for the app to access
    if (subdomain) {
      url.searchParams.set("subdomain", subdomain);
    }
  }

  // Clone the response to add headers
  const response = NextResponse.next({
    request: {
      headers: new Headers(request.headers),
    },
  });

  // Add tenant info to headers for easy access
  if (subdomain) {
    response.headers.set("x-tenant-subdomain", subdomain);
  }
  if (isCustomDomain) {
    response.headers.set("x-tenant-custom-domain", hostname);
  }

  // Check if accessing admin routes (except login page)
  if (request.nextUrl.pathname.startsWith("/admin") &&
      !request.nextUrl.pathname.startsWith("/admin/login")) {

    // Check for authentication cookie
    const authCookie = request.cookies.get("admin_auth");

    if (!authCookie || authCookie.value !== "authenticated") {
      // Redirect to login page
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)",
  ],
};
