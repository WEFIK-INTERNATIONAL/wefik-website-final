import React from "react";
import LegalBase from "@/components/legal/LegalBase";

export default function RefundPolicyPage() {
  return (
    <LegalBase title="Refund & Cancellation" lastUpdated="1 September 2025">
      <div className="space-y-12">
        <section>
          <p>
            Thank you for choosing our Web Development / SAAS / Software
            Development services. We strive to provide the best user experience
            and customer satisfaction.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            1. Cancellation Policy
          </h2>
          <div className="space-y-4">
            <h3 className="text-text-primary text-xl font-bold">
              1.1 Subscription-Based Services
            </h3>
            <p>
              For subscription-based products or services, you can cancel your
              subscription at any time. Upon cancellation, you will continue to
              have access until the end of the current billing cycle.
            </p>
            <h3 className="text-text-primary text-xl font-bold">
              1.2 Perpetual License Products
            </h3>
            <p>
              Perpetual license products are one-time purchases without an
              expiration date. Cancellation does not apply as they are not tied
              to a subscription model.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            2. Refund Policy
          </h2>
          <div className="space-y-4">
            <h3 className="text-text-primary text-xl font-bold">
              2.1 Eligibility for Refund
            </h3>
            <p>You may be eligible for a refund in the following cases:</p>
            <ul className="border-border/40 space-y-4 border-l-2 pl-6">
              <li>
                <span className="text-text-primary font-bold">
                  Technical Issues:
                </span>{" "}
                Significant technical issues or compatibility problems that
                prevent proper functioning.
              </li>
              <li>
                <span className="text-text-primary font-bold">
                  Dissatisfaction:
                </span>{" "}
                Dissatisfaction with features or performance, provided
                constructive feedback is given.
              </li>
              <li>
                <span className="text-text-primary font-bold">
                  Unauthorized Charges:
                </span>{" "}
                Unauthorized charges resulting from a purchase on our website.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-big text-text-primary text-3xl font-black tracking-tight uppercase">
            3. Refund Process
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              "Contact Support: Submit a refund request with order details.",
              "Evaluation: Our team will evaluate the request.",
              "Decision: If approved, refund is initiated within 7 days.",
              "Deactivation: For SAAS, software must be deactivated.",
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

        <section className="bg-bg-secondary rounded-3xl p-8">
          <h2 className="font-big text-text-primary mb-4 text-2xl font-black tracking-tight uppercase">
            Need Help?
          </h2>
          <p className="text-sm">
            For any questions or concerns regarding this policy, please contact
            our support team at{" "}
            <a
              href="mailto:info@wefik.in"
              className="text-accent hover:text-accent-bright font-bold underline transition-all"
            >
              info@wefik.in
            </a>
            .
          </p>
        </section>
      </div>
    </LegalBase>
  );
}
