import React from "react";
import LegalBase from "@/components/legal/LegalBase";

export default function DataProtectionPage() {
  return (
    <LegalBase title="Data Protection" lastUpdated="1 September 2025">
      <div className="space-y-12">
        <section>
          <p>
            Transparent handling of personal data is very important to us. This
            policy provides information on what personal data we collect, for
            what purpose and to whom we pass it on.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            1. What Data We Collect
          </h2>
          <div className="space-y-4">
            <h3 className="text-text-primary text-xl font-bold">
              Personal Data
            </h3>
            <p>
              We collect information you voluntarily provide, such as your email
              address for newsletter subscriptions or inquiries.
            </p>
            <h3 className="text-text-primary text-xl font-bold">
              Automatically Collected Data
            </h3>
            <p>Technical information collected during your visit includes:</p>
            <ul className="border-border/40 space-y-2 border-l-2 pl-6">
              <li>IP address and device information</li>
              <li>Browser and operating system details</li>
              <li>Pages visited and time spent</li>
              <li>Referrer URL</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            2. How We Use Your Data
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Operating and improving our website",
              "Providing relevant content",
              "Sending newsletters (with consent)",
              "Measuring performance and usage",
              "Ensuring website security",
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
            3. Third-Party Services
          </h2>
          <p>
            We use a limited number of third-party services to support our
            website and marketing efforts, including Google Analytics, Meta
            Pixel, TikTok Pixel, MailChimp, Vimeo, and Cloudflare.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            4. Your Rights
          </h2>
          <p>
            Under relevant data protection laws, you have the right to access,
            rectification, deletion, and portability of your data.
          </p>
          <p>
            To exercise your rights, contact us at{" "}
            <a
              href="mailto:info@wefik.in"
              className="text-accent hover:text-accent-bright font-bold underline transition-all"
            >
              info@wefik.in
            </a>
            .
          </p>
        </section>

        <section className="bg-bg-secondary rounded-3xl p-8">
          <h2 className="font-big text-text-primary mb-4 text-2xl font-black tracking-tight uppercase">
            Data Security
          </h2>
          <p className="text-sm">
            We implement technical and organizational measures to protect your
            data against unauthorized access, alteration, or loss. Data
            transmitted to our servers is encrypted via SSL/TLS.
          </p>
        </section>
      </div>
    </LegalBase>
  );
}
