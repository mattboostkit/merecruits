import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { TenantWrapper } from "@/components/providers/tenant-wrapper";
import { getTenant } from "@/lib/get-tenant";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const DEFAULT_NAME = "ME Recruits";
const DEFAULT_URL = "https://www.merecruits.com";
const DEFAULT_DESCRIPTION =
  "Leading recruitment agency specialising in permanent and temporary office-based staff across Kent and the wider South East.";
const DEFAULT_TAGLINE = "Connecting people, purpose and potential across Kent.";
const DEFAULT_SEO_IMAGE = "https://www.merecruits.com/social-share.png";

const deriveUrl = (params: { customDomain?: string; subdomain?: string }) => {
  if (params.customDomain) {
    return `https://${params.customDomain}`;
  }
  if (params.subdomain) {
    return `https://${params.subdomain}.hirekit.app`;
  }
  return DEFAULT_URL;
};

export async function generateMetadata(): Promise<Metadata> {
  const tenant = await getTenant();
  const name = tenant?.name ?? DEFAULT_NAME;
  const description =
    tenant?.meta.description ?? tenant?.aboutUs ?? DEFAULT_DESCRIPTION;
  const canonicalUrl = deriveUrl({
    customDomain: tenant?.customDomain,
    subdomain: tenant?.subdomain,
  });
  const seoImage = tenant?.branding.seoImage ?? DEFAULT_SEO_IMAGE;
  const tagline = tenant?.branding.tagline ?? DEFAULT_TAGLINE;

  return {
    title: {
      default: `${name} | ${tagline}`,
      template: `%s | ${name}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: canonicalUrl,
      siteName: name,
      title: `${name} | ${tagline}`,
      description,
      images: seoImage ? [seoImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: "@hirekitapp",
      title: `${name} | ${tagline}`,
      description,
      images: seoImage ? [seoImage] : undefined,
    },
    icons: tenant?.branding.favicon
      ? {
          icon: [
            {
              url: tenant.branding.favicon,
            },
          ],
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenant = await getTenant();

  const canonicalUrl = deriveUrl({
    customDomain: tenant?.customDomain,
    subdomain: tenant?.subdomain,
  });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: tenant?.name ?? DEFAULT_NAME,
    url: canonicalUrl,
    logo: tenant?.branding.logo ?? "https://www.merecruits.com/logo.png",
    description:
      tenant?.aboutUs ??
      tenant?.meta.description ??
      DEFAULT_DESCRIPTION,
    telephone: tenant?.contact.phone ?? "+44-1732-497979",
    email: tenant?.contact.email ?? "info@merecruits.com",
    sameAs: [
      tenant?.contact.facebookUrl,
      tenant?.contact.twitterUrl,
      tenant?.contact.linkedInUrl,
      tenant?.contact.instagramUrl,
    ].filter((url): url is string => Boolean(url)),
    address: tenant?.contact.address
      ? {
          "@type": "PostalAddress",
          streetAddress: tenant.contact.address,
        }
      : undefined,
    tagline: tenant?.branding.tagline ?? DEFAULT_TAGLINE,
  };

  return (
    <html
      lang="en-GB"
      data-tenant={tenant?.subdomain ?? "hirekit"}
      data-platform="hirekit"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${fraunces.variable} antialiased font-sans min-h-screen flex flex-col`}
      >
        <ConvexClientProvider>
          <TenantWrapper tenant={tenant}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </TenantWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
