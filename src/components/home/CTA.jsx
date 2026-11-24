"use client";

import React, { useRef } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, Mail, Phone, Clock } from "lucide-react";
import Tag from "../ui/Tag";
import BookACall from "../ui/BookACall";
import { SEO } from "@/lib/seo";

const POINTS = ["Free 30-min call", "Reply within 24h", "No commitment"];

const CONTACTS = [
  {
    icon: Mail,
    label: "Email us",
    value: SEO.contact.email,
    href: `mailto:${SEO.contact.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: SEO.contact.phoneDisplay,
    href: `tel:${SEO.contact.phone}`,
  },
];

function OrbitRings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-70 lg:h-[620px] lg:w-[620px]"
    >
      <g className="origin-center animate-[spin_40s_linear_infinite] motion-reduce:animate-none">
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          className="stroke-text-primary/15"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <circle cx="200" cy="10" r="4" className="fill-accent" />
      </g>
      <g className="origin-center animate-[spin_28s_linear_infinite_reverse] motion-reduce:animate-none">
        <circle
          cx="200"
          cy="200"
          r="140"
          fill="none"
          className="stroke-text-primary/15"
          strokeWidth="1"
        />
        <circle cx="340" cy="200" r="3" className="fill-accent" />
        <circle cx="60" cy="200" r="2" className="fill-text-subtle" />
      </g>
      <g className="origin-center animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
        <circle
          cx="200"
          cy="200"
          r="90"
          fill="none"
          className="stroke-accent/45"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle cx="200" cy="290" r="3" className="fill-accent" />
      </g>
    </svg>
  );
}

export default function CTA() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".cta-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="bg-bg-primary relative px-4 py-14 md:px-6 md:py-32"
    >
      <div className="bg-bg-card border-border/50 relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border shadow-2xl md:rounded-[3rem] lg:grid-cols-[1.25fr_1fr]">
        {/* soft glow */}
        <div className="bg-accent/15 pointer-events-none absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full blur-[120px]" />

        {/* Left: pitch */}
        <div className="relative z-10 flex flex-col items-start px-6 py-10 sm:px-10 md:px-14 md:py-20">
          <div className="cta-reveal mb-6 md:mb-8">
            <Tag>Next Step</Tag>
          </div>

          <h2 className="cta-reveal text-text-primary mb-4 text-[2.75rem] leading-[0.9] tracking-tighter md:mb-6 md:text-7xl xl:text-8xl">
            Ready to build <br />
            <span className="text-accent">the future?</span>
          </h2>

          <p className="cta-reveal text-text-muted mb-7 max-w-md text-[15px] leading-relaxed md:mb-10 md:text-lg">
            Tell us about your idea. We&apos;ll help you shape it, plan it and
            build it, from first sketch to launch.
          </p>

          <div className="cta-reveal flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <BookACall>
              <span className="group bg-accent text-bg-primary hover:bg-accent-hover inline-flex h-12 w-full items-center justify-between gap-5 rounded-full pr-1.5 pl-6 text-[15px] font-bold shadow-[0_12px_40px_-14px_var(--color-accent)] transition-all duration-300 hover:-translate-y-0.5 sm:w-auto md:h-14 md:pr-2 md:pl-7">
                Book a Call
                <span className="bg-bg-primary text-accent flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:-rotate-45 md:h-10 md:w-10">
                  <ArrowRight size={18} />
                </span>
              </span>
            </BookACall>
            <TransitionLink
              href="/works"
              className="group border-text-primary/20 text-text-primary hover:border-accent hover:text-accent inline-flex h-12 items-center justify-center gap-2 rounded-full border px-7 text-[15px] font-semibold transition-colors duration-300 md:h-14"
            >
              Explore our work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </TransitionLink>
          </div>

          <ul className="cta-reveal mt-6 flex flex-wrap gap-x-5 gap-y-2 md:mt-10 md:gap-x-6 md:gap-y-3">
            {POINTS.map((point) => (
              <li
                key={point}
                className="text-text-muted flex items-center gap-2 text-xs md:text-sm"
              >
                <span className="bg-accent/15 text-accent flex h-5 w-5 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>

          {/* Small screens: compact direct-contact buttons instead of the side panel */}
          <div className="cta-reveal border-border/50 mt-8 w-full border-t pt-6 lg:hidden">
            <p className="text-text-subtle mb-3 text-[11px] font-bold tracking-[0.2em] uppercase">
              Or reach us directly
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CONTACTS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="border-text-primary/15 bg-bg-primary/60 text-text-primary hover:border-accent/60 flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors"
                >
                  <Icon size={16} className="text-accent" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: direct contact over animated orbit rings */}
        <div className="border-border/50 relative hidden items-center justify-center overflow-hidden px-6 py-14 sm:px-10 lg:flex lg:border-l">
          <OrbitRings />
          <div className="relative z-10 flex w-full max-w-sm flex-col gap-3">
            <p className="cta-reveal text-text-subtle mb-1 text-[11px] font-bold tracking-[0.2em] uppercase">
              Or reach us directly
            </p>
            {CONTACTS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="cta-reveal group border-border/60 bg-bg-primary/70 hover:border-accent/60 flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-md transition-colors duration-300"
              >
                <span className="bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-text-subtle block text-[11px] font-semibold tracking-wider uppercase">
                    {label}
                  </span>
                  <span className="text-text-primary block truncate text-base font-semibold">
                    {value}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-text-subtle group-hover:text-accent shrink-0 transition-colors"
                />
              </a>
            ))}
            <div className="cta-reveal text-text-muted mt-2 flex items-center gap-2 text-sm">
              <Clock size={14} className="text-accent" />
              Mon–Fri, 9:00–18:00 IST
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
