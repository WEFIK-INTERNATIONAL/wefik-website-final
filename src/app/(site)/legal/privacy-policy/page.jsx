import { SEO, canonical } from "@/lib/seo";
import React from "react";
import LegalBase from "@/components/legal/LegalBase";

export const metadata = {
  title: "Privacy Policy",
  alternates: { canonical: `${SEO.domain}/legal/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalBase title="Privacy Policy" lastUpdated="1 September 2025">
      <div className="space-y-12">
        <section>
          <p>
            At{" "}
            <span className="text-text-primary font-bold">
              WEFIK INTERNATIONAL LTD
            </span>
            , one of our main priorities is the privacy of our visitors. This
            Privacy Policy document outlines what information we collect, how we
            use it, and your rights regarding that information. This policy
            applies only to our online activities and is valid for visitors to
            our website with regards to the information they shared and/or
            collected on our website.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            1. Consent
          </h2>
          <p>
            By using our website, you consent to our Privacy Policy and agree to
            its terms. For our Terms and Conditions, please visit our{" "}
            <a
              href="/legal/terms"
              className="text-accent hover:text-accent-bright font-bold underline transition-colors"
            >
              Terms & Conditions
            </a>{" "}
            page.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            2. Information We Collect
          </h2>
          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear at the
            point we request it.
          </p>
          <ul className="border-border/40 space-y-4 border-l-2 pl-6">
            <li>
              <span className="text-text-primary font-bold">
                Direct Contact:
              </span>{" "}
              If you contact us directly, we may receive additional information
              about you such as your name, email address, phone number, message
              contents, and attachments.
            </li>
            <li>
              <span className="text-text-primary font-bold">
                Account Registration:
              </span>{" "}
              If you register for an account, we may ask for contact details
              such as name, company name, address, email address, and telephone
              number.
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            3. How We Use Your Information
          </h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Provide, operate, and maintain our website",
              "Improve, personalize, and expand our website",
              "Understand and analyze how you use our website",
              "Develop new products, services, and features",
              "Communicate for customer service and marketing",
              "Send you emails and newsletters",
              "Detect and prevent fraud",
            ].map((item, i) => (
              <li
                key={i}
                className="bg-bg-secondary rounded-xl p-4 text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            4. Log Files
          </h2>
          <p>
            WEFIK INTERNATIONAL LTD uses log files. These files log visitors
            when they visit the site. Information collected includes IP
            addresses, browser type, ISP, date and time stamps, referring/exit
            pages, and number of clicks. This data is used for analyzing trends,
            administering the site, and tracking user behavior.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            5. Cookies and Web Beacons
          </h2>
          <p>
            We use cookies to store information such as visitor preferences and
            the pages visited. This helps us optimize user experience by
            customizing content based on browser type. For more details, see our{" "}
            <a
              href="/legal/cookiepolicy"
              className="text-accent hover:text-accent-bright font-bold underline transition-colors"
            >
              Cookie Policy
            </a>
            .
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            6. Advertising Partners
          </h2>
          <p>
            Third-party ad servers or networks use technologies like cookies,
            JavaScript, or web beacons. They automatically receive your IP
            address when this occurs. WEFIK INTERNATIONAL LTD has no access to
            or control over these cookies.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            7. GDPR & CCPA Rights
          </h2>
          <p>
            Depending on your location, you have rights such as access to your
            personal data, rectification of inaccurate data, deletion of data,
            and the right to object to processing.
          </p>
          <p>
            If you make a request, we will respond within 1 month. To exercise
            these rights, please contact us.
          </p>
        </section>

        <section className="bg-bg-secondary rounded-3xl p-8">
          <h2 className="font-big text-text-primary mb-4 text-2xl font-black tracking-tight uppercase">
            Contact Information
          </h2>
          <p className="text-sm">
            If you believe your child provided such information, or if you have
            any questions about this policy, please contact us immediately.
          </p>
        </section>
      </div>
    </LegalBase>
  );
}
