import React from "react";
import LegalBase from "@/components/legal/LegalBase";

export default function CookiePolicyPage() {
  return (
    <LegalBase title="Cookie Policy" lastUpdated="1 September 2025">
      <div className="space-y-12">
        <section>
          <p>
            This Cookie Policy explains how{" "}
            <span className="text-text-primary font-bold">
              WEFIK INTERNATIONAL LTD
            </span>{" "}
            uses cookies and similar technologies to recognize you when you
            visit our website.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            1. What are cookies?
          </h2>
          <p>
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners in order to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            2. Why do we use cookies?
          </h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some
            cookies are required for technical reasons in order for our Website
            to operate, and we refer to these as &quot;essential&quot; or
            &quot;strictly necessary&quot; cookies.
          </p>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Essential website cookies",
              "Performance and functionality cookies",
              "Analytics and customization cookies",
              "Advertising and targeting cookies",
              "Social media cookies",
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
            3. How can I control cookies?
          </h2>
          <p>
            You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie rights by setting your preferences in
            the Cookie Consent Manager. The Cookie Consent Manager allows you to
            select which categories of cookies you accept or reject.
          </p>
          <p>
            You can also set or amend your web browser controls to accept or
            refuse cookies. If you choose to reject cookies, you may still use
            our website though your access to some functionality and areas of
            our website may be restricted.
          </p>
        </section>

        <section className="bg-bg-secondary rounded-3xl p-8">
          <h2 className="font-big text-text-primary mb-4 text-2xl font-black tracking-tight uppercase">
            More Information
          </h2>
          <p className="text-sm">
            For more information about how we use your personal information,
            please read our{" "}
            <a
              href="/legal/privacy-policy"
              className="text-accent hover:text-accent-bright font-bold underline transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </LegalBase>
  );
}
