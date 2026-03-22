import { SEO } from "@/lib/seo";

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function LegalLayout({ children }) {
  return <>{children}</>;
}
