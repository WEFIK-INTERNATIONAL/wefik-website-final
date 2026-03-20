"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const channels = [
  {
    label: "Email Us",
    value: "info@wefik.in",
    sub: "We reply within 24 hours",
    href: "mailto:info@wefik.in",
    icon: Mail,
  },
  {
    label: "Call Us",
    value: "+91 96096 53522",
    sub: "Mon – Fri, 10am – 7pm IST",
    href: "tel:+919609653522",
    icon: Phone,
  },
  {
    label: "Find Us",
    value: "Kolkata, India",
    sub: "Kestopur Salt Lake Sector V, 700114",
    href: "https://maps.google.com",
    icon: MapPin,
  },
];

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/wefik.in/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/wefik/",
  },
  { icon: Twitter, label: "Twitter", href: "https://x.com/wefikindia" },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/wefikinternational/",
  },
];

function SplitWords({ text, className, style }) {
  return (
    <div className={className} style={style} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.22em" }}
        >
          <span className="split-word inline-block">{word}</span>
        </span>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const pageRef = useRef(null);
  const channelsRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".c-label",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
        0.15
      );
      tl.fromTo(
        ".c-hero .split-word",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, stagger: 0.055 },
        0.25
      );
      tl.fromTo(
        ".c-pill",
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.65, ease: "back.out(1.8)" },
        0.7
      );
      tl.fromTo(
        ".c-email",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        0.85
      );
      tl.fromTo(
        ".c-divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
          transformOrigin: "left center",
        },
        0.9
      );
    },
    { scope: pageRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".channel-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: channelsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".socials-label",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".socials-row",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".social-btn",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.6)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".socials-row",
            start: "top 83%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: channelsRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-panel",
        { y: 70, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".cta-line .split-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 76%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".cta-actions > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ctaRef }
  );

  return (
    <main
      ref={pageRef}
      className="bg-bg-primary text-text-primary overflow-x-hidden"
    >
      <section className="relative flex min-h-[90vh] flex-col justify-between px-5 pt-32 pb-16 md:px-10 md:pt-40 lg:px-16 lg:pt-48">
        <div
          className="font-big pointer-events-none absolute inset-x-0 top-10 leading-none font-black uppercase select-none"
          style={{
            fontSize: "clamp(5rem, 20vw, 20rem)",
            color: "var(--color-text-primary)",
            opacity: 0.03,
          }}
          aria-hidden
        >
          CONTACT
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <span className="c-label font-accent text-text-muted text-[10px] font-bold tracking-[0.38em] uppercase opacity-0">
            Get in Touch
          </span>
          <span className="c-label border-border font-accent text-text-muted rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase opacity-0">
            Always Available
          </span>
        </div>

        <div className="relative z-10">
          <SplitWords
            text="Let's Make"
            className="c-hero font-big text-text-primary leading-none font-black tracking-tight uppercase"
            style={{ fontSize: "clamp(3.8rem, 11vw, 11rem)" }}
          />
          <div className="flex flex-wrap items-end gap-3 md:gap-5">
            <SplitWords
              text="Something"
              className="c-hero font-big text-text-primary leading-none font-black tracking-tight uppercase"
              style={{ fontSize: "clamp(3.8rem, 11vw, 11rem)" }}
            />
            <span className="c-pill bg-accent-bright font-accent mb-1.5 inline-block rounded-full px-5 py-2 text-xs font-black tracking-[0.3em] text-black uppercase opacity-0 md:mb-5 md:px-7 md:py-3 md:text-sm">
              Real.
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          <div
            className="c-divider bg-border h-px w-full opacity-100"
            style={{ transformOrigin: "left" }}
          />
          <div className="c-email flex flex-col gap-1 opacity-0 md:flex-row md:items-center md:justify-between">
            <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.38em] uppercase">
              Drop us a line anytime
            </span>
            <a
              href="mailto:info@wefik.in"
              className="group hover:text-accent inline-flex items-center gap-3 transition-colors"
            >
              <span
                className="font-big leading-none font-black tracking-tight uppercase"
                style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)" }}
              >
                info@wefik.in
              </span>
              <ArrowUpRight
                className="text-accent shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{
                  width: "clamp(20px, 3vw, 36px)",
                  height: "clamp(20px, 3vw, 36px)",
                }}
              />
            </a>
          </div>
        </div>
      </section>

      <section
        ref={channelsRef}
        className="px-5 py-20 md:px-10 md:py-28 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {channels.map(({ label, value, sub, href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="channel-item group border-border bg-bg-card hover:border-accent/40 relative flex flex-col justify-between gap-8 overflow-hidden rounded-3xl border p-7 opacity-0 transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] md:p-8"
              >
                <span
                  className="font-big text-text-primary pointer-events-none absolute -top-2 -right-2 leading-none font-black opacity-[0.04] select-none"
                  style={{ fontSize: "clamp(4rem, 7vw, 6rem)" }}
                  aria-hidden
                >
                  0{i + 1}
                </span>

                <div className="border-border bg-bg-primary group-hover:border-accent group-hover:bg-accent flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300">
                  <Icon
                    size={18}
                    className="text-accent transition-colors group-hover:text-white"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-accent text-text-muted text-[9px] font-bold tracking-[0.38em] uppercase">
                    {label}
                  </span>
                  <div
                    className="font-big text-text-primary leading-tight font-black uppercase"
                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
                  >
                    {value}
                  </div>
                  <p className="font-body text-text-muted text-sm">{sub}</p>
                </div>

                <div className="border-border group-hover:border-accent group-hover:bg-accent flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300">
                  <ArrowUpRight
                    size={14}
                    className="text-text-muted transition-colors group-hover:text-white"
                  />
                </div>
              </a>
            ))}
          </div>

          <div className="socials-row flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <span className="socials-label font-accent text-text-muted text-[9px] font-bold tracking-[0.4em] uppercase opacity-0">
              Follow our journey
            </span>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="social-btn group border-border text-text-muted hover:border-accent-bright hover:bg-accent-bright flex h-12 w-12 items-center justify-center rounded-full border opacity-0 transition-all duration-300 hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="px-5 pb-24 md:px-10 md:pb-32 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="cta-panel bg-text-primary relative overflow-hidden rounded-[2rem] px-8 py-16 opacity-0 md:rounded-[3rem] md:px-16 md:py-24">
            <div
              className="font-big pointer-events-none absolute -right-4 -bottom-4 leading-none font-black uppercase select-none"
              style={{
                fontSize: "clamp(5rem, 16vw, 14rem)",
                color: "rgba(255,255,255,0.04)",
              }}
              aria-hidden
            >
              BOOK
            </div>

            <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3">
                <span className="font-accent text-[9px] font-bold tracking-[0.4em] text-white/40 uppercase">
                  Prefer a conversation?
                </span>
                <SplitWords
                  text="Book a Free 30-Min Call"
                  className="cta-line font-big leading-none font-black tracking-tight text-white uppercase"
                  style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
                />
                <p className="font-body max-w-sm text-base text-white/50">
                  Let&apos;s talk about your project, goals, and how Wefik can help
                  you get there.
                </p>
              </div>

              <div className="cta-actions flex flex-col gap-4">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-accent-bright font-accent inline-flex items-center gap-5 rounded-full px-8 py-5 text-[11px] font-bold tracking-[0.25em] text-black uppercase transition-all duration-300 hover:gap-7"
                >
                  <span>Schedule a Call</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="mailto:info@wefik.in"
                  className="group font-accent inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase transition-all hover:gap-4 hover:text-white"
                >
                  <span>Or just email us</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
