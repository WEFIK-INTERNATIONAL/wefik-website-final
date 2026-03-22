import {
  ppNeueMontreal,
  goodMonolith,
  bigShouldersDisplay,
  pangramSans,
} from "./fonts";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { LoaderProvider } from "@/components/ui/LoaderProvider";
import { SEO, canonical } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SEO.domain),

  title: {
    default: `${SEO.siteName} — ${SEO.tagline}`,
    template: `%s | ${SEO.siteName}`,
  },

  description: SEO.description,
  keywords: SEO.keywords,

  authors: [{ name: SEO.founder.name, url: SEO.domain }],
  creator: SEO.siteName,
  publisher: SEO.siteName,

  alternates: {
    canonical: SEO.domain,
    languages: { "en-IN": SEO.domain },
  },

  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: SEO.domain,
    siteName: SEO.siteName,
    title: `${SEO.siteName} — ${SEO.tagline}`,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImage.url,
        width: SEO.ogImage.width,
        height: SEO.ogImage.height,
        alt: SEO.ogImage.alt,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: SEO.social.twitterHandle,
    creator: SEO.social.twitterHandle,
    title: `${SEO.siteName} — ${SEO.tagline}`,
    description: SEO.description,
    images: [SEO.ogImage.url],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
    bing: "YOUR_BING_WEBMASTER_CODE",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SEO.domain}/#organization`,
  name: SEO.siteName,
  alternateName: "Wefik India",
  url: SEO.domain,
  logo: {
    "@type": "ImageObject",
    url: `${SEO.domain}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  description: SEO.description,
  email: SEO.contact.email,
  telephone: SEO.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: SEO.address.city,
    addressRegion: SEO.address.state,
    addressCountry: SEO.address.countryCode,
  },
  founder: {
    "@type": "Person",
    name: SEO.founder.name,
  },
  sameAs: [
    SEO.social.linkedin,
    SEO.social.instagram,
    SEO.social.twitter,
    SEO.social.facebook,
    SEO.social.behance,
    SEO.social.medium,
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SEO.contact.phone,
      contactType: "customer service",
      email: SEO.contact.email,
      areaServed: "IN",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      email: SEO.contact.careerEmail,
      contactType: "human resources",
      areaServed: "IN",
      availableLanguage: "English",
    },
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: SEO.services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s,
        provider: { "@id": `${SEO.domain}/#organization` },
      },
    })),
  },
};

export const revalidate = 60;

export default function RootLayout({ children }) {
  return (
    <html lang={SEO.language} suppressHydrationWarning>
      <head>
        {}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${goodMonolith.variable} ${ppNeueMontreal.variable} ${bigShouldersDisplay.variable} ${pangramSans.variable} font-body bg-bg-primary text-text-primary antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoaderProvider>{children}</LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
