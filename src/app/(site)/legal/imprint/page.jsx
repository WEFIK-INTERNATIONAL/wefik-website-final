import { SEO, canonical } from "@/lib/seo";
import React from "react";
import LegalBase from "@/components/legal/LegalBase";

export const metadata = {
  title: "Imprint",
  alternates: { canonical: `${SEO.domain}/legal/imprint` },
  robots: { index: true, follow: true },
};

export default function ImprintPage() {
  return (
    <LegalBase title="Imprint" lastUpdated="1 September 2025">
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            Contact Information
          </h2>
          <div className="bg-bg-secondary rounded-3xl p-8">
            <address className="space-y-2 text-lg not-italic">
              <p className="text-text-primary font-bold">
                WEFIK INTERNATIONAL LTD
              </p>
              <p>Kestopur Salt Lake</p>
              <p>Kolkata, West Bengal, India</p>
              <div className="space-y-2 overflow-hidden pt-4">
                <p>
                  <span className="text-text-primary font-bold">Phone:</span>{" "}
                  +91 9609653522
                </p>
                <p>
                  <span className="text-text-primary font-bold">Email:</span>{" "}
                  <a
                    href="mailto:info@wefik.in"
                    className="text-accent hover:text-accent-bright font-bold underline transition-all"
                  >
                    info@wefik.in
                  </a>
                </p>
              </div>
            </address>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            Represented By
          </h2>
          <p>Arjun Mehta, Founder & Creative Director</p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            Disclaimer
          </h2>
          <p>
            References and links to third-party websites are outside our area of
            responsibility. Any responsibility for such websites is rejected.
            Access and use of such websites is at the user&apos;s own risk.
          </p>
        </section>
      </div>
    </LegalBase>
  );
}
