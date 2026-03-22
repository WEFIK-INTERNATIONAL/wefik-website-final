import { SEO, canonical } from "@/lib/seo";
import React from "react";
import LegalBase from "@/components/legal/LegalBase";

export const metadata = {
  title: "Terms",
  alternates: { canonical: `${SEO.domain}/legal/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalBase title="Terms & Conditions" lastUpdated="1 September 2025">
      <div className="space-y-12">
        <section>
          <p>
            By accessing this website, operated by{" "}
            <span className="text-text-primary font-bold">
              WEFIK INTERNATIONAL LTD
            </span>
            , you are agreeing to be bound by these Website Terms and Conditions
            of Use and agree that you are responsible for compliance with any
            applicable local laws. If you disagree with any of these terms, you
            are prohibited from accessing this site.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            1. Use License
          </h2>
          <p>
            Permission is granted to temporarily download one copy of the
            materials on WEFIK INTERNATIONAL LTD&apos;s Website for personal,
            non-commercial transitory viewing only.
          </p>
          <ul className="border-border/40 space-y-4 border-l-2 pl-6">
            <li>Modify or copy the materials</li>
            <li>
              Use the materials for any commercial purpose or public display
            </li>
            <li>Attempt to reverse engineer any software on the Website</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>
              Transfer the materials to another person or &quot;mirror&quot;
              them
            </li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            2. Disclaimer
          </h2>
          <p>
            All the materials on WEFIK INTERNATIONAL LTD&apos;s Website are
            provided &quot;as is&quot;. WEFIK INTERNATIONAL LTD makes no
            warranties, expressed or implied, and hereby negates all other
            warranties.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            3. Limitations
          </h2>
          <p>
            WEFIK INTERNATIONAL LTD or its suppliers will not be held
            accountable for any damages that will arise with the use or
            inability to use the materials on the Website, even if notified of
            the possibility of such damage.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            4. Revisions and Errata
          </h2>
          <p>
            The materials appearing on the Website may include technical,
            typographical, or photographic errors. WEFIK INTERNATIONAL LTD does
            not warrant that any of the materials on its Website are accurate,
            complete, or current.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            5. Links
          </h2>
          <p>
            WEFIK INTERNATIONAL LTD has not reviewed all of the sites linked to
            its Website and is not responsible for the contents of any such
            linked site. Use of any linked website is at the user&apos;s own
            risk.
          </p>
        </section>

        <section className="bg-bg-secondary rounded-3xl p-8">
          <h2 className="font-big text-text-primary mb-4 text-2xl font-black tracking-tight uppercase">
            Governing Law
          </h2>
          <p className="text-sm">
            Any claim related to WEFIK INTERNATIONAL LTD&apos;s Website shall be
            governed by the laws of India, without regard to its conflict of law
            provisions.
          </p>
        </section>
      </div>
    </LegalBase>
  );
}
