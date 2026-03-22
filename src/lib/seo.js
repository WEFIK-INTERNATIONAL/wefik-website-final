export const SEO = {
  siteName: "WEFIK",
  tagline: "Real Life Genie of Your Idea",
  domain: "https://www.wefik.in",
  locale: "en_IN",
  language: "en",

  description:
    "Wefik is a Kolkata-based digital agency that builds premium websites, brands, and digital experiences for startups and businesses across India.",
  shortDescription:
    "Kolkata's digital agency for web design, web development, UI/UX, branding & digital marketing.",

  address: {
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    countryCode: "IN",
  },

  contact: {
    email: "info@wefik.in",
    careerEmail: "career@wefik.in",
    phone: "+919609653522",
    phoneDisplay: "+91 9609653522",
  },

  founder: {
    name: "Sk. Shahinur Islam",
  },

  services: [
    "Web Design",
    "Web Development",
    "UI/UX Design",
    "Branding",
    "Digital Marketing",
    "Shopify Development",
    "WordPress Development",
  ],

  keywords: [
    "digital agency Kolkata",
    "web design agency Kolkata",
    "web development company Kolkata",
    "UI UX design agency India",
    "branding agency Kolkata",
    "Shopify development India",
    "WordPress development India",
    "digital marketing agency Kolkata",
    "web design agency India",
    "creative agency India",
    "wefik",
    "wefik.in",
  ],

  social: {
    instagram: "https://www.instagram.com/wefik.in/",
    twitter: "https://x.com/wefikindia",
    linkedin: "https://www.linkedin.com/company/wefik/",
    facebook: "https://www.facebook.com/wefikinternational/",
    behance: "https://www.behance.net/wefik",
    medium: "https://wefikindia.medium.com/",
    quora: "https://www.quora.com/profile/WEFIK",
    twitterHandle: "@wefikindia",
  },

  ogImage: {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
    alt: "WEFIK — Real Life Genie of Your Idea",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export function canonical(path = "") {
  return `${SEO.domain}${path}`;
}

export function seoTitle(pageTitle) {
  return `${pageTitle} | ${SEO.siteName}`;
}
