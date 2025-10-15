import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConvexClientProvider } from "./ConvexClientProvider";

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

export const metadata: Metadata = {
  title: {
    default: "ME Recruits | Recruitment Agency in Kent | Maidstone, Medway & Tunbridge Wells",
    template: "%s | ME Recruits",
  },
  description:
    "Leading recruitment agency in Kent specialising in permanent and temporary office-based staff. Serving Maidstone, Medway, Tunbridge Wells and surrounding ME postcode areas.",
  keywords: [
    "recruitment agency",
    "Kent jobs",
    "Maidstone recruitment",
    "Medway jobs",
    "Tunbridge Wells recruitment",
    "temporary staff",
    "permanent jobs",
    "office jobs Kent",
  ],
  authors: [{ name: "ME Recruits" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.merecruits.com",
    siteName: "ME Recruits",
    title: "ME Recruits | Recruitment Agency in Kent",
    description:
      "Leading recruitment agency in Kent specialising in permanent and temporary office-based staff.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@merecruits",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": "ME Recruits",
    "alternateName": "TN Recruits Limited",
    "url": "https://www.merecruits.com",
    "logo": "https://www.merecruits.com/logo.png",
    "description": "Over 25 years of recruitment expertise in the ME postcode area. Sister company to award-winning TN Recruits, connecting people, purpose and potential.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Suite 166, 80 Churchill Square Business Centre, Kings Hill",
      "addressLocality": "West Malling",
      "addressRegion": "Kent",
      "postalCode": "ME19 4YU",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.2732659,
      "longitude": 0.3959542
    },
    "telephone": "+44-1732-497979",
    "email": "info@merecruits.com",
    "sameAs": [
      "https://www.facebook.com/merecruits",
      "https://twitter.com/merecruits",
      "https://www.linkedin.com/company/me-recruits",
      "https://www.instagram.com/merecruits"
    ],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 51.2732659,
        "longitude": 0.3959542
      },
      "geoRadius": "30000"
    },
    "knowsAbout": [
      "Recruitment",
      "Employment Services",
      "Financial Services Recruitment",
      "Legal Recruitment",
      "Accountancy Recruitment",
      "Marketing Recruitment",
      "IT Recruitment"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "145",
      "bestRating": "5",
      "worstRating": "1"
    },
    "foundingDate": "1999",
    "memberOf": {
      "@type": "Organization",
      "name": "Recruitment & Employment Confederation (REC)"
    }
  };

  return (
    <html lang="en-GB">
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
