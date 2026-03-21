"use client";

import React, { useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

const legalLinks = [
  { name: "Privacy Policy", href: "/legal/privacy-policy" },
  { name: "Terms & Conditions", href: "/legal/terms" },
  { name: "Cookie Policy", href: "/legal/cookiepolicy" },
  { name: "Imprint", href: "/legal/imprint" },
  { name: "Refund & Cancellation", href: "/legal/refund-cancellation-policy" },
  { name: "Data Protection", href: "/legal/data-protection" },
];

function SplitWords({ text, className, style }) {
  return (
    <div className={className} style={style} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
}

export default function LegalBase({ title, children, lastUpdated }) {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".legal-ghost",
        { yPercent: 10, opacity: 0 },
        { yPercent: 0, opacity: 0.03, duration: 1.5 },
        0
      );

      tl.fromTo(
        ".legal-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      tl.fromTo(
        ".legal-headline .split-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.08 },
        0.3
      );

      tl.fromTo(
        ".legal-content",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0.6
      );

      tl.fromTo(
        ".legal-nav-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.05 },
        0.8
      );
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="bg-bg-primary text-text-primary min-h-screen overflow-x-hidden"
    >
      <section className="relative flex flex-col px-5 pt-32 pb-20 md:px-10 md:pt-40 lg:px-16 lg:pt-48">
        <div
          className="legal-ghost font-big pointer-events-none absolute inset-x-0 top-16 leading-none font-black tracking-tighter uppercase select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 20rem)",
            color: "var(--color-text-primary)",
            opacity: 0,
          }}
          aria-hidden
        >
          LEGAL
        </div>

        <div className="legal-meta relative z-10 mb-8 flex items-center justify-between opacity-0">
          <span className="font-accent text-text-muted text-[10px] font-bold tracking-[0.4em] uppercase">
            Wefik International · Legal Center
          </span>
          {lastUpdated && (
            <span className="border-border font-accent text-text-muted rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase">
              Last updated: {lastUpdated}
            </span>
          )}
        </div>

        <div className="relative z-10 mb-20">
          <SplitWords
            text={title}
            className="legal-headline font-big text-text-primary leading-none font-black tracking-tight uppercase"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_2.5fr] lg:gap-24">
          <aside className="sticky top-32 h-fit space-y-8">
            <div className="bg-bg-secondary hidden flex-col gap-4 rounded-3xl p-8 lg:flex">
              <span className="font-accent text-accent text-[9px] font-bold tracking-[0.4em] uppercase">
                Questions?
              </span>
              <p className="font-body text-text-muted text-sm leading-relaxed">
                Contact our support team if you have any questions regarding our
                terms and policies.
              </p>
              <TransitionLink
                href="/contact"
                className="font-accent text-text-primary hover:text-accent group mt-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase transition-colors"
              >
                <span>Get Help</span>
                <ArrowUpRight size={12} />
              </TransitionLink>
            </div>
          </aside>

          <div className="legal-content font-body text-text-muted max-w-4xl space-y-12 text-lg leading-relaxed opacity-0">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
